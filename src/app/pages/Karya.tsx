import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { C, containerVariants, itemVariants } from "../components/constants";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const categories = ["Semua", "Web & App", "Mobile", "Brand", "Strategi"];

const projects = [
  {
    id: 1,
    title: "FinTrack Dashboard",
    category: "Web & App",
    desc: "Platform manajemen keuangan berbasis AI untuk UMKM dengan 50K+ pengguna aktif.",
    tags: ["React", "UX Research", "Data Viz"],
    year: "2024",
    img: "https://images.unsplash.com/photo-1720962158883-b0f2021fb51e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ24lMjBwcm9qZWN0JTIwZGFzaGJvYXJkJTIwZGFyayUyMHVpfGVufDF8fHx8MTc3NzI4NzUzOHww&ixlib=rb-4.1.0&q=80&w=1080",
    color: C.green,
    featured: true,
  },
  {
    id: 2,
    title: "MediConnect App",
    category: "Mobile",
    desc: "Aplikasi telemedisin yang menghubungkan pasien dengan dokter spesialis dalam 10 menit.",
    tags: ["iOS", "Android", "UX"],
    year: "2024",
    img: "https://images.unsplash.com/photo-1767449181027-dbca7575f91b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ24lMjBwb3J0Zm9saW8lMjBzY3JlZW58ZW58MXx8fHwxNzc3Mjg3NTM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    color: C.blue,
    featured: false,
  },
  {
    id: 3,
    title: "Nusantara Brew",
    category: "Brand",
    desc: "Identitas merek premium untuk jaringan kedai kopi lokal yang kini hadir di 50 kota.",
    tags: ["Branding", "Logo", "Packaging"],
    year: "2023",
    img: "https://images.unsplash.com/photo-1760386129108-d17b9cdfc4fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwbG9nbyUyMGRlc2lnbiUyMGNyZWF0aXZlfGVufDF8fHx8MTc3NzE4MTcyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    color: C.mantis,
    featured: false,
  },
  {
    id: 4,
    title: "RetailOS Platform",
    category: "Strategi",
    desc: "Strategi transformasi digital untuk jaringan ritel nasional dengan 800+ gerai.",
    tags: ["Strategy", "Research", "UX Audit"],
    year: "2023",
    img: "https://images.unsplash.com/photo-1758873272869-9130397ff7d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwc3RyYXRlZ3klMjBidXNpbmVzcyUyMHBsYW5uaW5nJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3NzI4NzU0Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#7C3AED",
    featured: false,
  },
  {
    id: 5,
    title: "DataPulse Analytics",
    category: "Web & App",
    desc: "Dashboard analitik real-time untuk tim marketing di perusahaan enterprise.",
    tags: ["Dashboard", "Charts", "B2B"],
    year: "2022",
    img: "https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGFuYWx5dGljcyUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NzcyODc1NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    color: C.lime,
    featured: true,
  },
  {
    id: 6,
    title: "EduPath LMS",
    category: "Mobile",
    desc: "Platform pembelajaran adaptif dengan AI untuk pelajar K-12 di seluruh Indonesia.",
    tags: ["EdTech", "Mobile", "AI UX"],
    year: "2022",
    img: "https://images.unsplash.com/photo-1720962158883-b0f2021fb51e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ24lMjBwcm9qZWN0JTIwZGFzaGJvYXJkJTIwZGFyayUyMHVpfGVufDF8fHx8MTc3NzI4NzUzOHww&ixlib=rb-4.1.0&q=80&w=600",
    color: C.mantisLight,
    featured: false,
  },
];

export default function Karya() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered = activeFilter === "Semua"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="h-full p-1 pb-6">
      {/* Header */}
      <motion.div className="mb-5" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <span style={{ color: C.lime, fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em" }}>
            03 — KARYA
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: "rgba(219,230,76,0.2)" }} />
        </div>
        <div className="flex items-end justify-between">
          <h1 className="uppercase" style={{ color: C.white, fontWeight: 900, fontSize: "clamp(22px, 3vw, 38px)", letterSpacing: "-0.02em" }}>
            PORTOFOLIO{" "}
            <motion.span
              style={{ color: C.lime }}
              animate={{ textShadow: [`0 0 20px rgba(219,230,76,0)`, `0 0 30px rgba(219,230,76,0.5)`, `0 0 20px rgba(219,230,76,0)`] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              KARYA
            </motion.span>
          </h1>
          <p style={{ color: "rgba(246,247,237,0.4)", fontSize: "11px" }}>
            {filtered.length} proyek ditampilkan
          </p>
        </div>
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        className="flex gap-2 mb-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className="px-4 py-2 rounded-xl relative overflow-hidden"
            style={{
              backgroundColor: activeFilter === cat ? C.lime : "rgba(246,247,237,0.05)",
              border: activeFilter === cat ? "none" : "1px solid rgba(246,247,237,0.1)",
              color: activeFilter === cat ? C.midnight : "rgba(246,247,237,0.6)",
              fontSize: "10px",
              fontWeight: activeFilter === cat ? 800 : 500,
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            {cat}
          </motion.button>
        ))}
      </motion.div>

      {/* Projects grid */}
      <motion.div
        className="grid gap-3"
        style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
        layout
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              className="rounded-2xl overflow-hidden relative cursor-pointer group"
              style={{
                height: 220,
                gridColumn: project.featured ? "span 1" : "span 1",
                boxShadow: `0 8px 32px rgba(0,0,0,0.3)`,
              }}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              onHoverStart={() => setHoveredId(project.id)}
              onHoverEnd={() => setHoveredId(null)}
              whileHover={{ y: -4, boxShadow: `0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px ${project.color}44` }}
            >
              {/* Image */}
              <ImageWithFallback
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Base overlay */}
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(to top, rgba(0,31,63,0.95) 0%, rgba(0,31,63,0.3) 60%, transparent 100%)` }}
              />

              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0"
                style={{ background: `linear-gradient(135deg, ${project.color}33, transparent)` }}
                animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Featured badge */}
              {project.featured && (
                <div
                  className="absolute top-3 right-3 px-2 py-1 rounded-full"
                  style={{ backgroundColor: C.lime, fontSize: "8px", color: C.midnight, fontWeight: 800 }}
                >
                  ✦ FEATURED
                </div>
              )}

              {/* Year badge */}
              <div
                className="absolute top-3 left-3 px-2 py-1 rounded-full"
                style={{ backgroundColor: `${project.color}33`, border: `1px solid ${project.color}44`, fontSize: "8px", color: project.color, fontWeight: 700, backdropFilter: "blur(10px)" }}
              >
                {project.year}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex gap-1.5 mb-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "rgba(246,247,237,0.1)", color: "rgba(246,247,237,0.6)", fontSize: "8px", backdropFilter: "blur(10px)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 style={{ color: C.white, fontWeight: 800, fontSize: "14px" }}>{project.title}</h3>

                {/* Desc on hover */}
                <motion.p
                  style={{ color: "rgba(246,247,237,0.65)", fontSize: "10px", lineHeight: 1.5 }}
                  animate={{
                    opacity: hoveredId === project.id ? 1 : 0,
                    y: hoveredId === project.id ? 0 : 6,
                  }}
                  transition={{ duration: 0.25 }}
                >
                  {project.desc}
                </motion.p>

                {/* CTA on hover */}
                <motion.div
                  className="flex items-center gap-2 mt-2"
                  animate={{
                    opacity: hoveredId === project.id ? 1 : 0,
                    y: hoveredId === project.id ? 0 : 8,
                  }}
                  transition={{ duration: 0.25, delay: 0.05 }}
                >
                  <span style={{ color: project.color === C.lime ? C.midnight : C.lime, fontSize: "10px", fontWeight: 700 }}>
                    Lihat Detail →
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
