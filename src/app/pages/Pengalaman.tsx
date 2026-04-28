import { motion } from "motion/react";
import { C, containerVariants, itemVariants } from "../components/constants";

const experiences = [
  {
    year: "2025 — Sekarang",
    role: "HMI, Apps & Website Developer",
    company: "PT. Reinutech Perbeja",
    location: "Semarang, Indonesia",
    type: "Intern",
    color: C.green,
    desc: "Mengembangkan solusi IoT terintegrasi untuk smart farming: HMI berbasis Nextion untuk sistem kontrol iklim, aplikasi mobile Flutter untuk monitoring, dan platform web untuk peternakan ayam closed-house.",
    achievements: ["HMI Nextion untuk Climate Control System", "Aplikasi Flutter sistem monitoring & pelaporan", "Platform web monitoring kandang ayam tertutup"],
    tags: ["IoT", "HMI", "Flutter", "Web Dev"],
  },
  {
    year: "2022",
    role: "Mekanik Alat Berat",
    company: "PT. BUMA",
    location: "Indonesia",
    type: "Intern",
    color: C.blue,
    desc: "Bertanggung jawab atas inspeksi PPA, PPU, dan peralatan umum, perawatan unit Excavator, serta menyelesaikan Basic Mechanic Course (Power train, engine, electrical, pneumatic hydraulic, FOWAG).",
    achievements: ["Inspeksi PPA, PPU, dan peralatan umum", "Maintenance unit Excavator", "Lulus Basic Mechanic Course"],
    tags: ["Heavy Equipment", "Mechanical", "Electrical"],
  },
  {
    year: "2022",
    role: "Engineering",
    company: "Hotel MG Suite",
    location: "Semarang, Indonesia",
    type: "Intern",
    color: C.mantis,
    desc: "Melaksanakan inspeksi properti harian, mengelola operasional fasilitas hotel, dan memperbaiki fasilitas yang rusak termasuk unit AC dan infrastruktur bangunan.",
    achievements: ["Pengecekan harian seluruh fasilitas", "Perawatan preventif & korektif", "Perbaikan unit AC & fasilitas hotel"],
    tags: ["Facility Maintenance", "Electrical", "HVAC"],
  },
];

const education = [
  {
    year: "2023 — Exp. 2027",
    degree: "D4 Teknik Otomasi",
    school: "Universitas Diponegoro",
    gpa: "Aktif",
    honors: "Beasiswa KSE",
  },
  {
    year: "2023 — Sekarang",
    degree: "Kitab (Pesantren)",
    school: "Ponpes Kyai Galang Sewu",
    gpa: "—",
    honors: "Aktif",
  },
  {
    year: "2020 — 2023",
    degree: "Instalasi Tenaga Listrik",
    school: "SMKN Jateng di Semarang",
    gpa: "Terbaik",
    honors: "Best Graduate",
  },
];

export default function Pengalaman() {
  return (
    <div className="h-full p-1 pb-6">
      {/* Header */}
      <motion.div className="mb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <span style={{ color: C.lime, fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em" }}>
            02 — PENGALAMAN
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: "rgba(219,230,76,0.2)" }} />
        </div>
        <h1 className="uppercase" style={{ color: C.white, fontWeight: 900, fontSize: "clamp(22px, 3vw, 38px)", letterSpacing: "-0.02em" }}>
          JEJAK{" "}
          <motion.span
            style={{ color: C.lime }}
            animate={{ textShadow: [`0 0 20px rgba(219,230,76,0)`, `0 0 30px rgba(219,230,76,0.5)`, `0 0 20px rgba(219,230,76,0)`] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            PROFESIONAL
          </motion.span>
        </h1>
      </motion.div>

      <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 320px" }}>
        {/* Timeline */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {/* Timeline line */}
          <motion.div
            className="absolute left-5 top-0 bottom-0 w-px"
            style={{ backgroundColor: "rgba(246,247,237,0.1)" }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          />

          <div className="flex flex-col gap-4">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                className="relative pl-14"
                variants={itemVariants}
                custom={i}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-0 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: exp.color,
                    boxShadow: `0 0 20px ${exp.color}44`,
                    top: "8px",
                  }}
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3 + i * 0.12, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <span style={{ fontSize: "14px" }}>
                    {i === 0 ? "👑" : i === 1 ? "⚡" : i === 2 ? "🎨" : "🌱"}
                  </span>
                </motion.div>

                {/* Card */}
                <motion.div
                  className="rounded-2xl p-5 relative overflow-hidden"
                  style={{
                    backgroundColor: "rgba(246,247,237,0.04)",
                    border: `1px solid rgba(246,247,237,0.07)`,
                  }}
                  whileHover={{
                    backgroundColor: "rgba(246,247,237,0.06)",
                    borderColor: `${exp.color}44`,
                    y: -2,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Color accent bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                    style={{ backgroundColor: exp.color }}
                  />

                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p style={{ color: exp.color, fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em" }}>
                        {exp.year}
                      </p>
                      <h3 className="mt-0.5" style={{ color: C.white, fontWeight: 800, fontSize: "14px" }}>
                        {exp.role}
                      </h3>
                      <p style={{ color: "rgba(246,247,237,0.5)", fontSize: "11px" }}>
                        {exp.company} · {exp.location}
                      </p>
                    </div>
                    <span
                      className="px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: `${exp.color}22`, color: exp.color, fontSize: "9px", fontWeight: 600 }}
                    >
                      {exp.type}
                    </span>
                  </div>

                  <p className="mb-3" style={{ color: "rgba(246,247,237,0.65)", fontSize: "12px", lineHeight: 1.65 }}>
                    {exp.desc}
                  </p>

                  <div className="flex flex-col gap-1.5 mb-3">
                    {exp.achievements.map((a) => (
                      <div key={a} className="flex items-center gap-2">
                        <span style={{ color: C.lime, fontSize: "8px" }}>✦</span>
                        <span style={{ color: "rgba(246,247,237,0.7)", fontSize: "11px" }}>{a}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: "rgba(246,247,237,0.06)",
                          border: "1px solid rgba(246,247,237,0.1)",
                          color: "rgba(246,247,237,0.5)",
                          fontSize: "9px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right sidebar */}
        <motion.div
          className="flex flex-col gap-4"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {/* Stats */}
          <motion.div
            className="rounded-2xl p-5"
            style={{ backgroundColor: C.green, boxShadow: `0 8px 32px rgba(0,128,76,0.2)` }}
            variants={itemVariants}
          >
            <p className="uppercase mb-4" style={{ color: C.lime, fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em" }}>
              PENCAPAIAN
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { num: "3+", label: "Pengalaman Magang" },
                { num: "20+", label: "Proyek Selesai" },
                { num: "7", label: "Penghargaan" },
                { num: "5+", label: "Organisasi" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-3 rounded-xl"
                  style={{ backgroundColor: "rgba(0,31,63,0.2)" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <p style={{ color: C.lime, fontWeight: 900, fontSize: "22px", lineHeight: 1 }}>{stat.num}</p>
                  <p style={{ color: "rgba(246,247,237,0.6)", fontSize: "9px", marginTop: "4px" }}>{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            className="rounded-2xl p-5"
            style={{ backgroundColor: "rgba(246,247,237,0.04)", border: "1px solid rgba(246,247,237,0.07)" }}
            variants={itemVariants}
          >
            <p className="uppercase mb-4" style={{ color: "rgba(246,247,237,0.4)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em" }}>
              PENDIDIKAN
            </p>
            <div className="flex flex-col gap-3">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.school}
                  className="rounded-xl p-4"
                  style={{ backgroundColor: "rgba(246,247,237,0.04)", border: "1px solid rgba(246,247,237,0.06)" }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.15 }}
                  whileHover={{ borderColor: "rgba(219,230,76,0.2)", backgroundColor: "rgba(219,230,76,0.04)" }}
                >
                  <p style={{ color: C.lime, fontSize: "9px", fontWeight: 700 }}>{edu.year}</p>
                  <p className="mt-1" style={{ color: C.white, fontSize: "12px", fontWeight: 700 }}>{edu.degree}</p>
                  <p style={{ color: "rgba(246,247,237,0.5)", fontSize: "10px" }}>{edu.school}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {edu.gpa !== "—" && (
                      <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(0,128,76,0.2)", color: C.green, fontSize: "8px" }}>
                        GPA {edu.gpa}
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(219,230,76,0.1)", color: C.lime, fontSize: "8px" }}>
                      {edu.honors}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            className="rounded-2xl p-5"
            style={{ backgroundColor: C.blue, boxShadow: `0 8px 32px rgba(30,72,143,0.2)` }}
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
          >
            <p className="uppercase mb-3" style={{ color: "rgba(246,247,237,0.5)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em" }}>
              SERTIFIKASI
            </p>
            {["Kompetensi Keahlian - ESDM", "BIRU x KSE Scholarship Awardee", "Hak Kekayaan Intelektual (HKI)", "Basic Mechanic Course - PT. BUMA"].map((cert, i) => (
              <motion.div
                key={cert}
                className="flex items-center gap-2.5 py-2"
                style={{ borderBottom: i < 3 ? "1px solid rgba(246,247,237,0.06)" : "none" }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.08 }}
              >
                <span style={{ color: C.lime, fontSize: "10px" }}>✦</span>
                <span style={{ color: "rgba(246,247,237,0.75)", fontSize: "11px" }}>{cert}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
