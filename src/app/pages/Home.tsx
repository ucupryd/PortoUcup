import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  Youtube,
  Phone,
  Wrench,
  Cpu,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Briefcase,
  Award,
  Layers,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  FolderGit2
} from "lucide-react";
import { C } from "../components/constants";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { portfolioData, ProfileData } from "../data/portfolioData";
import { fetchPublishedProfile, fetchPublishedProjectCardImages, ProjectCardCover } from "../../lib/contentService";

import BG_VIDEO from "../assets/home.mp4";

const bentoItem = {
  initial: { opacity: 0, scale: 0.96, y: 15 },
  animate: { opacity: 1, scale: 1, y: 0 },
};

export default function Home() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [profile, setProfile] = useState<ProfileData>(portfolioData.profile);
  const [coverMap, setCoverMap] = useState<Record<string, ProjectCardCover>>({});

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      const [profileResult, coverMapResult] = await Promise.allSettled([
        fetchPublishedProfile(),
        fetchPublishedProjectCardImages(),
      ]);

      if (isMounted) {
        if (profileResult.status === "fulfilled" && profileResult.value) {
          setProfile(profileResult.value);
        }
        if (coverMapResult.status === "fulfilled" && coverMapResult.value) {
          setCoverMap(coverMapResult.value);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((e) => console.warn("Video play notice:", e));
    }
  };

  const featured = portfolioData.featuredProject;

  // Resolve eBro image from database cover map or local fallback
  const ebroCoverInfo =
    coverMap[featured.slug] ||
    coverMap["ebro-smart-poultry-farm"] ||
    coverMap[String(featured.id)] ||
    Object.values(coverMap)[0];

  const ebroCoverUrl = ebroCoverInfo?.publicUrl || featured.img;
  const ebroCoverAlt = ebroCoverInfo?.altText || featured.title;

  const socialLinks = [
    {
      Icon: Linkedin,
      label: "LinkedIn",
      href: profile.socials?.linkedin || portfolioData.profile.socials.linkedin,
      className: "social-linkedin",
    },
    {
      Icon: Github,
      label: "GitHub",
      href: profile.socials?.github || portfolioData.profile.socials.github,
      className: "social-github",
    },
    {
      Icon: Instagram,
      label: "Instagram",
      href: profile.socials?.instagram || portfolioData.profile.socials.instagram,
      className: "social-instagram",
    },
    {
      Icon: Youtube,
      label: "YouTube",
      href: profile.socials?.youtube || portfolioData.profile.socials.youtube,
      className: "social-youtube",
    },
    {
      Icon: Phone,
      label: "WhatsApp",
      href: profile.whatsappUrl || portfolioData.profile.whatsappUrl,
      className: "social-whatsapp",
    },
    {
      Icon: Mail,
      label: "Email",
      href: `mailto:${profile.email}`,
      className: "social-email",
    },
  ];

  // Grouped capability tags for Panel 1
  const capabilityTags = [
    "Automation Systems",
    "IoT Monitoring",
    "Embedded Systems",
    "Industrial HMI",
    "Real-Time Web Monitoring",
    "Full-Stack Development",
    "PCB & Electronics",
    "Electromechanical Systems",
  ];

  // Verified technology matrix categorized by discipline
  const techCategories = [
    {
      label: "Automation & HMI",
      techs: ["CX Programmer", "FluidSim", "EcoStruxure", "LabVIEW", "Nextion"],
    },
    {
      label: "Embedded & IoT",
      techs: ["Arduino", "PlatformIO", "LoRa", "IoT"],
    },
    {
      label: "Electronics & CAD",
      techs: ["EasyEDA", "Proteus", "SolidWorks", "Fusion 360"],
    },
    {
      label: "Web & Mobile",
      techs: ["React", "Flutter"],
    },
  ];

  return (
    <div
      className="home-grid h-full overflow-hidden"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.15fr 1.15fr 1fr",
        gridTemplateRows: "1.15fr 1fr 52px",
        gridTemplateAreas: `
          "hero hero hero hero"
          "focus ebro ebro snapshot"
          "footer footer footer footer"
        `,
        gap: "10px",
        padding: "0",
        minHeight: "100%",
      }}
    >
      {/* ─── HERO PANEL ─── */}
      <motion.div
        className="home-panel home-hero rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden"
        style={{ gridArea: "hero", backgroundColor: "transparent", boxShadow: `0 8px 40px rgba(0,0,0,0.25)` }}
        variants={bentoItem}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        {/* Background video (looping manually for performance, muted) */}
        <video
          key="hero-bg-video"
          ref={videoRef}
          src={BG_VIDEO}
          autoPlay
          muted
          playsInline
          preload="metadata"
          aria-hidden
          tabIndex={-1}
          onEnded={handleVideoEnded}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{
            zIndex: 0,
            opacity: 0.95,
            transform: "translateZ(0)",
            willChange: "transform",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(4,10,18,0.55) 0%, rgba(4,10,18,0.3) 40%, rgba(4,10,18,0.75) 100%)",
            zIndex: 1,
          }}
        />

        {/* Top Header Row */}
        <div className="home-hero-top flex items-start justify-between relative z-10 gap-3">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
            style={{
              backgroundColor: "rgba(0,31,63,0.55)",
              border: "1px solid rgba(246,247,237,0.18)",
              backdropFilter: "blur(12px)",
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: C.lime }}
            />
            <span
              className="text-xs tracking-wider font-semibold"
              style={{ color: C.white, opacity: 0.95, fontSize: "10.5px" }}
            >
              {profile.academicHighlight ||
                `${profile.gpa} GPA · ${profile.completedCredits} completed credits · ${profile.university}`}
            </span>
          </motion.div>

          <div className="home-hero-tags hidden sm:flex items-center gap-1.5">
            {["IoT", "HMI", "Automation", "Embedded"].map((tag, i) => (
              <motion.span
                key={tag}
                className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-medium"
                style={{
                  backgroundColor: "rgba(0,31,63,0.45)",
                  color: C.lime,
                  border: `1px solid rgba(219,230,76,0.3)`,
                  backdropFilter: "blur(8px)",
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Hero Main Content */}
        <motion.div
          className="home-hero-text relative z-10 flex-1 flex flex-col justify-center py-3 md:py-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1
            className="home-hero-title uppercase leading-tight mb-2"
            style={{
              color: C.white,
              fontSize: "clamp(26px, 3.8vw, 48px)",
              fontWeight: 900,
              letterSpacing: "-0.01em",
              textShadow: "0 2px 12px rgba(0,0,0,0.6)",
            }}
          >
            MUHAMMAD YUSUF <span style={{ color: C.lime }}>RIYADI</span>
          </h1>
          <h2
            className="home-hero-subtitle uppercase tracking-wide flex items-center gap-2"
            style={{
              color: C.white,
              fontSize: "clamp(13px, 1.6vw, 20px)",
              fontWeight: 800,
              opacity: 0.95,
              textShadow: "0 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            <span>{profile.title}</span>
          </h2>
        </motion.div>

        {/* Bottom Stats & Quick Action Row */}
        <div className="home-hero-bottom relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div className="flex flex-col gap-3 max-w-lg">
            <motion.p
              className="text-xs leading-relaxed"
              style={{ color: "rgba(246,247,237,0.9)", fontSize: "11px", lineHeight: 1.65 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {profile.subheadline}
            </motion.p>

            <motion.div
              className="flex items-center gap-3 pt-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <button
                type="button"
                onClick={() => navigate("/karya")}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-midnight bg-[#dbe64c] hover:bg-[#c9d43b] transition-all shadow-lg flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#dbe64c]"
              >
                <span>Explore Projects</span>
                <ArrowRight size={14} />
              </button>
              <button
                type="button"
                onClick={() => navigate("/kontak")}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[rgba(0,31,63,0.5)] hover:bg-[rgba(0,31,63,0.8)] border border-[rgba(246,247,237,0.2)] transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <span>Get in Touch</span>
                <ChevronRight size={14} />
              </button>
            </motion.div>
          </div>

          <motion.div
            className="home-hero-stats flex gap-5 md:gap-6 self-start md:self-end"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            {[
              { num: `${profile.gpa}`, label: "GPA (Undip)" },
              { num: `${profile.completedCredits}`, label: "Credits Done" },
              { num: "8", label: "Certifications & IP" },
            ].map((stat) => (
              <div key={stat.label} className="text-left md:text-right flex flex-col justify-end">
                <p style={{ color: C.lime, fontWeight: 900, fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1 }}>
                  {stat.num}
                </p>
                <p style={{ color: "rgba(246,247,237,0.7)", fontSize: "9px", marginTop: "4px", lineHeight: 1.3 }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ─── PANEL 1: ENGINEERING FOCUS ─── */}
      <motion.div
        className="home-panel home-focus rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden"
        style={{ gridArea: "focus" }}
        variants={bentoItem}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <div className="flex flex-col gap-3">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[rgba(246,247,237,0.08)] pb-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[rgba(219,230,76,0.12)] border border-[rgba(219,230,76,0.25)]">
                <Wrench size={14} className="text-[#dbe64c]" />
              </div>
              <div>
                <p className="tracking-wider uppercase text-[10px] font-extrabold text-[#dbe64c]">
                  ENGINEERING FOCUS
                </p>
                <p className="text-[9px] text-gray-400">Core Technical Capabilities</p>
              </div>
            </div>
            <Layers size={14} className="text-gray-500" />
          </div>

          <p className="text-[10px] text-gray-300 leading-relaxed font-sans">
            "Building practical systems across automation, embedded control, industrial HMI, and connected monitoring."
          </p>

          {/* Grouped Capability Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {capabilityTags.map((cap) => (
              <span
                key={cap}
                className="px-2 py-0.5 rounded-md text-[9.5px] font-medium bg-[rgba(0,31,63,0.5)] text-gray-200 border border-[rgba(246,247,237,0.1)] hover:border-[#dbe64c]/40 transition-colors"
              >
                {cap}
              </span>
            ))}
          </div>

          {/* Technology Discipline Matrix */}
          <div className="flex flex-col gap-2 pt-2 border-t border-[rgba(246,247,237,0.06)]">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-400">
              Verified Tech Stack
            </p>
            <div className="grid grid-cols-1 gap-2">
              {techCategories.map((cat) => (
                <div key={cat.label} className="flex flex-col gap-1">
                  <span className="text-[9px] text-[#dbe64c] font-semibold flex items-center gap-1">
                    <CheckCircle2 size={9} /> {cat.label}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {cat.techs.map((t) => (
                      <span
                        key={t}
                        className="px-1.5 py-0.5 rounded bg-black/40 text-gray-300 text-[8.5px] font-mono border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── PANEL 2: FEATURED eBRO CASE STUDY ─── */}
      <motion.div
        className="home-panel home-ebro rounded-2xl p-4 md:p-5 flex flex-col justify-between relative overflow-hidden group cursor-pointer"
        style={{ gridArea: "ebro" }}
        variants={bentoItem}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.22 }}
        onClick={() => navigate("/karya")}
      >
        <div className="flex flex-col gap-3 h-full justify-between">
          {/* Top Badges Header */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="bg-[#dbe64c] text-midnight font-extrabold uppercase text-[9.5px] px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                <Sparkles size={10} className="fill-midnight" /> FEATURED CASE STUDY
              </span>
              <span className="bg-black/50 border border-[#dbe64c]/30 text-[#dbe64c] text-[9.5px] px-2 py-0.5 rounded-md font-mono">
                HKI EC002026157949
              </span>
            </div>
            <span className="text-[9.5px] text-gray-400 font-mono">Period: 2025–2026</span>
          </div>

          {/* Image & Detail Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center flex-1 my-1">
            {/* Image Preview */}
            <div className="md:col-span-5 relative aspect-video rounded-xl overflow-hidden bg-black/60 border border-[rgba(246,247,237,0.12)] group-hover:border-[#dbe64c]/50 transition-all shadow-md">
              <ImageWithFallback
                src={ebroCoverUrl}
                alt={ebroCoverAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[#dbe64c] text-[8.5px] font-mono border border-white/10">
                Primary Cover
              </span>
            </div>

            {/* Case Study Details */}
            <div className="md:col-span-7 flex flex-col gap-2">
              <div>
                <p className="text-[10px] font-semibold text-[#dbe64c] uppercase tracking-wide">
                  Role: {featured.role}
                </p>
                <h3 className="text-sm md:text-base font-extrabold text-white leading-tight mt-0.5 group-hover:text-[#dbe64c] transition-colors">
                  {featured.title}
                </h3>
              </div>

              <p className="text-[10.5px] text-gray-300 leading-relaxed line-clamp-3">
                "{featured.desc}"
              </p>

              {/* Verified Tech Chips */}
              <div className="flex flex-wrap gap-1 pt-1">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-[rgba(0,31,63,0.5)] text-[#dbe64c] border border-[rgba(219,230,76,0.2)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between border-t border-[rgba(246,247,237,0.08)] pt-2.5">
            <span className="text-[10px] text-gray-400">
              Copyright Registered IoT Platform
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/karya");
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-midnight bg-[#dbe64c] hover:bg-[#c9d43b] transition-all flex items-center gap-1.5 shadow-md focus:outline-none focus:ring-2 focus:ring-[#dbe64c]"
            >
              <span>View Case Study</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* ─── PANEL 3: PROFESSIONAL SNAPSHOT ─── */}
      <motion.div
        className="home-panel home-snapshot rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden"
        style={{ gridArea: "snapshot" }}
        variants={bentoItem}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex flex-col gap-3">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[rgba(246,247,237,0.08)] pb-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[rgba(219,230,76,0.12)] border border-[rgba(219,230,76,0.25)]">
                <Award size={14} className="text-[#dbe64c]" />
              </div>
              <div>
                <p className="tracking-wider uppercase text-[10px] font-extrabold text-white">
                  ENGINEERING SNAPSHOT
                </p>
                <p className="text-[9px] text-gray-400">Verified Credentials & Metrics</p>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-gray-300 leading-relaxed font-sans">
            "An automation engineering student combining IoT development, embedded systems, HMI design, and practical electromechanical experience."
          </p>

          {/* Verified Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="p-2 rounded-xl bg-[rgba(0,31,63,0.45)] border border-[rgba(246,247,237,0.08)] flex flex-col">
              <span className="text-base font-black text-[#dbe64c]">11</span>
              <span className="text-[9px] text-gray-300 font-medium">Projects Done</span>
            </div>
            <div className="p-2 rounded-xl bg-[rgba(0,31,63,0.45)] border border-[rgba(246,247,237,0.08)] flex flex-col">
              <span className="text-base font-black text-[#dbe64c]">8</span>
              <span className="text-[9px] text-gray-300 font-medium">HKI & Awards</span>
            </div>
            <div className="p-2 rounded-xl bg-[rgba(0,31,63,0.45)] border border-[rgba(246,247,237,0.08)] flex flex-col">
              <span className="text-base font-black text-[#dbe64c]">7</span>
              <span className="text-[9px] text-gray-300 font-medium">Industry Roles</span>
            </div>
            <div className="p-2 rounded-xl bg-[rgba(0,31,63,0.45)] border border-[rgba(246,247,237,0.08)] flex flex-col">
              <span className="text-base font-black text-[#dbe64c]">3.95</span>
              <span className="text-[9px] text-gray-300 font-medium">Academic GPA</span>
            </div>
          </div>

          <div className="px-2.5 py-1.5 rounded-lg bg-[rgba(219,230,76,0.1)] border border-[rgba(219,230,76,0.2)] text-[9.5px] text-[#dbe64c] font-semibold flex items-center justify-between">
            <span>122 Completed Credits</span>
            <span className="text-gray-300 font-mono text-[8.5px]">UNDIP</span>
          </div>

          {/* Navigation CTAs */}
          <div className="flex flex-col gap-1.5 pt-2 border-t border-[rgba(246,247,237,0.06)]">
            <button
              type="button"
              onClick={() => navigate("/karya")}
              className="w-full py-1.5 px-3 rounded-lg text-[10px] font-bold text-midnight bg-[#dbe64c] hover:bg-[#c9d43b] transition-all flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#dbe64c]"
            >
              <span className="uppercase tracking-wider">View All Projects</span>
              <ArrowRight size={12} />
            </button>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => navigate("/pengalaman")}
                className="py-1.5 px-2.5 rounded-lg text-[9.5px] font-semibold text-white bg-[rgba(0,31,63,0.4)] hover:bg-[rgba(0,31,63,0.7)] border border-white/10 transition-colors flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                <span>Experience</span>
                <Briefcase size={11} className="text-[#dbe64c]" />
              </button>
              <button
                type="button"
                onClick={() => navigate("/kontak")}
                className="py-1.5 px-2.5 rounded-lg text-[9.5px] font-semibold text-white bg-[rgba(0,31,63,0.4)] hover:bg-[rgba(0,31,63,0.7)] border border-white/10 transition-colors flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                <span>Contact Me</span>
                <Mail size={11} className="text-[#dbe64c]" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── FOOTER ─── */}
      <motion.div
        className="home-panel home-footer rounded-xl px-5 flex items-center justify-between relative"
        style={{ gridArea: "footer", backgroundColor: C.mantis, border: `1px solid rgba(246,247,237,0.06)` }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.4 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ backgroundColor: C.lime }}>
            <span style={{ color: C.midnight, fontSize: "7px", fontWeight: 900 }}>MYR</span>
          </div>
          <p style={{ color: "rgba(246,247,237,0.5)", fontSize: "9px" }}>
            © 2026 {profile.fullName}. All rights reserved.
          </p>
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
          <span style={{ color: "rgba(246,247,237,0.4)", fontSize: "9px" }}>
            {profile.location} 🇮🇩
          </span>
          <div
            className="flex items-center gap-1 px-2 py-1 rounded-full"
            style={{ backgroundColor: "rgba(219,230,76,0.1)", border: "1px solid rgba(219,230,76,0.2)" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: C.lime }}
            />
            <span style={{ color: C.lime, fontSize: "8px", fontWeight: 600 }}>Open for Work</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
