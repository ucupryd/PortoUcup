import { motion } from "motion/react";
import { Zap, Target, Handshake, TrendingUp } from "lucide-react";
import { C, containerVariants, itemVariants } from "../components/constants";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

import PROFILE_IMG from "../assets/profil.jpeg";

const values = [
  { Icon: Zap, title: "Innovation", desc: "Always exploring new solutions in IoT, automation, and control technology." },
  { Icon: Target, title: "Precision", desc: "Every system and code is built with high accuracy and technical standards." },
  { Icon: Handshake, title: "Collaboration", desc: "Active in robotics teams, organizations, and cross-disciplinary projects." },
  { Icon: TrendingUp, title: "Impact", desc: "Focused on real solutions that provide benefits and convenience to users." },
];

const tools = [
  "Arduino IDE", "CubeMX", "CubeIDE", "LabView", "Nextion", "EasyBuilderPro",
  "Flutter", "React", "Proteus", "EasyEDA", "Fritzing", "Solidworks",
  "VSCode", "Fluidsim", "PSIM", "ThinkerCad", "Drawlo",
];

const skills = [
  { name: "IoT & Embedded Systems", level: 3 },
  { name: "HMI Development (Nextion)", level: 3 },
  { name: "Web App Development", level: 3 },
  { name: "PLC & Control Systems", level: 2 },
  { name: "PCB Design (EasyEDA)", level: 2 },
  { name: "Flutter Mobile Dev", level: 2 },
];

export default function Tentang() {
  return (
    <div className="h-full p-1 pb-4">
      {/* Header */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-1">
          <motion.span
            style={{ color: C.lime, fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em" }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            01 — ABOUT
          </motion.span>
          <div className="flex-1 h-px" style={{ backgroundColor: "rgba(219,230,76,0.2)" }} />
        </div>
        <h1
          className="uppercase"
          style={{ color: C.white, fontWeight: 900, fontSize: "clamp(22px, 3vw, 38px)", letterSpacing: "-0.02em" }}
        >
          GET TO KNOW{" "}
          <span style={{ color: C.lime }}>
            ME CLOSER
          </span>
        </h1>
      </motion.div>

      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-4">
        {/* Left column */}
        <motion.div
          className="flex flex-col gap-4"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {/* Photo card */}
          <motion.div
            className="rounded-2xl overflow-hidden relative"
            style={{ height: 260, backgroundColor: C.blue, boxShadow: `0 12px 40px rgba(30,72,143,0.35)` }}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <ImageWithFallback
              src={PROFILE_IMG}
              alt="Alex Wirawan"
              className="w-full h-full object-cover object-top"
            />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(to top, ${C.blue}cc 0%, transparent 60%)` }}
            />
            <div className="absolute bottom-4 left-4 right-4">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-2"
                style={{ backgroundColor: "rgba(0,31,63,0.7)", backdropFilter: "blur(10px)", border: `1px solid rgba(219,230,76,0.2)` }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.lime }} />
                <span style={{ color: C.lime, fontSize: "9px", fontWeight: 600 }}>IoT & HMI Developer · Automation</span>
              </div>
              <p className="uppercase" style={{ color: C.white, fontWeight: 900, fontSize: "18px", letterSpacing: "0.04em" }}>
                M. YUSUF RIYADI
              </p>
            </div>
          </motion.div>

          {/* Values grid */}
          <motion.div variants={itemVariants}>
            <p className="uppercase mb-3" style={{ color: "rgba(246,247,237,0.4)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em" }}>
              CORE VALUES
            </p>
            <div className="grid grid-cols-2 gap-2">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  className="rounded-xl p-3 relative overflow-hidden"
                  style={{ backgroundColor: "rgba(246,247,237,0.04)", border: "1px solid rgba(246,247,237,0.07)" }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                  whileHover={{
                    backgroundColor: "rgba(219,230,76,0.06)",
                    borderColor: "rgba(219,230,76,0.15)",
                    y: -2,
                  }}
                >
                  <v.Icon size={16} color={C.lime} />
                  <p className="mt-1.5" style={{ color: C.white, fontSize: "10px", fontWeight: 700 }}>{v.title}</p>
                  <p style={{ color: "rgba(246,247,237,0.4)", fontSize: "8px", lineHeight: 1.5 }}>{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right column */}
        <motion.div
          className="flex flex-col gap-4"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {/* Bio */}
          <motion.div
            className="rounded-2xl p-6 relative overflow-hidden"
            style={{ backgroundColor: C.green, boxShadow: `0 8px 32px rgba(0,128,76,0.2)` }}
            variants={itemVariants}
          >
            <div
              className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
              style={{ background: `radial-gradient(circle, ${C.lime} 0%, transparent 70%)`, opacity: 0.15 }}
            />
            <p className="uppercase mb-3" style={{ color: C.lime, fontSize: "9px", fontWeight: 700, letterSpacing: "0.15em" }}>
              ABOUT ME
            </p>
            <p style={{ color: C.white, fontSize: "13px", lineHeight: 1.75, opacity: 0.9 }}>
              Hi! I'm <strong style={{ color: C.lime }}>M. Yusuf Riyadi</strong>, an active student of <strong style={{ color: C.white }}>Automation Engineering at Undip</strong> and
              a recipient of the Karya Salemba Empat scholarship. Top graduate of SMK Negeri Jawa Tengah
              majoring in Electrical Power Installation.
            </p>
            <p className="mt-3" style={{ color: C.white, fontSize: "13px", lineHeight: 1.75, opacity: 0.75 }}>
              Practical experience from internships as a heavy equipment mechanic at PT. BUMA,
              engineer at Hotel MG Setos, and HMI & Web Developer at PT. Perbeja Reinutech.
              Currently active as Electrical Expert Staff in the Aterkia URDC Undip team.
            </p>
            <p className="mt-3" style={{ color: C.white, fontSize: "13px", lineHeight: 1.75, opacity: 0.6 }}>
              My passion lies in control systems, IoT, embedded systems, and web development
              to create real and impactful technological solutions.
            </p>
          </motion.div>

          {/* Skills */}
          <motion.div
            className="rounded-2xl p-5"
            style={{ backgroundColor: "rgba(246,247,237,0.04)", border: "1px solid rgba(246,247,237,0.07)" }}
            variants={itemVariants}
          >
            <p className="uppercase mb-4" style={{ color: "rgba(246,247,237,0.4)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em" }}>
              EXPERTISE LEVELS
            </p>
            <div className="flex flex-col gap-3">
              {skills.map((skill, i) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1.5">
                    <span style={{ color: C.white, fontSize: "11px", fontWeight: 600 }}>{skill.name}</span>
                    <span style={{ color: C.lime, fontSize: "9px", fontWeight: 700 }}>
                      {skill.level === 1 ? "Beginner" : skill.level === 2 ? "Intermediate" : skill.level === 3 ? "Advanced" : "Expert"}
                    </span>
                  </div>
                  <div className="flex gap-1 h-1.5">
                    {[1, 2, 3, 4].map((levelIndex) => (
                      <div
                        key={levelIndex}
                        className="flex-1 rounded-full overflow-hidden"
                        style={{ backgroundColor: "rgba(246,247,237,0.1)" }}
                      >
                        <motion.div
                          className="h-full rounded-full"
                          style={{ 
                             backgroundColor: skill.level >= levelIndex ? C.lime : "transparent",
                             boxShadow: skill.level >= levelIndex ? `0 0 8px rgba(219,230,76,0.3)` : "none"
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 + (i * 0.05) + (levelIndex * 0.1) }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tools */}
          <motion.div variants={itemVariants}>
            <p className="uppercase mb-3" style={{ color: "rgba(246,247,237,0.4)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em" }}>
              TOOLS & TECHNOLOGY
            </p>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool, i) => (
                <motion.span
                  key={tool}
                  className="px-3 py-1.5 rounded-full"
                  style={{
                    backgroundColor: "rgba(246,247,237,0.05)",
                    border: "1px solid rgba(246,247,237,0.1)",
                    color: C.white,
                    fontSize: "10px",
                    fontWeight: 500,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.05 }}
                  whileHover={{
                    backgroundColor: "rgba(219,230,76,0.1)",
                    borderColor: "rgba(219,230,76,0.3)",
                    color: C.lime,
                    scale: 1.05,
                    y: -2,
                  }}
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
