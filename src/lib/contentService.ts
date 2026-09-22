import { supabase } from "./supabase";
import {
  ProfileData,
  EducationData,
  SkillCategoryData,
  ExperienceData,
  OrganizationData,
  AchievementData,
  ProjectData,
  portfolioData,
} from "../app/data/portfolioData";

export interface SupabaseProfileRow {
  id: string;
  full_name: string;
  short_name: string;
  title: string;
  subheadline: string;
  university: string;
  program: string;
  gpa: number;
  completed_credits: number;
  location: string;
  email: string;
  academic_email: string | null;
  phone: string;
  whatsapp_url: string;
  bio_intro: string;
  soft_skills: string[];
  is_published: boolean;
  updated_at: string;
}

export interface SupabaseEducationRow {
  id: string;
  institution: string;
  program: string;
  period: string;
  gpa: number | null;
  completed_credits: number | null;
  honors: string | null;
  display_order: number;
  is_published: boolean;
}

export interface SupabaseSkillRow {
  id: string;
  category: string;
  name: string;
  display_order: number;
  is_published: boolean;
}

export interface SupabaseExperienceRow {
  id: string;
  experience_type: "professional" | "organization";
  company_or_org: string;
  role: string;
  location: string | null;
  period: string;
  description: string;
  highlights: string[];
  tags: string[];
  display_order: number;
  is_published: boolean;
}

export interface SupabaseAchievementRow {
  id: string;
  title: string;
  category: string;
  issuer: string | null;
  year: string;
  registration_number: string | null;
  description: string | null;
  display_order: number;
  is_published: boolean;
}

export interface SupabaseProjectRow {
  id: string;
  title: string;
  slug: string;
  category: string;
  short_description: string | null;
  full_description: string | null;
  role: string;
  period: string;
  is_featured: boolean;
  copyright_number: string | null;
  technologies: string[];
  image_url: string | null;
  demo_url: string | null;
  github_url: string | null;
  documentation_url: string | null;
  display_order: number;
  is_published: boolean;
}

const getCompanyColor = (companyName: string): string => {
  if (companyName.includes("Reinutech")) return "#00804C";
  if (companyName.includes("BUMA")) return "#1E488F";
  if (companyName.includes("MG Suite")) return "#748C2E";
  return "#00804C";
};

const getCategoryColor = (category: string): string => {
  switch (category) {
    case "IoT & Smart Systems":
      return "#00804C";
    case "Web & Mobile":
      return "#1E488F";
    case "Robotics & Telemetry":
      return "#7C3AED";
    case "Automation & Control":
      return "#748C2E";
    case "Software & Automation":
      return "#DBE64C";
    default:
      return "#00804C";
  }
};

const getExperienceTypeLabel = (companyName: string): string => {
  if (companyName.includes("BUMA") || companyName.includes("MG Suite") || companyName.includes("Reinutech")) {
    return "Internship";
  }
  return "Work";
};

/**
 * Fetches published profile data from Supabase, falling back to local dataset on error or empty response.
 */
export async function fetchPublishedProfile(): Promise<ProfileData> {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        "id, full_name, short_name, title, subheadline, university, program, gpa, completed_credits, location, email, academic_email, phone, whatsapp_url, bio_intro, soft_skills, is_published, updated_at"
      )
      .eq("is_published", true)
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      console.warn("Supabase profile query notice: Using local profile dataset fallback.");
      return portfolioData.profile;
    }

    const row = data as SupabaseProfileRow;
    return {
      fullName: row.full_name,
      shortName: row.short_name,
      title: row.title,
      subheadline: row.subheadline,
      academicHighlight: `${row.gpa} GPA · ${row.completed_credits} completed credits · ${row.university}`,
      university: row.university,
      program: row.program,
      gpa: row.gpa,
      completedCredits: row.completed_credits,
      location: row.location,
      email: row.email,
      academicEmail: row.academic_email || portfolioData.profile.academicEmail,
      phone: row.phone,
      whatsappUrl: row.whatsapp_url,
      bioIntro: row.bio_intro,
      narrativePoints: portfolioData.profile.narrativePoints,
      softSkills: Array.isArray(row.soft_skills) && row.soft_skills.length > 0 ? row.soft_skills : portfolioData.profile.softSkills,
      socials: portfolioData.profile.socials,
    };
  } catch {
    console.warn("Supabase profile fetch error: Using local profile dataset fallback.");
    return portfolioData.profile;
  }
}

/**
 * Fetches published education entries from Supabase, falling back to local dataset on error or empty response.
 */
export async function fetchPublishedEducation(): Promise<EducationData[]> {
  try {
    const { data, error } = await supabase
      .from("education")
      .select("id, institution, program, period, gpa, completed_credits, honors, display_order, is_published")
      .eq("is_published", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      console.warn("Supabase education query notice: Using local education dataset fallback.");
      return portfolioData.education;
    }

    return (data as SupabaseEducationRow[]).map((row) => ({
      year: row.period,
      degree: row.program,
      school: row.institution,
      gpa: row.gpa != null ? String(row.gpa) : undefined,
      credits: row.completed_credits != null ? `${row.completed_credits} completed credits` : undefined,
      honors: row.honors || undefined,
    }));
  } catch {
    console.warn("Supabase education fetch error: Using local education dataset fallback.");
    return portfolioData.education;
  }
}

/**
 * Fetches published skills from Supabase and groups them into SkillCategoryData[], falling back to local dataset on error or empty response.
 */
export async function fetchPublishedSkills(): Promise<SkillCategoryData[]> {
  try {
    const { data, error } = await supabase
      .from("skills")
      .select("id, category, name, display_order, is_published")
      .eq("is_published", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      console.warn("Supabase skills query notice: Using local skill categories dataset fallback.");
      return portfolioData.skillCategories;
    }

    const rows = data as SupabaseSkillRow[];
    const categoryMap = new Map<string, string[]>();

    for (const row of rows) {
      if (!categoryMap.has(row.category)) {
        categoryMap.set(row.category, []);
      }
      categoryMap.get(row.category)!.push(row.name);
    }

    const categories: SkillCategoryData[] = [];
    categoryMap.forEach((items, category) => {
      categories.push({ category, items });
    });

    return categories.length > 0 ? categories : portfolioData.skillCategories;
  } catch {
    console.warn("Supabase skills fetch error: Using local skill categories dataset fallback.");
    return portfolioData.skillCategories;
  }
}

/**
 * Fetches published experiences from Supabase and separates them into professional and organization experiences.
 */
export async function fetchPublishedExperiences(): Promise<{
  experiences: ExperienceData[];
  organizations: OrganizationData[];
}> {
  try {
    const { data, error } = await supabase
      .from("experiences")
      .select(
        "id, experience_type, company_or_org, role, location, period, description, highlights, tags, display_order, is_published"
      )
      .eq("is_published", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      console.warn("Supabase experiences query notice: Using local experiences dataset fallback.");
      return {
        experiences: portfolioData.experiences,
        organizations: portfolioData.organizations,
      };
    }

    const rows = data as SupabaseExperienceRow[];

    const professionalRows = rows.filter((r) => r.experience_type === "professional");
    const organizationRows = rows.filter((r) => r.experience_type === "organization");

    const mappedExperiences: ExperienceData[] = professionalRows.map((row) => ({
      year: row.period,
      role: row.role,
      company: row.company_or_org,
      location: row.location || "Semarang, Indonesia",
      type: getExperienceTypeLabel(row.company_or_org),
      desc: row.description,
      achievements: Array.isArray(row.highlights) ? row.highlights : [],
      tags: Array.isArray(row.tags) ? row.tags : [],
      color: getCompanyColor(row.company_or_org),
    }));

    const mappedOrganizations: OrganizationData[] = organizationRows.map((row) => ({
      year: row.period,
      role: row.role,
      organization: row.company_or_org,
      highlights: Array.isArray(row.highlights) ? row.highlights : [],
    }));

    return {
      experiences: mappedExperiences.length > 0 ? mappedExperiences : portfolioData.experiences,
      organizations: mappedOrganizations.length > 0 ? mappedOrganizations : portfolioData.organizations,
    };
  } catch {
    console.warn("Supabase experiences fetch error: Using local experiences dataset fallback.");
    return {
      experiences: portfolioData.experiences,
      organizations: portfolioData.organizations,
    };
  }
}

/**
 * Fetches published achievements from Supabase ordered by display_order asc, falling back to local dataset on error or empty response.
 */
export async function fetchPublishedAchievements(): Promise<AchievementData[]> {
  try {
    const { data, error } = await supabase
      .from("achievements")
      .select("id, title, category, issuer, year, registration_number, description, display_order, is_published")
      .eq("is_published", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      console.warn("Supabase achievements query notice: Using local achievements dataset fallback.");
      return portfolioData.achievements;
    }

    return (data as SupabaseAchievementRow[]).map((row) => ({
      year: row.year,
      title: row.title,
      issuer: row.issuer || "",
      category: row.category,
      registrationNumber: row.registration_number || undefined,
    }));
  } catch {
    console.warn("Supabase achievements fetch error: Using local achievements dataset fallback.");
    return portfolioData.achievements;
  }
}

/**
 * Fetches published projects from Supabase ordered by display_order asc, falling back to local dataset on error or empty response.
 */
export async function fetchPublishedProjects(): Promise<ProjectData[]> {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("is_published", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      console.warn("Supabase projects query notice: Using local projects dataset fallback.");
      return portfolioData.projects;
    }

    return (data as SupabaseProjectRow[]).map((row) => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      category: row.category,
      desc: row.short_description || row.full_description || "",
      role: row.role,
      year: row.period,
      featured: Boolean(row.is_featured),
      copyrightNumber: row.copyright_number || undefined,
      tags: Array.isArray(row.technologies) ? row.technologies : [],
      img: row.image_url || undefined,
      imageUrl: row.image_url || undefined,
      demoUrl: row.demo_url || undefined,
      githubUrl: row.github_url || undefined,
      documentationUrl: row.documentation_url || undefined,
      color: getCategoryColor(row.category),
    }));
  } catch {
    console.warn("Supabase projects fetch error: Using local projects dataset fallback.");
    return portfolioData.projects;
  }
}

export interface PublishedProjectImage {
  id: string;
  project_id: string;
  storage_path: string;
  alt_text: string;
  caption: string | null;
  display_order: number;
  is_cover: boolean;
  created_at: string;
  public_url: string;
}

export interface ProjectCardCover {
  publicUrl: string;
  altText: string;
}

export interface SupabaseCardImageRow {
  id: string;
  project_id: string;
  storage_path: string;
  alt_text: string;
  display_order: number;
  is_cover: boolean;
}

// Session in-memory cache (only cache successful non-empty results)
let cachedCoverMap: Record<string, ProjectCardCover> | null = null;

/**
 * Fetches published project images across all published projects in a single query.
 * Maps cover records to BOTH project UUID and stable slug so both remote and local project fallback objects match cleanly.
 * Ordering prioritizes is_cover DESC, then display_order ASC.
 */
export async function fetchPublishedProjectCardImages(): Promise<Record<string, ProjectCardCover>> {
  if (cachedCoverMap && Object.keys(cachedCoverMap).length > 0) {
    return cachedCoverMap;
  }

  try {
    // 1. Fetch published projects to create UUID -> Slug & Title lookup
    const { data: projData } = await supabase
      .from("projects")
      .select("id, slug, title")
      .eq("is_published", true);

    const uuidToSlugMap = new Map<string, string>();
    const uuidToTitleMap = new Map<string, string>();
    if (projData) {
      for (const p of projData) {
        if (p.id) {
          if (p.slug) uuidToSlugMap.set(p.id, p.slug);
          if (p.title) uuidToTitleMap.set(p.id, p.title);
        }
      }
    }

    // 2. Query project images
    const { data: imgData, error: imgErr } = await supabase
      .from("project_images")
      .select("id, project_id, storage_path, alt_text, display_order, is_cover")
      .order("project_id", { ascending: true })
      .order("is_cover", { ascending: false })
      .order("display_order", { ascending: true });

    if (imgErr || !imgData || imgData.length === 0) {
      return {};
    }

    const coverMap: Record<string, ProjectCardCover> = {};

    for (const row of imgData as SupabaseCardImageRow[]) {
      const projUuid = row.project_id;
      const projSlug = uuidToSlugMap.get(projUuid);
      const projTitle = uuidToTitleMap.get(projUuid);
      const isEbro =
        (projSlug && projSlug.includes("ebro")) ||
        (projTitle && projTitle.toLowerCase().includes("ebro"));

      const alreadyHasUuid = Boolean(coverMap[projUuid]);
      const alreadyHasSlug = projSlug ? Boolean(coverMap[projSlug]) : false;

      if (!alreadyHasUuid || !alreadyHasSlug || (isEbro && !coverMap["ebro-smart-poultry-farm"])) {
        const { data: urlData } = supabase.storage
          .from("portfolio-images")
          .getPublicUrl(row.storage_path);

        if (urlData?.publicUrl) {
          const coverObj: ProjectCardCover = {
            publicUrl: urlData.publicUrl,
            altText: row.alt_text,
          };

          if (!alreadyHasUuid) {
            coverMap[projUuid] = coverObj;
          }
          if (projSlug && !alreadyHasSlug) {
            coverMap[projSlug] = coverObj;
          }
          if (isEbro) {
            coverMap["ebro-smart-poultry-farm"] = coverObj;
          }
        }
      }
    }

    if (Object.keys(coverMap).length > 0) {
      cachedCoverMap = coverMap;
    }

    return coverMap;
  } catch {
    console.warn("Supabase fetchPublishedProjectCardImages notice: Returning empty cover map on error.");
    return {};
  }
}

/**
 * Fetches the published cover image info for a specific project identified by its stable slug.
 * Uses the shared cover map to guarantee 100% consistency between Home and Karya pages.
 */
export async function fetchPublishedProjectCoverBySlug(slug: string): Promise<ProjectCardCover | null> {
  try {
    const cardMap = await fetchPublishedProjectCardImages();
    if (cardMap[slug]) return cardMap[slug];

    if (slug.includes("ebro") && cardMap["ebro-smart-poultry-farm"]) {
      return cardMap["ebro-smart-poultry-farm"];
    }

    const firstCover = Object.values(cardMap)[0];
    return firstCover || null;
  } catch {
    console.warn("Supabase fetchPublishedProjectCoverBySlug notice: Returning null cover fallback.");
    return null;
  }
}

/**
 * Fetches published project images for a given published project ID or slug.
 * Returns images ordered by display_order ascending, with dynamically generated public CDN URLs.
 */
export async function fetchPublishedProjectImages(identifier: string): Promise<PublishedProjectImage[]> {
  try {
    if (!identifier || typeof identifier !== "string") return [];

    let resolvedId = identifier;

    // Check if identifier is a valid UUID
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);
    if (!isUuid) {
      // Find matching slug for numeric ID or string identifier
      let targetSlug = identifier;
      const localMatch = portfolioData.projects.find((p) => String(p.id) === identifier || p.slug === identifier);
      if (localMatch) {
        targetSlug = localMatch.slug;
      }

      const { data: pData } = await supabase
        .from("projects")
        .select("id")
        .eq("slug", targetSlug)
        .eq("is_published", true)
        .maybeSingle();

      if (!pData?.id) {
        return [];
      }
      resolvedId = pData.id;
    }

    const { data, error } = await supabase
      .from("project_images")
      .select("id, project_id, storage_path, alt_text, caption, display_order, is_cover, created_at")
      .eq("project_id", resolvedId)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return [];
    }

    return data.map((row) => {
      const { data: urlData } = supabase.storage
        .from("portfolio-images")
        .getPublicUrl(row.storage_path);

      return {
        id: row.id,
        project_id: row.project_id,
        storage_path: row.storage_path,
        alt_text: row.alt_text,
        caption: row.caption || null,
        display_order: row.display_order,
        is_cover: row.is_cover,
        created_at: row.created_at,
        public_url: urlData?.publicUrl || "",
      };
    });
  } catch {
    console.warn("Supabase fetchPublishedProjectImages notice: Returning empty image array on error.");
    return [];
  }
}
