  -- ==================================================
  -- SUPABASE ATOMIC PROJECT COVER SELECTION MIGRATION DRAFT (003)
  -- ==================================================
  -- NOTE: Local draft only. DO NOT execute remotely without approval.

  -- ==================================================
  -- ATOMIC PROJECT COVER FUNCTION
  -- ==================================================

  CREATE OR REPLACE FUNCTION public.set_project_cover(
    p_project_id UUID,
    p_image_id UUID
  )
  RETURNS VOID
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path = ''
  AS $$
  DECLARE
    v_image_exists BOOLEAN;
  BEGIN
    -- 1. Authorization check: Verify active admin identity
    IF NOT public.is_admin() THEN
      RAISE EXCEPTION 'Access denied: Admin privileges required.';
    END IF;

    -- 2. Ownership & Existence validation: Verify image belongs to the specified project
    SELECT EXISTS (
      SELECT 1
      FROM public.project_images
      WHERE id = p_image_id
        AND project_id = p_project_id
    ) INTO v_image_exists;

    IF NOT v_image_exists THEN
      RAISE EXCEPTION 'Image record not found for the specified project.';
    END IF;

    -- 3. Atomic Transaction: Clear existing cover flag for all project images of this project
    UPDATE public.project_images
    SET is_cover = false
    WHERE project_id = p_project_id;

    -- 4. Atomic Transaction: Set designated image as cover
    UPDATE public.project_images
    SET is_cover = true
    WHERE id = p_image_id
      AND project_id = p_project_id;
  END;
  $$;

  -- Secure function permissions: Restrict execution to authenticated active admins
  REVOKE EXECUTE ON FUNCTION public.set_project_cover(UUID, UUID) FROM PUBLIC;
  GRANT EXECUTE ON FUNCTION public.set_project_cover(UUID, UUID) TO authenticated;
