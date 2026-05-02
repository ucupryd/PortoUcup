import { motion } from "motion/react";
import { Zap, Target, Handshake, TrendingUp } from "lucide-react";
import { C, containerVariants, itemVariants } from "../components/constants";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

import PROFILE_IMG from "../assets/profil.jpeg";

const values = [
  { Icon: Zap, title: "Inovasi", desc: "Selalu mengeksplorasi solusi baru di bidang IoT, otomasi, dan teknologi kontrol." },
  { Icon: Target, title: "Presisi", desc: "Setiap sistem dan kode dibuat dengan ketelitian tinggi dan standar teknis." },
  { Icon: Handshake, title: "Kolaborasi", desc: "Aktif di tim robotika, organisasi, dan proyek lintas disiplin." },
  { Icon: TrendingUp, title: "Dampak", desc: "Fokus pada solusi nyata yang memberi manfaat dan kemudahan bagi pengguna." },
];

const tools = [
  "Arduino IDE", "CubeMX", "CubeIDE", "LabView", "Nextion", "EasyBuilderPro",
  "Flutter", "React", "Proteus", "EasyEDA", "Fritzing", "Solidworks",
  "VSCode", "Fluidsim", "PSIM", "ThinkerCad", "Drawlo",
];

const skills = [
  { name: "IoT & Embedded Systems", level: 88 },
  { name: "HMI Development (Nextion)", level: 85 },
  { name: "Web & App Development", level: 82 },
  { name: "PLC & Control Systems", level: 80 },
  { name: "PCB Design (EasyEDA)", level: 78 },
  { name: "Flutter Mobile Dev", level: 75 },
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
            01 — TENTANG
          </motion.span>
          <div className="flex-1 h-px" style={{ backgroundColor: "rgba(219,230,76,0.2)" }} />
        </div>
        <h1
          className="uppercase"
          style={{ color: C.white, fontWeight: 900, fontSize: "clamp(22px, 3vw, 38px)", letterSpacing: "-0.02em" }}
        >
          MENGENAL{" "}
          <motion.span
            style={{ color: C.lime }}
            animate={{ textShadow: [`0 0 20px rgba(219,230,76,0)`, `0 0 30px rgba(219,230,76,0.5)`, `0 0 20px rgba(219,230,76,0)`] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            LEBIH DEKAT
          </motion.span>
        </h1>
      </motion.div>

      {/* Main grid */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1.5fr" }}>
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
              <motion.div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-2"
                style={{ backgroundColor: "rgba(0,31,63,0.7)", backdropFilter: "blur(10px)", border: `1px solid rgba(219,230,76,0.2)` }}
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.lime }} />
                <span style={{ color: C.lime, fontSize: "9px", fontWeight: 600 }}>IoT & HMI Developer · Teknik Otomasi</span>
              </motion.div>
              <p className="uppercase" style={{ color: C.white, fontWeight: 900, fontSize: "18px", letterSpacing: "0.04em" }}>
                M. YUSUF RIYADI
              </p>
            </div>
          </motion.div>

          {/* Values grid */}
          <motion.div variants={itemVariants}>
            <p className="uppercase mb-3" style={{ color: "rgba(246,247,237,0.4)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em" }}>
              NILAI INTI
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
            <motion.div
              className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
              style={{ background: C.lime, filter: "blur(40px)", opacity: 0.08 }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 7, repeat: Infinity }}
            />
            <p className="uppercase mb-3" style={{ color: C.lime, fontSize: "9px", fontWeight: 700, letterSpacing: "0.15em" }}>
              TENTANG SAYA
            </p>
            <p style={{ color: C.white, fontSize: "13px", lineHeight: 1.75, opacity: 0.9 }}>
              Hai! Saya <strong style={{ color: C.lime }}>M. Yusuf Riyadi</strong>, mahasiswa aktif <strong style={{ color: C.white }}>Teknik Otomasi Undip</strong> dan
              penerima beasiswa Karya Salemba Empat. Lulusan terbaik SMK Negeri Jawa Tengah
              jurusan Instalasi Tenaga Listrik.
            </p>
            <p className="mt-3" style={{ color: C.white, fontSize: "13px", lineHeight: 1.75, opacity: 0.75 }}>
              Pengalaman praktis dari magang sebagai mekanik alat berat di PT. BUMA,
              engineer di Hotel MG Setos, dan HMI & Web Developer di PT. Perbeja Reinutech.
              Kini aktif sebagai Electrical Expert Staff di tim Aterkia URDC Undip.
            </p>
            <p className="mt-3" style={{ color: C.white, fontSize: "13px", lineHeight: 1.75, opacity: 0.6 }}>
              Passion saya di sistem kontrol, IoT, embedded systems, dan pengembangan web
              untuk menciptakan solusi teknologi yang nyata dan berdampak.
            </p>
          </motion.div>

          {/* Skills */}
          <motion.div
            className="rounded-2xl p-5"
            style={{ backgroundColor: "rgba(246,247,237,0.04)", border: "1px solid rgba(246,247,237,0.07)" }}
            variants={itemVariants}
          >
            <p className="uppercase mb-4" style={{ color: "rgba(246,247,237,0.4)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em" }}>
              TINGKAT KEAHLIAN
            </p>
            <div className="flex flex-col gap-3">
              {skills.map((skill, i) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1.5">
                    <span style={{ color: C.white, fontSize: "11px", fontWeight: 600 }}>{skill.name}</span>
                    <span style={{ color: C.lime, fontSize: "11px", fontWeight: 700 }}>{skill.level}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(246,247,237,0.1)" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${C.green}, ${C.lime})`, boxShadow: `0 0 10px rgba(219,230,76,0.4)` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: 0.6 + i * 0.1, duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tools */}
          <motion.div variants={itemVariants}>
            <p className="uppercase mb-3" style={{ color: "rgba(246,247,237,0.4)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em" }}>
              TOOLS & TEKNOLOGI
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
