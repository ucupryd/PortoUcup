import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import { C, containerVariants, itemVariants } from "../components/constants";
import { supabase } from "../../lib/supabase";
import { ShieldCheck, ArrowLeft, Save, AlertTriangle, Layers, Star, Eye, Image as ImageIcon } from "lucide-react";
import { AdminProjectImages } from "../components/AdminProjectImages";

const CATEGORY_SUGGESTIONS = [
  "IoT & Web System",
  "Artificial Intelligence",
  "Smart System",
  "Design System",
  "Cybersecurity & Web App",
  "Spatial Computing & AR",
  "FinTech & Enterprise",
  "Hardware & Embedded Systems",
  "Edge AI & Vision",
  "Clean Architecture & Backend",
  "Robotics & HMI",
];

export interface FormErrors {
  title?: string;
  slug?: string;
  category?: string;
  short_description?: string;
  role?: string;
  period?: string;
  display_order?: string;
  demo_url?: string;
  github_url?: string;
  documentation_url?: string;
}

export default function AdminProjectForm() {
  const { id } = useParams<{ id?: string }>();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [autoSlug, setAutoSlug] = useState(true);
  const [category, setCategory] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [role, setRole] = useState("");
  const [period, setPeriod] = useState("");
  const [technologiesText, setTechnologiesText] = useState("");
  const [copyrightNumber, setCopyrightNumber] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [documentationUrl, setDocumentationUrl] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [displayOrder, setDisplayOrder] = useState<number>(0);

  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showFeaturedWarning, setShowFeaturedWarning] = useState(false);

  // Helper to generate slug from title
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setIsDirty(true);
    if (!isEditMode && autoSlug) {
      setSlug(generateSlug(val));
    }
  };

  const handleSlugChange = (val: string) => {
    setAutoSlug(false);
    setSlug(val);
    setIsDirty(true);
  };

  const handleFeaturedToggle = (checked: boolean) => {
    setIsFeatured(checked);
    setIsDirty(true);
    if (checked && !slug.toLowerCase().includes("ebro")) {
      setShowFeaturedWarning(true);
    } else {
      setShowFeaturedWarning(false);
    }
  };

  const handleBackOrCancel = () => {
    if (isDirty && !successMessage) {
      const confirmed = window.confirm("You have unsaved changes. Are you sure you want to leave?");
      if (!confirmed) return;
    }
    navigate("/admin/projects");
  };

  // Fetch project data if in edit mode
  useEffect(() => {
    if (!isEditMode || !id) return;

    let isMounted = true;

    async function loadProject() {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select(
            "id, title, slug, category, short_description, full_description, role, period, technologies, copyright_number, demo_url, github_url, documentation_url, is_featured, is_published, display_order"
          )
          .eq("id", id)
          .single();

        if (error || !data) {
          console.warn("Admin project edit notice: Failed to load project record.");
          if (isMounted) {
            setApiError("Project record not found or access denied.");
            setIsLoading(false);
          }
          return;
        }

        if (isMounted) {
          setTitle(data.title || "");
          setSlug(data.slug || "");
          setAutoSlug(false);
          setCategory(data.category || "");
          setShortDescription(data.short_description || "");
          setFullDescription(data.full_description || "");
          setRole(data.role || "");
          setPeriod(data.period || "");
          setTechnologiesText(Array.isArray(data.technologies) ? data.technologies.join(", ") : "");
          setCopyrightNumber(data.copyright_number || "");
          setDemoUrl(data.demo_url || "");
          setGithubUrl(data.github_url || "");
          setDocumentationUrl(data.documentation_url || "");
          setIsFeatured(Boolean(data.is_featured));
          setIsPublished(Boolean(data.is_published));
          setDisplayOrder(typeof data.display_order === "number" ? data.display_order : 0);
          
          if (data.is_featured && !data.slug.toLowerCase().includes("ebro")) {
            setShowFeaturedWarning(true);
          }

          setIsLoading(false);
          setIsDirty(false);
        }
      } catch {
        console.warn("Admin project edit notice: Network error while loading record.");
        if (isMounted) {
          setApiError("Failed to fetch project details due to a network connection error.");
          setIsLoading(false);
        }
      }
    }

    loadProject();

    return () => {
      isMounted = false;
    };
  }, [id, isEditMode]);

  // Form Validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = "Project title is required.";
    }

    if (!slug.trim()) {
      newErrors.slug = "Slug is required.";
    } else if (!/^[a-z0-9-]+$/.test(slug.trim())) {
      newErrors.slug = "Slug must contain only lowercase letters, numbers, and hyphens.";
    }

    if (!category.trim()) {
      newErrors.category = "Category is required.";
    }

    if (!shortDescription.trim()) {
      newErrors.short_description = "Short description is required.";
    } else if (shortDescription.length > 500) {
      newErrors.short_description = "Short description must be 500 characters or less.";
    }

    if (!role.trim()) {
      newErrors.role = "Role is required.";
    }

    if (!period.trim()) {
      newErrors.period = "Period is required.";
    }

    if (displayOrder === undefined || displayOrder === null || isNaN(displayOrder) || displayOrder < 0 || !Number.isInteger(Number(displayOrder))) {
      newErrors.display_order = "Display order must be an integer greater than or equal to 0.";
    }

    const validateUrl = (url: string, fieldName: keyof FormErrors) => {
      if (url.trim() && !url.trim().startsWith("https://")) {
        newErrors[fieldName] = "URL must start with https://";
      }
    };

    validateUrl(demoUrl, "demo_url");
    validateUrl(githubUrl, "github_url");
    validateUrl(documentationUrl, "documentation_url");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setSuccessMessage(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    const parsedTechnologies = technologiesText
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      category: category.trim(),
      short_description: shortDescription.trim(),
      full_description: fullDescription.trim() || null,
      role: role.trim(),
      period: period.trim(),
      technologies: parsedTechnologies,
      copyright_number: copyrightNumber.trim() || null,
      demo_url: demoUrl.trim() || null,
      github_url: githubUrl.trim() || null,
      documentation_url: documentationUrl.trim() || null,
      is_featured: isFeatured,
      is_published: isPublished,
      display_order: Number(displayOrder),
    };

    try {
      if (isEditMode && id) {
        const { error } = await supabase
          .from("projects")
          .update(payload)
          .eq("id", id);

        if (error) {
          if (error.code === "23505" || error.message.includes("unique")) {
            setErrors((prev) => ({ ...prev, slug: "A project with this slug already exists. Please choose a unique slug." }));
            setApiError("Failed to update project. Duplicate slug detected.");
          } else {
            setApiError("Failed to update project. Please verify admin database permissions.");
          }
          setIsSubmitting(false);
          return;
        }

        setSuccessMessage("Project updated successfully! Redirecting...");
      } else {
        const { error } = await supabase
          .from("projects")
          .insert([payload]);

        if (error) {
          if (error.code === "23505" || error.message.includes("unique")) {
            setErrors((prev) => ({ ...prev, slug: "A project with this slug already exists. Please choose a unique slug." }));
            setApiError("Failed to create project. Duplicate slug detected.");
          } else {
            setApiError("Failed to create project. Please verify admin database permissions.");
          }
          setIsSubmitting(false);
          return;
        }

        setSuccessMessage("Project created successfully! Redirecting...");
      }

      setIsDirty(false);
      setTimeout(() => {
        navigate("/admin/projects");
      }, 1000);
    } catch {
      setApiError("An unexpected error occurred while saving the project record.");
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="flex flex-col gap-5 max-w-4xl mx-auto"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Header */}
      <motion.div
        className="rounded-2xl p-5 flex items-center justify-between gap-4"
        style={{
          backgroundColor: "rgba(246,247,237,0.04)",
          border: "1px solid rgba(246,247,237,0.08)",
        }}
        variants={itemVariants}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={handleBackOrCancel}
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-[rgba(246,247,237,0.06)] hover:bg-[rgba(246,247,237,0.12)] text-white transition-colors"
            title="Back to Projects"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h2 className="uppercase" style={{ color: C.white, fontWeight: 900, fontSize: "18px", letterSpacing: "0.02em" }}>
              {isEditMode ? "EDIT PROJECT" : "CREATE NEW PROJECT"}
            </h2>
            <p style={{ color: "rgba(246,247,237,0.5)", fontSize: "11px" }}>
              {isEditMode ? `Updating database record ID: ${id}` : "Add a verified project record to the portfolio database"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider"
            style={{ backgroundColor: "rgba(0,128,76,0.2)", color: C.lime, border: "1px solid rgba(0,128,76,0.3)" }}
          >
            {isEditMode ? "UPDATE MODE" : "INSERT MODE"}
          </span>
        </div>
      </motion.div>

      {/* Notifications */}
      {apiError && (
        <motion.div
          className="rounded-xl p-4 flex items-center gap-3 bg-red-950/40 border border-red-500/40 text-red-200"
          variants={itemVariants}
        >
          <AlertTriangle size={18} className="text-red-400 shrink-0" />
          <p className="text-xs font-medium">{apiError}</p>
        </motion.div>
      )}

      {successMessage && (
        <motion.div
          className="rounded-xl p-4 flex items-center gap-3 bg-emerald-950/40 border border-emerald-500/40 text-emerald-200"
          variants={itemVariants}
        >
          <ShieldCheck size={18} className="text-emerald-400 shrink-0" />
          <p className="text-xs font-medium">{successMessage}</p>
        </motion.div>
      )}

      {showFeaturedWarning && (
        <motion.div
          className="rounded-xl p-4 flex items-start gap-3 bg-amber-950/40 border border-amber-500/40 text-amber-200"
          variants={itemVariants}
        >
          <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-amber-300">Featured Project Notice</p>
            <p className="text-[11px] text-amber-200/80 mt-0.5">
              <strong>eBro</strong> is established as the primary featured project. Marking another project as featured will result in multiple featured projects in database queries.
            </p>
          </div>
        </motion.div>
      )}

      {/* Form Content */}
      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[rgba(0,31,63,0.4)] border border-[rgba(219,230,76,0.2)]">
            <span className="w-2 h-2 rounded-full animate-pulse bg-[#dbe64c]" />
            <span className="text-xs text-white font-medium">Loading Project Record...</span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Section 1: Basic Information */}
          <motion.div
            className="rounded-2xl p-5 flex flex-col gap-4 bg-[rgba(246,247,237,0.03)] border border-[rgba(246,247,237,0.07)]"
            variants={itemVariants}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#dbe64c] border-b border-[rgba(246,247,237,0.08)] pb-2 flex items-center gap-2">
              <Layers size={14} /> 1. Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-white">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. eBro — Smart Poultry Farm System"
                  disabled={isSubmitting}
                  className="rounded-xl px-3.5 py-2.5 bg-[rgba(0,31,63,0.4)] border border-[rgba(246,247,237,0.12)] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#dbe64c] transition-colors"
                />
                {errors.title && <p className="text-[10px] text-red-400 font-medium">{errors.title}</p>}
              </div>

              {/* Slug */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-white">
                  Slug <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="ebro-smart-poultry-farm"
                  disabled={isSubmitting}
                  className="rounded-xl px-3.5 py-2.5 bg-[rgba(0,31,63,0.4)] border border-[rgba(246,247,237,0.12)] text-xs text-white font-mono placeholder-gray-500 focus:outline-none focus:border-[#dbe64c] transition-colors"
                />
                {errors.slug && <p className="text-[10px] text-red-400 font-medium">{errors.slug}</p>}
              </div>

              {/* Category */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-white">
                  Category <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  list="category-suggestions"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setIsDirty(true);
                  }}
                  placeholder="e.g. IoT & Smart Systems"
                  disabled={isSubmitting}
                  className="rounded-xl px-3.5 py-2.5 bg-[rgba(0,31,63,0.4)] border border-[rgba(246,247,237,0.12)] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#dbe64c] transition-colors"
                />
                <datalist id="category-suggestions">
                  {CATEGORY_SUGGESTIONS.map((cat) => (
                    <option key={cat} value={cat} />
                  ))}
                </datalist>
                {errors.category && <p className="text-[10px] text-red-400 font-medium">{errors.category}</p>}
              </div>

              {/* Display Order */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-white">
                  Display Order <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={displayOrder}
                  onChange={(e) => {
                    setDisplayOrder(parseInt(e.target.value, 10) || 0);
                    setIsDirty(true);
                  }}
                  disabled={isSubmitting}
                  className="rounded-xl px-3.5 py-2.5 bg-[rgba(0,31,63,0.4)] border border-[rgba(246,247,237,0.12)] text-xs text-white focus:outline-none focus:border-[#dbe64c] transition-colors"
                />
                {errors.display_order && <p className="text-[10px] text-red-400 font-medium">{errors.display_order}</p>}
              </div>
            </div>
          </motion.div>

          {/* Section 2: Role & Timeline */}
          <motion.div
            className="rounded-2xl p-5 flex flex-col gap-4 bg-[rgba(246,247,237,0.03)] border border-[rgba(246,247,237,0.07)]"
            variants={itemVariants}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#dbe64c] border-b border-[rgba(246,247,237,0.08)] pb-2">
              2. Role & Period
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Role */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-white">
                  Role <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                    setIsDirty(true);
                  }}
                  placeholder="e.g. IoT Engineer & Full-Stack Developer"
                  disabled={isSubmitting}
                  className="rounded-xl px-3.5 py-2.5 bg-[rgba(0,31,63,0.4)] border border-[rgba(246,247,237,0.12)] text-xs text-white focus:outline-none focus:border-[#dbe64c] transition-colors"
                />
                {errors.role && <p className="text-[10px] text-red-400 font-medium">{errors.role}</p>}
              </div>

              {/* Period */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-white">
                  Period / Year <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={period}
                  onChange={(e) => {
                    setPeriod(e.target.value);
                    setIsDirty(true);
                  }}
                  placeholder="e.g. 2025 – 2026"
                  disabled={isSubmitting}
                  className="rounded-xl px-3.5 py-2.5 bg-[rgba(0,31,63,0.4)] border border-[rgba(246,247,237,0.12)] text-xs text-white focus:outline-none focus:border-[#dbe64c] transition-colors"
                />
                {errors.period && <p className="text-[10px] text-red-400 font-medium">{errors.period}</p>}
              </div>
            </div>
          </motion.div>

          {/* Section 3: Descriptions */}
          <motion.div
            className="rounded-2xl p-5 flex flex-col gap-4 bg-[rgba(246,247,237,0.03)] border border-[rgba(246,247,237,0.07)]"
            variants={itemVariants}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#dbe64c] border-b border-[rgba(246,247,237,0.08)] pb-2">
              3. Descriptions
            </h3>

            {/* Short Description */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-white">
                  Short Description <span className="text-red-400">*</span>
                </label>
                <span className="text-[10px] text-gray-400">{shortDescription.length} / 500 chars</span>
              </div>
              <textarea
                rows={3}
                value={shortDescription}
                onChange={(e) => {
                  setShortDescription(e.target.value);
                  setIsDirty(true);
                }}
                placeholder="Brief summary displayed on project cards..."
                disabled={isSubmitting}
                className="rounded-xl p-3 bg-[rgba(0,31,63,0.4)] border border-[rgba(246,247,237,0.12)] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#dbe64c] transition-colors resize-none"
              />
              {errors.short_description && <p className="text-[10px] text-red-400 font-medium">{errors.short_description}</p>}
            </div>

            {/* Full Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-white">Full Description (Optional)</label>
              <textarea
                rows={4}
                value={fullDescription}
                onChange={(e) => {
                  setFullDescription(e.target.value);
                  setIsDirty(true);
                }}
                placeholder="Detailed narrative displayed in the project modal..."
                disabled={isSubmitting}
                className="rounded-xl p-3 bg-[rgba(0,31,63,0.4)] border border-[rgba(246,247,237,0.12)] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#dbe64c] transition-colors resize-none"
              />
            </div>
          </motion.div>

          {/* Section 4: Technologies & IP Metadata */}
          <motion.div
            className="rounded-2xl p-5 flex flex-col gap-4 bg-[rgba(246,247,237,0.03)] border border-[rgba(246,247,237,0.07)]"
            variants={itemVariants}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#dbe64c] border-b border-[rgba(246,247,237,0.08)] pb-2">
              4. Technologies & Copyright
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Technologies */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-white">Technologies / Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={technologiesText}
                  onChange={(e) => {
                    setTechnologiesText(e.target.value);
                    setIsDirty(true);
                  }}
                  placeholder="LoRa, IoT, HMI, Flutter, Web Monitoring"
                  disabled={isSubmitting}
                  className="rounded-xl px-3.5 py-2.5 bg-[rgba(0,31,63,0.4)] border border-[rgba(246,247,237,0.12)] text-xs text-white focus:outline-none focus:border-[#dbe64c] transition-colors"
                />
              </div>

              {/* Copyright Number */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-white">Copyright Registration Number (Optional)</label>
                <input
                  type="text"
                  value={copyrightNumber}
                  onChange={(e) => {
                    setCopyrightNumber(e.target.value);
                    setIsDirty(true);
                  }}
                  placeholder="e.g. EC002026157949"
                  disabled={isSubmitting}
                  className="rounded-xl px-3.5 py-2.5 bg-[rgba(0,31,63,0.4)] border border-[rgba(246,247,237,0.12)] text-xs text-white focus:outline-none focus:border-[#dbe64c] transition-colors font-mono"
                />
              </div>
            </div>

            {/* Optional Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-gray-300">Demo URL (Must start with https://)</label>
                <input
                  type="text"
                  value={demoUrl}
                  onChange={(e) => {
                    setDemoUrl(e.target.value);
                    setIsDirty(true);
                  }}
                  placeholder="https://..."
                  disabled={isSubmitting}
                  className="rounded-xl px-3 py-2 bg-[rgba(0,31,63,0.4)] border border-[rgba(246,247,237,0.12)] text-xs text-white font-mono focus:outline-none focus:border-[#dbe64c]"
                />
                {errors.demo_url && <p className="text-[10px] text-red-400">{errors.demo_url}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-gray-300">GitHub URL (Must start with https://)</label>
                <input
                  type="text"
                  value={githubUrl}
                  onChange={(e) => {
                    setGithubUrl(e.target.value);
                    setIsDirty(true);
                  }}
                  placeholder="https://..."
                  disabled={isSubmitting}
                  className="rounded-xl px-3 py-2 bg-[rgba(0,31,63,0.4)] border border-[rgba(246,247,237,0.12)] text-xs text-white font-mono focus:outline-none focus:border-[#dbe64c]"
                />
                {errors.github_url && <p className="text-[10px] text-red-400">{errors.github_url}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-gray-300">Documentation URL (Must start with https://)</label>
                <input
                  type="text"
                  value={documentationUrl}
                  onChange={(e) => {
                    setDocumentationUrl(e.target.value);
                    setIsDirty(true);
                  }}
                  placeholder="https://..."
                  disabled={isSubmitting}
                  className="rounded-xl px-3 py-2 bg-[rgba(0,31,63,0.4)] border border-[rgba(246,247,237,0.12)] text-xs text-white font-mono focus:outline-none focus:border-[#dbe64c]"
                />
                {errors.documentation_url && <p className="text-[10px] text-red-400">{errors.documentation_url}</p>}
              </div>
            </div>
          </motion.div>

          {/* Section 5: Publishing & Featured Controls */}
          <motion.div
            className="rounded-2xl p-5 flex flex-col gap-4 bg-[rgba(246,247,237,0.03)] border border-[rgba(246,247,237,0.07)]"
            variants={itemVariants}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#dbe64c] border-b border-[rgba(246,247,237,0.08)] pb-2">
              5. Publishing & Featured Controls
            </h3>

            <div className="flex flex-wrap gap-6 items-center">
              {/* Published Toggle */}
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => {
                    setIsPublished(e.target.checked);
                    setIsDirty(true);
                  }}
                  disabled={isSubmitting}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[rgba(246,247,237,0.1)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgba(0,128,76,0.8)] relative"></div>
                <div className="flex items-center gap-1.5">
                  <Eye size={14} className={isPublished ? "text-[#dbe64c]" : "text-gray-400"} />
                  <span className="text-xs font-semibold text-white">Publish to Public Portfolio</span>
                </div>
              </label>

              {/* Featured Toggle */}
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => handleFeaturedToggle(e.target.checked)}
                  disabled={isSubmitting}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[rgba(246,247,237,0.1)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgba(219,230,76,0.8)] relative"></div>
                <div className="flex items-center gap-1.5">
                  <Star size={14} className={isFeatured ? "text-[#dbe64c] fill-[#dbe64c]" : "text-gray-400"} />
                  <span className="text-xs font-semibold text-white">Mark as Featured Project</span>
                </div>
              </label>
            </div>
          </motion.div>

          {/* Section 6: Image Gallery & Upload (Existing Projects Only) */}
          {!isEditMode && (
            <motion.div
              className="rounded-2xl p-5 bg-[rgba(246,247,237,0.03)] border border-[rgba(246,247,237,0.07)] text-gray-400 text-xs flex items-center gap-3"
              variants={itemVariants}
            >
              <ImageIcon size={20} className="text-[#dbe64c] shrink-0" />
              <div>
                <p className="font-semibold text-white">Project Image Upload</p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Image upload is enabled after the project database record is created. Save this project first to manage portfolio gallery images.
                </p>
              </div>
            </motion.div>
          )}

          {isEditMode && id && <AdminProjectImages projectId={id} />}

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleBackOrCancel}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[rgba(246,247,237,0.7)] hover:text-white bg-[rgba(246,247,237,0.05)] hover:bg-[rgba(246,247,237,0.1)] transition-colors border border-[rgba(246,247,237,0.08)]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-midnight bg-[#dbe64c] hover:bg-[#c9d43b] transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
            >
              <Save size={14} />
              <span>{isSubmitting ? "Saving Project..." : isEditMode ? "Update Project" : "Create Project"}</span>
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
}
