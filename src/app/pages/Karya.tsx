import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { C } from "../components/constants";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { portfolioData, ProjectData } from "../data/portfolioData";
import { supabase } from "../../lib/supabase";
import { fetchPublishedProjects, fetchPublishedProjectImages, fetchPublishedProjectCardImages, PublishedProjectImage, ProjectCardCover } from "../../lib/contentService";
import { ShieldCheck, User, Calendar, Tag, X, ExternalLink, Image as ImageIcon } from "lucide-react";

const categories = [
  "All",
  "IoT & Smart Systems",
  "Web & Mobile",
  "Robotics & Telemetry",
  "Automation & Control",
  "Software & Automation",
];

const getCategoryColor = (category: string) => {
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

export default function Karya() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredId, setHoveredId] = useState<number | string | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [projects, setProjects] = useState<ProjectData[]>(portfolioData.projects || []);
  const [isLoading, setIsLoading] = useState(true);

  // Modal Project Gallery States
  const [galleryImages, setGalleryImages] = useState<PublishedProjectImage[]>([]);
  const [isImagesLoading, setIsImagesLoading] = useState(false);
  const [galleryCache, setGalleryCache] = useState<Record<string, PublishedProjectImage[]>>({});
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  // Project Card Cover Images Map
  const [coverMap, setCoverMap] = useState<Record<string, ProjectCardCover>>({});

  const isUuid = (id: string | number) =>
    typeof id === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

  useEffect(() => {
    if (!selectedProject) {
      setGalleryImages([]);
      setIsImagesLoading(false);
      setActiveGalleryIndex(0);
      return;
    }

    const projId = String(selectedProject.id);

    // If ID is not a valid UUID (e.g. local numeric fallback ID), do not query database
    if (!isUuid(projId)) {
      setGalleryImages([]);
      setIsImagesLoading(false);
      setActiveGalleryIndex(0);
      return;
    }

    // Check cache to avoid duplicate network calls when reopening same project
    if (galleryCache[projId]) {
      setGalleryImages(galleryCache[projId]);
      setIsImagesLoading(false);
      setActiveGalleryIndex(0);
      return;
    }

    let isMounted = true;
    setIsImagesLoading(true);

    fetchPublishedProjectImages(projId).then((imgs) => {
      if (isMounted) {
        setGalleryImages(imgs);
        setGalleryCache((prev) => ({ ...prev, [projId]: imgs }));
        setIsImagesLoading(false);
        setActiveGalleryIndex(0);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [selectedProject]);

  useEffect(() => {
    let isMounted = true;

    async function loadKaryaContent() {
      const [projectsRes, coverMapRes] = await Promise.allSettled([
        fetchPublishedProjects(),
        fetchPublishedProjectCardImages(),
      ]);

      if (isMounted) {
        if (projectsRes.status === "fulfilled" && projectsRes.value) {
          setProjects(projectsRes.value);
        }
        if (coverMapRes.status === "fulfilled" && coverMapRes.value) {
          setCoverMap(coverMapRes.value);
        }
        setIsLoading(false);
      }
    }

    loadKaryaContent();

    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="h-full p-1 pb-6 relative">
      {/* Header */}
      <motion.div className="mb-5" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <span style={{ color: C.lime, fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em" }}>
            03 — WORKS
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: "rgba(219,230,76,0.2)" }} />
        </div>
        <div className="flex items-end justify-between">
          <h1 className="uppercase" style={{ color: C.white, fontWeight: 900, fontSize: "clamp(22px, 3vw, 38px)", letterSpacing: "-0.02em" }}>
            PORTFOLIO{" "}
            <span style={{ color: C.lime }}>
              PROJECTS
            </span>
          </h1>
          <p style={{ color: "rgba(246,247,237,0.4)", fontSize: "11px" }}>
            {filtered.length} projects displayed
          </p>
        </div>
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        className="flex flex-wrap gap-2 mb-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className="px-3 py-1.5 rounded-xl relative overflow-hidden"
            style={{
              backgroundColor: activeFilter === cat ? C.lime : "rgba(246,247,237,0.05)",
              border: activeFilter === cat ? "none" : "1px solid rgba(246,247,237,0.1)",
              color: activeFilter === cat ? C.midnight : "rgba(246,247,237,0.6)",
              fontSize: "10px",
              fontWeight: activeFilter === cat ? 800 : 500,
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            {cat}
          </motion.button>
        ))}
      </motion.div>

      {/* Projects grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => {
            const cardColor = project.color || getCategoryColor(project.category);
            const coverInfo = coverMap[project.slug] || coverMap[String(project.id)];
            const cardImgSrc = coverInfo?.publicUrl || project.img || project.imageUrl;
            const cardAltText = coverInfo?.altText || project.title;

            return (
              <motion.div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="rounded-2xl overflow-hidden relative cursor-pointer group flex flex-col justify-between"
                style={{
                  minHeight: 220,
                  backgroundColor: "rgba(246,247,237,0.04)",
                  border: "1px solid rgba(246,247,237,0.07)",
                  boxShadow: `0 8px 32px rgba(0,0,0,0.3)`,
                }}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                onHoverStart={() => setHoveredId(project.id)}
                onHoverEnd={() => setHoveredId(null)}
                whileHover={{ y: -4, boxShadow: `0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px ${cardColor}44` }}
              >
                {/* Background Image / Gradient */}
                {cardImgSrc ? (
                  <div className="absolute inset-0 z-0">
                    <ImageWithFallback
                      src={cardImgSrc}
                      alt={cardAltText}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: `linear-gradient(to top, rgba(0,31,63,0.98) 0%, rgba(0,31,63,0.75) 50%, rgba(0,31,63,0.4) 100%)` }}
                    />
                  </div>
                ) : (
                  <div
                    className="absolute inset-0 z-0"
                    style={{ background: `linear-gradient(135deg, rgba(0,31,63,0.95), ${cardColor}22)` }}
                  />
                )}

                {/* Hover gradient overlay */}
                <motion.div
                  className="absolute inset-0 z-0 pointer-events-none"
                  style={{ background: `linear-gradient(135deg, ${cardColor}33, transparent)` }}
                  animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Top Badges */}
                <div className="relative z-10 p-3 flex items-center justify-between">
                  <span
                    className="px-2 py-1 rounded-full text-xs"
                    style={{ backgroundColor: `${cardColor}33`, border: `1px solid ${cardColor}44`, fontSize: "8px", color: cardColor, fontWeight: 700, backdropFilter: "blur(10px)" }}
                  >
                    {project.year}
                  </span>

                  {project.featured && (
                    <span
                      className="px-2 py-1 rounded-full"
                      style={{ backgroundColor: C.lime, fontSize: "8px", color: C.midnight, fontWeight: 800 }}
                    >
                      ✦ FEATURED
                    </span>
                  )}
                </div>

                {/* Main Content */}
                <div className="relative z-10 p-4 pt-0 flex flex-col justify-end h-full">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full whitespace-nowrap"
                        style={{ backgroundColor: "rgba(246,247,237,0.1)", color: "rgba(246,247,237,0.7)", fontSize: "8px", backdropFilter: "blur(10px)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="line-clamp-2 leading-tight mb-1" style={{ color: C.white, fontWeight: 800, fontSize: "12px" }}>
                    {project.title}
                  </h3>

                  <p className="line-clamp-2" style={{ color: "rgba(246,247,237,0.65)", fontSize: "10px", lineHeight: 1.5 }}>
                    {project.desc}
                  </p>

                  {project.copyrightNumber && (
                    <div className="flex items-center gap-1.5 mt-2">
                      <ShieldCheck size={12} color={C.lime} />
                      <span style={{ color: C.lime, fontSize: "9px", fontWeight: 600 }}>
                        Reg. No. {project.copyrightNumber}
                      </span>
                    </div>
                  )}

                  {/* CTA on hover */}
                  <motion.div
                    className="flex items-center gap-1 mt-2"
                    animate={{
                      opacity: hoveredId === project.id ? 1 : 0.7,
                    }}
                  >
                    <span style={{ color: C.lime, fontSize: "10px", fontWeight: 700 }}>
                      View Details →
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              className="relative w-full max-w-lg rounded-2xl p-6 overflow-hidden max-h-[90vh] overflow-y-auto"
              style={{
                backgroundColor: C.midnight,
                border: "1px solid rgba(219,230,76,0.3)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={18} color={C.white} />
              </button>

              {/* Header Info */}
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-full" style={{ backgroundColor: "rgba(219,230,76,0.1)", color: C.lime, fontSize: "9px", fontWeight: 700 }}>
                  {selectedProject.category}
                </span>
                <span className="px-2.5 py-1 rounded-full" style={{ backgroundColor: "rgba(246,247,237,0.05)", color: "rgba(246,247,237,0.6)", fontSize: "9px" }}>
                  {selectedProject.year}
                </span>
              </div>

              <h2 className="text-lg font-bold mb-3 uppercase" style={{ color: C.white, fontWeight: 900 }}>
                {selectedProject.title}
              </h2>

              {/* Role & Copyright */}
              <div className="flex flex-col gap-2 p-3 rounded-xl mb-4" style={{ backgroundColor: "rgba(246,247,237,0.04)", border: "1px solid rgba(246,247,237,0.07)" }}>
                <div className="flex items-center gap-2">
                  <User size={14} color={C.lime} />
                  <span style={{ color: C.white, fontSize: "11px", fontWeight: 600 }}>Role: {selectedProject.role}</span>
                </div>
                {selectedProject.copyrightNumber && (
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} color={C.lime} />
                    <span style={{ color: C.lime, fontSize: "11px", fontWeight: 600 }}>Copyright Reg. No: {selectedProject.copyrightNumber}</span>
                  </div>
                )}
              </div>

              {/* Gallery & Image Display Section */}
              {isImagesLoading ? (
                <div className="flex items-center justify-center p-6 rounded-xl bg-[rgba(246,247,237,0.03)] border border-[rgba(246,247,237,0.07)] mb-4">
                  <div className="flex items-center gap-2 text-xs text-[#dbe64c]">
                    <span className="w-2 h-2 rounded-full animate-pulse bg-[#dbe64c]" />
                    <span>Loading project gallery...</span>
                  </div>
                </div>
              ) : galleryImages.length > 0 ? (
                <div className="mb-4 flex flex-col gap-2">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black/60 border border-[rgba(219,230,76,0.25)]">
                    <img
                      src={galleryImages[activeGalleryIndex]?.public_url}
                      alt={galleryImages[activeGalleryIndex]?.alt_text || selectedProject.title}
                      loading="lazy"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Alt Text & Caption */}
                  <div className="px-1">
                    <p className="text-xs font-semibold text-white">
                      {galleryImages[activeGalleryIndex]?.alt_text}
                    </p>
                    {galleryImages[activeGalleryIndex]?.caption && (
                      <p className="text-[11px] text-[rgba(246,247,237,0.65)] mt-0.5">
                        {galleryImages[activeGalleryIndex]?.caption}
                      </p>
                    )}
                  </div>

                  {/* Carousel Thumbnails */}
                  {galleryImages.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1 pt-1">
                      {galleryImages.map((img, idx) => (
                        <button
                          key={img.id}
                          onClick={() => setActiveGalleryIndex(idx)}
                          className={`relative w-14 h-10 rounded-lg overflow-hidden shrink-0 border transition-all ${
                            activeGalleryIndex === idx
                              ? "border-[#dbe64c] ring-1 ring-[#dbe64c]"
                              : "border-[rgba(246,247,237,0.1)] opacity-60 hover:opacity-100"
                          }`}
                          title={img.alt_text}
                        >
                          <img
                            src={img.public_url}
                            alt={img.alt_text}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (selectedProject.img || selectedProject.imageUrl) ? (
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black/40 border border-[rgba(246,247,237,0.08)] mb-4">
                  <ImageWithFallback
                    src={selectedProject.img || selectedProject.imageUrl}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : null}

              {/* Description */}
              <div className="mb-4">
                <p className="uppercase mb-1" style={{ color: "rgba(246,247,237,0.4)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em" }}>
                  PROJECT DESCRIPTION
                </p>
                <p style={{ color: "rgba(246,247,237,0.8)", fontSize: "12px", lineHeight: 1.7 }}>
                  {selectedProject.desc}
                </p>
              </div>

              {/* Verified Technologies */}
              <div className="mb-6">
                <p className="uppercase mb-2" style={{ color: "rgba(246,247,237,0.4)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em" }}>
                  VERIFIED TECHNOLOGIES
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md"
                      style={{ backgroundColor: "rgba(246,247,237,0.06)", border: "1px solid rgba(246,247,237,0.1)", color: C.white, fontSize: "10px" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Links (Only if explicitly present) */}
              {(selectedProject.demoUrl || selectedProject.githubUrl || selectedProject.documentationUrl) && (
                <div className="flex gap-2">
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs"
                      style={{ backgroundColor: C.lime, color: C.midnight }}
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs"
                      style={{ backgroundColor: "rgba(246,247,237,0.1)", color: C.white }}
                    >
                      <span>Repository</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


