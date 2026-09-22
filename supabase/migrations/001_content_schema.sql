-- ==================================================
-- SUPABASE CONTENT SCHEMA & RLS MIGRATION DRAFT (001)
-- ==================================================
-- NOTE: Local draft only. DO NOT execute remotely without approval.

-- ==================================================
-- 1. SITE ADMINS TABLE & HELPER FUNCTION
-- ==================================================

CREATE TABLE IF NOT EXISTS public.site_admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'owner',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT site_admins_user_id_key UNIQUE (user_id)
);

ALTER TABLE public.site_admins ENABLE ROW LEVEL SECURITY;

-- Helper function to verify active admin identity securely
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.site_admins
    WHERE user_id = auth.uid()
      AND is_active = true
  );
$$;

-- Secure function permissions
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- RLS Policy for site_admins table (Authenticated admins only)
CREATE POLICY "Admins can view site_admins record"
  ON public.site_admins
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- ==================================================
-- 2. UPDATED_AT TRIGGER FUNCTION
-- ==================================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ==================================================
-- 3. PROFILES TABLE
-- ==================================================

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  title TEXT NOT NULL,
  subheadline TEXT NOT NULL,
  university TEXT NOT NULL,
  program TEXT NOT NULL,
  gpa NUMERIC(3, 2) NOT NULL CHECK (gpa >= 0.00 AND gpa <= 4.00),
  completed_credits INTEGER NOT NULL CHECK (completed_credits >= 0),
  location TEXT NOT NULL,
  email TEXT NOT NULL,
  academic_email TEXT,
  phone TEXT NOT NULL,
  whatsapp_url TEXT NOT NULL,
  bio_intro TEXT NOT NULL,
  soft_skills TEXT[] NOT NULL DEFAULT '{}',
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- RLS Policies for profiles
CREATE POLICY "Public users can view published profiles"
  ON public.profiles
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Admins have full management access to profiles"
  ON public.profiles
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ==================================================
-- 4. PROJECTS TABLE
-- ==================================================

CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT,
  role TEXT NOT NULL,
  period TEXT NOT NULL,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  copyright_number TEXT,
  demo_url TEXT,
  github_url TEXT,
  documentation_url TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0 CHECK (display_order >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER set_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- RLS Policies for projects
CREATE POLICY "Public users can view published projects"
  ON public.projects
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Admins have full management access to projects"
  ON public.projects
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ==================================================
-- 5. EXPERIENCES TABLE
-- ==================================================

CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experience_type TEXT NOT NULL CHECK (experience_type IN ('professional', 'organization')),
  company_or_org TEXT NOT NULL,
  role TEXT NOT NULL,
  location TEXT,
  period TEXT NOT NULL,
  description TEXT NOT NULL,
  highlights TEXT[] NOT NULL DEFAULT '{}',
  tags TEXT[] NOT NULL DEFAULT '{}',
  display_order INTEGER NOT NULL DEFAULT 0 CHECK (display_order >= 0),
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER set_experiences_updated_at
  BEFORE UPDATE ON public.experiences
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- RLS Policies for experiences
CREATE POLICY "Public users can view published experiences"
  ON public.experiences
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Admins have full management access to experiences"
  ON public.experiences
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ==================================================
-- 6. SKILLS TABLE
-- ==================================================

CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0 CHECK (display_order >= 0),
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- RLS Policies for skills
CREATE POLICY "Public users can view published skills"
  ON public.skills
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Admins have full management access to skills"
  ON public.skills
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ==================================================
-- 7. EDUCATION TABLE
-- ==================================================

CREATE TABLE IF NOT EXISTS public.education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution TEXT NOT NULL,
  program TEXT NOT NULL,
  period TEXT NOT NULL,
  gpa NUMERIC(3, 2) CHECK (gpa IS NULL OR (gpa >= 0.00 AND gpa <= 4.00)),
  completed_credits INTEGER CHECK (completed_credits IS NULL OR completed_credits >= 0),
  honors TEXT,
  display_order INTEGER NOT NULL DEFAULT 0 CHECK (display_order >= 0),
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;

-- RLS Policies for education
CREATE POLICY "Public users can view published education"
  ON public.education
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Admins have full management access to education"
  ON public.education
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ==================================================
-- 8. ACHIEVEMENTS TABLE
-- ==================================================

CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  issuer TEXT,
  year TEXT NOT NULL,
  registration_number TEXT,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0 CHECK (display_order >= 0),
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

-- RLS Policies for achievements
CREATE POLICY "Public users can view published achievements"
  ON public.achievements
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Admins have full management access to achievements"
  ON public.achievements
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
