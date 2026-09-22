-- ==================================================
-- SUPABASE PROJECT IMAGES & STORAGE MIGRATION DRAFT (002)
-- ==================================================
-- NOTE: Local draft only. DO NOT execute remotely without approval.

-- ==================================================
-- 1. PROJECT IMAGES TABLE
-- ==================================================

CREATE TABLE IF NOT EXISTS public.project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL CHECK (length(trim(storage_path)) > 0),
  alt_text TEXT NOT NULL CHECK (length(trim(alt_text)) > 0),
  caption TEXT,
  display_order INTEGER NOT NULL DEFAULT 0 CHECK (display_order >= 0),
  is_cover BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT chk_project_images_storage_path_format 
    CHECK (storage_path ~ '^projects/[^/]+/[^/]+\.webp$'),
  CONSTRAINT chk_project_images_storage_path_project_id 
    CHECK (split_part(storage_path, '/', 2) = project_id::text)
);

-- Index for fast lookup by project_id and display_order
CREATE INDEX IF NOT EXISTS idx_project_images_project_id 
  ON public.project_images(project_id, display_order ASC);

ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;

-- ==================================================
-- 2. DATABASE RLS POLICIES FOR PROJECT_IMAGES
-- ==================================================

-- 2a. Public SELECT for published projects
CREATE POLICY "Public users can view images of published projects"
  ON public.project_images
  FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.projects
      WHERE projects.id = project_images.project_id
        AND projects.is_published = true
    )
  );

-- 2b. Admin SELECT for all project_images
CREATE POLICY "Admins can view all project_images"
  ON public.project_images
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- 2c. Admin INSERT with strict path & project_id consistency checks
CREATE POLICY "Admins can insert project_images"
  ON public.project_images
  FOR INSERT
  TO authenticated
  WITH CHECK (
    public.is_admin()
    AND storage_path ~ '^projects/[^/]+/[^/]+\.webp$'
    AND split_part(storage_path, '/', 2) = project_id::text
    AND EXISTS (
      SELECT 1
      FROM public.projects
      WHERE projects.id = project_images.project_id
    )
    AND display_order >= 0
    AND length(trim(alt_text)) > 0
  );

-- 2d. Admin UPDATE with strict path & project_id consistency checks
CREATE POLICY "Admins can update project_images"
  ON public.project_images
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (
    public.is_admin()
    AND storage_path ~ '^projects/[^/]+/[^/]+\.webp$'
    AND split_part(storage_path, '/', 2) = project_id::text
    AND EXISTS (
      SELECT 1
      FROM public.projects
      WHERE projects.id = project_images.project_id
    )
    AND display_order >= 0
    AND length(trim(alt_text)) > 0
  );

-- 2e. Admin DELETE for project_images
CREATE POLICY "Admins can delete project_images"
  ON public.project_images
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ==================================================
-- 3. STORAGE OBJECT POLICIES (storage.objects)
-- ==================================================
-- BUCKET WARNING: 'portfolio-images' is a PUBLIC bucket. Any object uploaded to this
-- bucket is publicly accessible via URL. Do not place private or sensitive assets here.
-- Private documents must use a separate private bucket in the future.
--
-- EXACT PATH FORMAT REQUIRED: projects/{projectId}/{filename}.webp
-- Exactly 3 path segments, no extra subdirectories, no '..' or '/' in filename segment.
-- 1. bucket_id = 'portfolio-images'
-- 2. Regex: name ~ '^projects/[^/]+/[^/]+\.webp$'
-- 3. First segment: split_part(name, '/', 1) = 'projects'
-- 4. User: active admin (public.is_admin())

-- 3a. Public Read Access for portfolio-images bucket
CREATE POLICY "Public users can view portfolio images"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'portfolio-images');

-- 3b. Admin Upload Access (INSERT) with Exact Path & Project Existence Validation
CREATE POLICY "Admins can upload portfolio images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'portfolio-images'
    AND public.is_admin()
    AND name ~ '^projects/[^/]+/[^/]+\.webp$'
    AND split_part(name, '/', 1) = 'projects'
    AND EXISTS (
      SELECT 1
      FROM public.projects
      WHERE public.projects.id::text = split_part(name, '/', 2)
    )
  );

-- 3c. Admin Update Access (UPDATE) with Exact Path & Project Existence Validation
CREATE POLICY "Admins can update portfolio images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'portfolio-images'
    AND public.is_admin()
    AND name ~ '^projects/[^/]+/[^/]+\.webp$'
    AND split_part(name, '/', 1) = 'projects'
    AND EXISTS (
      SELECT 1
      FROM public.projects
      WHERE public.projects.id::text = split_part(name, '/', 2)
    )
  )
  WITH CHECK (
    bucket_id = 'portfolio-images'
    AND public.is_admin()
    AND name ~ '^projects/[^/]+/[^/]+\.webp$'
    AND split_part(name, '/', 1) = 'projects'
    AND EXISTS (
      SELECT 1
      FROM public.projects
      WHERE public.projects.id::text = split_part(name, '/', 2)
    )
  );

-- 3d. Admin Delete Access (DELETE) with Exact Path Validation (Allows cleanup of orphaned objects)
CREATE POLICY "Admins can delete portfolio images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'portfolio-images'
    AND public.is_admin()
    AND name ~ '^projects/[^/]+/[^/]+\.webp$'
    AND split_part(name, '/', 1) = 'projects'
  );

-- ==================================================
-- 4. ARCHITECTURAL LIMITATIONS & FILE SIZE LIMITS
-- ==================================================
-- CLEANUP LIMITATION:
-- Database ON DELETE CASCADE on project_id removes project_images metadata records only.
-- It does NOT automatically delete physical object files from Supabase Storage.
-- Storage object deletion must be explicitly invoked via the Storage API or backend script.
-- Project deletion is not implemented in this phase.
--
-- COVER IMAGE LIMITATION:
-- No UNIQUE index or trigger is added to enforce single cover per project at the database level.
-- Cover image replacement and single-cover consistency must be managed by future application code
-- or a dedicated transactional RPC function.
--
-- FILE SIZE LIMITS:
-- - Browser Input Limit: 10 MB (max original file size accepted by browser file picker pre-compression)
-- - Final Compressed WebP Limit: 2 MB (max output size produced by browser WebP canvas encoder)
-- - Storage Bucket File-Size Limit: 2 MB (max payload size configured on 'portfolio-images' bucket)
