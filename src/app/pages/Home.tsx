import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  Youtube,
  Wrench,
  MessageSquare,
  Monitor,
  Smartphone,
  Target,
} from "lucide-react";
import { C } from "../components/constants";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

import PROFILE_IMG from "../assets/profil.jpeg";
// Background video for hero (place `home.mp4` in src/app/assets/)
import BG_VIDEO from "../assets/home.mp4";
const skills = [
  { name: "IoT & Embedded Systems", level: 88 },
  { name: "HMI Development (Nextion)", level: 85 },
  { name: "Web & App Development", level: 82 },
  { name: "PLC & Control Systems", level: 80 },
];

const testimonials = [
  { text: "Sangat inovatif dalam mengintegrasikan IoT untuk sistem monitoring pertanian kami.", name: "PT. Reinutech Perbeja", role: "Supervisor Proyek", avatar: "R" },
  { text: "Profesional dan berdedikasi tinggi dalam setiap tugas yang diberikan.", name: "URDC Undip", role: "Koordinator Aterkia", avatar: "U" },
];

const socialLinks = [
  {
    Icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/m-yusuf-riyadi-661535386",
    className: "social-linkedin",
  },
  {
    Icon: Github,
    label: "GitHub",
    href: "https://github.com/ucupryd",
    className: "social-github",
  },
  {
    Icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/ucup_ryd/",
    className: "social-instagram",
  },
  {
    Icon: Youtube,
    label: "YouTube",
    href: "https://www.youtube.com/@MECHUP14",
    className: "social-youtube",
  },
  {
    Icon: Mail,
    label: "Email",
    href: "mailto:yusufriyadi141004@gmail.com",
    className: "social-email",
  },
];

export default function Home() {
  const navigate = useNavigate();

  const ctaIcons = [Monitor, Smartphone, Target];

  const bentoItem = {
    initial: { opacity: 0, scale: 0.94, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <div
      className="home-grid h-full overflow-hidden"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1.1fr",
        gridTemplateRows: "1fr 1fr 52px",
        gridTemplateAreas: `
          "hero hero hero hero"
          "profile skill1 skill2 cta"
          "footer footer footer footer"
        `,
        gap: "10px",
        padding: "0",
        minHeight: "100%",
      }}
    >
      {/* ─── HERO PANEL ─── */}
      <motion.div
        className="home-panel home-hero rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden"
        style={{ gridArea: "hero", backgroundColor: "transparent", boxShadow: `0 8px 40px rgba(0,0,0,0.18)` }}
        variants={bentoItem}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        {/* Background video (looping, muted) */}
        <video
          key="hero-bg-video"
          src={BG_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          tabIndex={-1}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ zIndex: 0, opacity: 0.98 }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.55) 100%)",
            zIndex: 1,
          }}
        />

        {/* Top row */}
        <div className="home-hero-top flex items-start justify-between relative z-10">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{ backgroundColor: "rgba(0,31,63,0.25)", border: "1px solid rgba(246,247,237,0.15)" }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: C.lime }}
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs tracking-wider" style={{ color: C.white, opacity: 0.85, fontSize: "10px" }}>
              OPEN TO WORK & COLLABORATION
            </span>
          </motion.div>
          <div className="home-hero-tags flex items-center gap-2">
            {["IoT", "HMI", "Web Dev"].map((tag, i) => (
              <motion.span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: "rgba(0,31,63,0.3)",
                  color: C.lime,
                  fontSize: "9px",
                  border: `1px solid rgba(219,230,76,0.2)`,
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Hero text */}
        <motion.div
          className="home-hero-text relative z-10 flex-1 flex flex-col justify-center py-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
        >
          <h1
            className="home-hero-title uppercase leading-none mb-2"
            style={{
              color: C.white,
              fontSize: "clamp(28px, 3.2vw, 48px)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1.04,
            }}
          >
            M. YUSUF
            <br />
            <motion.span
              style={{ color: C.lime, display: "inline-block" }}
              animate={{ textShadow: [`0 0 20px rgba(219,230,76,0)`, `0 0 30px rgba(219,230,76,0.4)`, `0 0 20px rgba(219,230,76,0)`] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              RIYADI
            </motion.span>
          </h1>
          <h1
            className="home-hero-subtitle uppercase leading-none"
            style={{
              color: C.white,
              fontSize: "clamp(18px, 2.2vw, 32px)",
              fontWeight: 900,
              letterSpacing: "-0.01em",
              lineHeight: 1.08,
              opacity: 0.88,
            }}
          >
            IoT · HMI · WEB DEVELOPER
          </h1>
        </motion.div>

        {/* Bottom row */}
        <div className="home-hero-bottom relative z-10 flex items-end justify-between">
          <motion.p
            className="max-w-xs text-sm leading-relaxed"
            style={{ color: "rgba(246,247,237,0.7)", fontSize: "11px", lineHeight: 1.6 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Mahasiswa Teknik Otomasi Universitas Diponegoro.
            <br />
            Passionate di IoT, sistem kontrol, HMI & pengembangan web.
          </motion.p>
          <motion.div
            className="home-hero-stats flex gap-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            {[{ num: "20+", label: "Proyek" }, { num: "7+", label: "Penghargaan" }, { num: "3+", label: "Magang" }].map((stat) => (
              <div key={stat.label} className="text-right">
                <p style={{ color: C.lime, fontWeight: 900, fontSize: "clamp(18px, 2.0vw, 26px)", lineHeight: 1 }}>
                  {stat.num}
                </p>
                <p style={{ color: "rgba(246,247,237,0.5)", fontSize: "9px", marginTop: "2px" }}>{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ─── PROFILE PANEL ─── */}
      <motion.div
        className="home-panel home-profile rounded-2xl overflow-hidden relative flex flex-col justify-end"
        style={{ gridArea: "profile", backgroundColor: C.blue, boxShadow: `0 8px 32px rgba(30,72,143,0.3)` }}
        variants={bentoItem}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.6, delay: 0.15 }}
        whileHover={{ scale: 1.01 }}
      >
        <ImageWithFallback
          src={PROFILE_IMG}
          alt="Profile"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to top, ${C.blue}f0 0%, ${C.blue}44 50%, transparent 100%)` }}
        />
        <div className="relative z-10 p-4">
          <div
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 mb-2"
            style={{ backgroundColor: "rgba(0,31,63,0.6)", backdropFilter: "blur(10px)", border: "1px solid rgba(246,247,237,0.1)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.lime }} />
            <span style={{ color: C.white, fontSize: "9px", opacity: 0.85 }}>IoT & HMI Developer</span>
          </div>
          <p className="uppercase" style={{ color: C.white, fontWeight: 800, fontSize: "14px", letterSpacing: "0.05em" }}>
            M. YUSUF RIYADI
          </p>
          <p style={{ color: "rgba(246,247,237,0.5)", fontSize: "9px" }}>Semarang, Jawa Tengah 🇮🇩</p>
        </div>
      </motion.div>

      {/* ─── SKILLS PANEL ─── */}
      <motion.div
        className="home-panel home-skill1 rounded-2xl p-4 flex flex-col relative overflow-hidden"
        style={{ gridArea: "skill1", backgroundColor: C.mantis, boxShadow: `0 8px 32px rgba(61,153,112,0.2)` }}
        variants={bentoItem}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.6, delay: 0.22 }}
        whileHover={{ scale: 1.01 }}
      >
        <div
          className="absolute -top-6 -right-6 w-20 h-20 rounded-full pointer-events-none"
          style={{ background: C.lime, filter: "blur(20px)", opacity: 0.15 }}
        />
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="tracking-widest uppercase" style={{ color: C.lime, fontSize: "9px", fontWeight: 700 }}>KEAHLIAN</p>
            <p className="tracking-widest uppercase" style={{ color: C.white, fontSize: "9px", opacity: 0.5 }}>UTAMA</p>
          </div>
          <Wrench size={16} color={C.lime} />
        </div>
        <div className="flex flex-col gap-2.5 flex-1 justify-center">
          {skills.map((skill, i) => (
            <div key={skill.name}>
              <div className="flex justify-between mb-1">
                <span style={{ color: C.white, fontSize: "9px", fontWeight: 600 }}>{skill.name}</span>
                <span style={{ color: C.lime, fontSize: "9px", fontWeight: 700 }}>{skill.level}%</span>
              </div>
              <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(246,247,237,0.15)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: C.lime, boxShadow: `0 0 8px rgba(219,230,76,0.5)` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ─── TESTIMONIALS PANEL ─── */}
      <motion.div
        className="home-panel home-skill2 rounded-2xl p-4 flex flex-col relative overflow-hidden"
        style={{ gridArea: "skill2", backgroundColor: C.mantisLight, boxShadow: `0 8px 32px rgba(46,125,94,0.2)` }}
        variants={bentoItem}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.6, delay: 0.3 }}
        whileHover={{ scale: 1.01 }}
      >
        <div
          className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full pointer-events-none"
          style={{ background: C.blue, filter: "blur(20px)", opacity: 0.2 }}
        />
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="tracking-widest uppercase" style={{ color: C.lime, fontSize: "9px", fontWeight: 700 }}>UMPAN BALIK</p>
            <p className="tracking-widest uppercase" style={{ color: C.white, fontSize: "9px", opacity: 0.5 }}>KLIEN</p>
          </div>
          <MessageSquare size={16} color={C.lime} />
        </div>
        <div className="flex flex-col gap-3 flex-1 justify-center">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-xl p-3"
              style={{ backgroundColor: "rgba(0,31,63,0.25)", border: "1px solid rgba(246,247,237,0.08)" }}
            >
              <div className="flex gap-0.5 mb-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} style={{ fontSize: "8px" }}>⭐</span>
                ))}
              </div>
              <p style={{ color: "rgba(246,247,237,0.8)", fontSize: "9px", lineHeight: 1.5 }}>"{t.text}"</p>
              <div className="flex items-center gap-1.5 mt-2">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: C.lime }}
                >
                  <span style={{ color: C.midnight, fontSize: "8px", fontWeight: 800 }}>{t.avatar}</span>
                </div>
                <div>
                  <p style={{ color: C.white, fontSize: "8px", fontWeight: 700 }}>{t.name}</p>
                  <p style={{ color: "rgba(246,247,237,0.4)", fontSize: "7px" }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ─── CTA PANEL ─── */}
      <motion.div
        className="home-panel home-cta rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden cursor-pointer"
        style={{ gridArea: "cta", backgroundColor: C.lime, boxShadow: `0 8px 40px rgba(219,230,76,0.3)` }}
        variants={bentoItem}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.6, delay: 0.38 }}
        whileHover={{ scale: 1.02, boxShadow: `0 12px 50px rgba(219,230,76,0.45)` }}
        onClick={() => navigate("/karya")}
      >
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
          style={{ background: "#fff", filter: "blur(30px)", transform: "translate(20%, -20%)", opacity: 0.15 }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <div>
          <p className="uppercase" style={{ color: C.midnight, fontWeight: 900, fontSize: "11px", letterSpacing: "0.08em", opacity: 0.5 }}>
            PORTOFOLIO
          </p>
          <h3
            className="uppercase leading-tight mt-1"
            style={{ color: C.midnight, fontWeight: 900, fontSize: "clamp(16px, 1.8vw, 22px)", letterSpacing: "-0.01em" }}
          >
            LIHAT SEMUA
            <br />
            KARYA SAYA
          </h3>
        </div>
        <div className="flex gap-1.5 my-3">
          {ctaIcons.map((Icon, i) => (
            <motion.div
              key={i}
              className="flex-1 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "rgba(0,31,63,0.12)" }}
              whileHover={{ backgroundColor: "rgba(0,31,63,0.2)", scale: 1.05 }}
            >
              <Icon size={14} color={C.midnight} />
            </motion.div>
          ))}
        </div>
        <motion.button
          className="w-full rounded-xl py-3 px-4 flex items-center justify-between"
          style={{ backgroundColor: C.midnight, boxShadow: `0 4px 20px rgba(0,31,63,0.3)` }}
          whileHover={{ backgroundColor: "#002855" }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="uppercase tracking-widest" style={{ color: C.lime, fontWeight: 800, fontSize: "10px" }}>
            JELAJAHI KARYA
          </span>
          <motion.span
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: C.lime }}
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span style={{ color: C.midnight, fontSize: "12px" }}>→</span>
          </motion.span>
        </motion.button>
      </motion.div>

      {/* ─── FOOTER ─── */}
      <motion.div
        className="home-panel home-footer rounded-xl px-5 flex items-center justify-between relative"
        style={{ gridArea: "footer", backgroundColor: C.mantis, border: `1px solid rgba(246,247,237,0.06)` }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ backgroundColor: C.lime }}>
            <span style={{ color: C.midnight, fontSize: "7px", fontWeight: 900 }}>YR</span>
          </div>
          <p style={{ color: "rgba(246,247,237,0.4)", fontSize: "9px" }}>© 2026 M. Yusuf Riyadi. All rights reserved.</p>
        </div>
        <div className="social-bar flex items-center gap-2">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noreferrer" : undefined}
              className={`social-btn ${s.className}`}
              aria-label={s.label}
            >
              <s.Icon className="social-icon" aria-hidden />
              <span className="social-tooltip">{s.label}</span>
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span style={{ color: "rgba(246,247,237,0.3)", fontSize: "9px" }}>Dibuat dengan ❤️ di Semarang</span>
          <div
            className="flex items-center gap-1 px-2 py-1 rounded-full"
            style={{ backgroundColor: "rgba(219,230,76,0.1)", border: "1px solid rgba(219,230,76,0.2)" }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: C.lime }}
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span style={{ color: C.lime, fontSize: "8px" }}>Open to Work</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
