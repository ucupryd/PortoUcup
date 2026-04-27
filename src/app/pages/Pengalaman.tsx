import { motion } from "motion/react";
import { C, containerVariants, itemVariants } from "../components/constants";

const experiences = [
  {
    year: "2022 — Sekarang",
    role: "Creative Director & Head of Design",
    company: "PixelForge Studio",
    location: "Jakarta, Indonesia",
    type: "Full-time",
    color: C.green,
    desc: "Memimpin tim desain 12 orang dalam merancang produk digital untuk klien Fortune 500. Mengembangkan design system yang digunakan oleh 40+ produk internal dan eksternal.",
    achievements: ["Meningkatkan retensi pengguna 37%", "Memimpin redesign platform B2B (+120% konversi)", "Membangun design ops dari nol"],
    tags: ["Leadership", "Design System", "Product Strategy"],
  },
  {
    year: "2020 — 2022",
    role: "Senior Product Designer",
    company: "GoTech Solutions",
    location: "Jakarta, Indonesia",
    type: "Full-time",
    color: C.blue,
    desc: "Bertanggung jawab atas pengalaman pengguna dari 3 produk utama dengan 500K+ pengguna aktif. Berkolaborasi langsung dengan tim Engineering dan Product Management.",
    achievements: ["NPS score naik dari 42 ke 71", "Redesign onboarding (churn -28%)", "Mentoring 4 junior designer"],
    tags: ["UX Research", "Prototyping", "Agile"],
  },
  {
    year: "2018 — 2020",
    role: "UI/UX Designer",
    company: "Kreativa Digital Agency",
    location: "Bandung, Indonesia",
    type: "Full-time",
    color: C.mantis,
    desc: "Mengerjakan proyek desain untuk lebih dari 30 klien dari berbagai industri mulai dari fintech, e-commerce, hingga healthtech.",
    achievements: ["30+ proyek selesai tepat waktu", "Penghargaan Best Design Agency 2019", "Spesialisasi mobile-first design"],
    tags: ["Mobile Design", "Branding", "Wireframing"],
  },
  {
    year: "2016 — 2018",
    role: "Junior Visual Designer",
    company: "Ideation Lab",
    location: "Yogyakarta, Indonesia",
    type: "Full-time",
    color: C.mantisDeep,
    desc: "Memulai karir di agensi kreatif kecil yang fokus pada identitas merek dan desain komunikasi visual. Tempat pertama belajar tentang proses kreatif secara profesional.",
    achievements: ["Menguasai Adobe Creative Suite", "Desain 50+ aset brand", "Belajar user-centered design"],
    tags: ["Visual Design", "Branding", "Print Design"],
  },
];

const education = [
  {
    year: "2012 — 2016",
    degree: "S1 Desain Komunikasi Visual",
    school: "Institut Teknologi Bandung",
    gpa: "3.87 / 4.00",
    honors: "Cum Laude",
  },
  {
    year: "2023",
    degree: "Google UX Design Certificate",
    school: "Coursera / Google",
    gpa: "—",
    honors: "Distinction",
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
                { num: "7+", label: "Tahun Pengalaman" },
                { num: "50+", label: "Proyek Selesai" },
                { num: "30+", label: "Klien Puas" },
                { num: "12", label: "Anggota Tim" },
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
            {["Google UX Design", "AWS Cloud Practitioner", "Figma Professional", "HubSpot Content"].map((cert, i) => (
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
