import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { C, containerVariants, itemVariants } from "../components/constants";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const categories = ["All", "IoT & Smart", "Web & App", "Robotics", "HMI"];

const projects = [
  {
    id: 1,
    title: "Web Monitoring Kandang Ayam",
    category: "IoT & Smart",
    desc: "Web-based monitoring and control platform for closed-house chicken farms. Developed at PT. Reinutech Perbeja for centralized management and automation.",
    tags: ["IoT", "Web Dev", "Smart Farm"],
    year: "2026",
    img: "https://images.unsplash.com/photo-1720962158883-b0f2021fb51e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkYXNoYm9hcmQlMjBkYXRhJTIwbW9uaXRvcmluZ3xlbnwxfHx8fDE3NzcyODc1Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    color: C.green,
    featured: true,
  },
  {
    id: 2,
    title: "HMI Climate Control System",
    category: "HMI",
    desc: "Nextion-based Human-Machine Interface for chicken farm climate control systems. Displays real-time sensor data and automatic controls.",
    tags: ["Nextion", "HMI", "Climate Control"],
    year: "2025",
    img: "https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250cm9sJTIwcGFuZWwlMjBpbmR1c3RyaWFsJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc3NzI4NzU0NHww&ixlib=rb-4.1.0&q=80&w=1080",
    color: C.blue,
    featured: false,
  },
  {
    id: 3,
    title: "Flutter Monitoring App",
    category: "Web & App",
    desc: "Flutter-based mobile application for farm monitoring and reporting systems. Developed alongside IoT platforms at PT. Reinutech Perbeja.",
    tags: ["Flutter", "Mobile", "IoT"],
    year: "2025",
    img: "https://images.unsplash.com/photo-1767449181027-dbca7575f91b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkYXNoYm9hcmQlMjBtb25pdG9yaW5nfGVufDF8fHx8MTc3NzI4NzU0NHww&ixlib=rb-4.1.0&q=80&w=1080",
    color: C.mantis,
    featured: false,
  },
  {
    id: 4,
    title: "Autonomous Surface Vehicle (ASV)",
    category: "Robotics",
    desc: "Autonomous surface vessel for the Indonesian Boat Contest. Won 1st Place in Fun Race & Honorable Mention in the Autonomous Surface Vessel category.",
    tags: ["Robotics", "Electrical", "PCB"],
    year: "2025",
    img: "https://images.unsplash.com/photo-1758873272869-9130397ff7d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdCUyMGVsZWN0cm9uaWNzJTIwYm9hcmQlMjBlbmdpbmVlcmluZ3xlbnwxfHx8fDE3NzcyODc1NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#7C3AED",
    featured: true,
  },
  {
    id: 5,
    title: "Water Tank Control System",
    category: "IoT & Smart",
    desc: "Automatic water tank control and monitoring system. Served as electrical team member in developing water distribution management systems.",
    tags: ["PLC", "Control", "Monitoring"],
    year: "2025",
    img: "https://images.unsplash.com/photo-1760386129108-d17b9cdfc4fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpb3QlMjBzZW5zb3IlMjBlbGVjdHJvbmljJTIwYm9hcmR8ZW58MXx8fHwxNzc3MTgxNzI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    color: C.lime,
    featured: false,
  },
  {
    id: 6,
    title: "Program Auto Time Scheduling",
    category: "Web & App",
    desc: "Automatic Time Scheduling Generator Program. Registered as Intellectual Property Rights (HKI/Copyright) in 2024.",
    tags: ["Software", "Copyright", "Scheduling"],
    year: "2024",
    img: "https://images.unsplash.com/photo-1720962158883-b0f2021fb51e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGUlMjBkYXJrfGVufDF8fHx8MTc3NzI4NzUzOHww&ixlib=rb-4.1.0&q=80&w=600",
    color: C.mantisLight,
    featured: false,
  },
];

export default function Karya() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="h-full p-1 pb-6">
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
            <motion.span
              style={{ color: C.lime }}
            >
              WORKS
            </motion.span>
          </h1>
          <p style={{ color: "rgba(246,247,237,0.4)", fontSize: "11px" }}>
            {filtered.length} projects displayed
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
        className="grid grid-cols-2 md:grid-cols-3 gap-3"
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
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                <div className="flex flex-wrap gap-1 mb-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 md:px-2 py-0.5 rounded-full whitespace-nowrap"
                      style={{ backgroundColor: "rgba(246,247,237,0.1)", color: "rgba(246,247,237,0.6)", fontSize: "7px", backdropFilter: "blur(10px)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="line-clamp-2 leading-tight" style={{ color: C.white, fontWeight: 800, fontSize: "11px" }}>{project.title}</h3>

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
                    View Details →
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
