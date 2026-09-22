import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Zap, Target, Handshake, TrendingUp, GraduationCap, CheckCircle2 } from "lucide-react";
import { C, containerVariants, itemVariants } from "../components/constants";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { portfolioData, ProfileData, EducationData, SkillCategoryData } from "../data/portfolioData";
import { fetchPublishedProfile, fetchPublishedEducation, fetchPublishedSkills } from "../../lib/contentService";

import PROFILE_IMG from "../assets/profil.jpeg";

const values = [
  { Icon: Zap, title: "Innovation", desc: "Always exploring practical solutions in IoT, automation, and control technology." },
  { Icon: Target, title: "Precision", desc: "Every system and code is built with high accuracy and engineering standards." },
  { Icon: Handshake, title: "Collaboration", desc: "Active in robotics teams, student organizations, and engineering projects." },
  { Icon: TrendingUp, title: "Impact", desc: "Focused on real-world systems that provide operational reliability and value." },
];

export default function Tentang() {
  const [profile, setProfile] = useState<ProfileData>(portfolioData.profile);
  const [education, setEducation] = useState<EducationData[]>(portfolioData.education);
  const [skillCategories, setSkillCategories] = useState<SkillCategoryData[]>(portfolioData.skillCategories);

  useEffect(() => {
    let isMounted = true;

    async function loadContent() {
      const [fetchedProfile, fetchedEducation, fetchedSkills] = await Promise.all([
        fetchPublishedProfile(),
        fetchPublishedEducation(),
        fetchPublishedSkills(),
      ]);

      if (isMounted) {
        setProfile(fetchedProfile);
        setEducation(fetchedEducation);
        setSkillCategories(fetchedSkills);
      }
    }

    loadContent();

    return () => {
      isMounted = false;
    };
  }, []);

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
              alt={profile.fullName}
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
                <span style={{ color: C.lime, fontSize: "9px", fontWeight: 600 }}>{profile.title}</span>
              </div>
              <p className="uppercase" style={{ color: C.white, fontWeight: 900, fontSize: "18px", letterSpacing: "0.04em" }}>
                {profile.fullName}
              </p>
            </div>
          </motion.div>

          {/* Education Card */}
          <motion.div
            className="rounded-2xl p-5 relative overflow-hidden"
            style={{ backgroundColor: "rgba(246,247,237,0.04)", border: "1px solid rgba(246,247,237,0.07)" }}
            variants={itemVariants}
          >
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap size={16} color={C.lime} />
              <p className="uppercase" style={{ color: "rgba(246,247,237,0.4)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em" }}>
                EDUCATION
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {education.map((edu) => (
                <div key={edu.school} className="p-3 rounded-xl" style={{ backgroundColor: "rgba(246,247,237,0.03)", border: "1px solid rgba(246,247,237,0.05)" }}>
                  <div className="flex justify-between items-start">
                    <p style={{ color: C.white, fontSize: "12px", fontWeight: 700 }}>{edu.school}</p>
                    <span style={{ color: C.lime, fontSize: "9px", fontWeight: 600 }}>{edu.year}</span>
                  </div>
                  <p style={{ color: "rgba(246,247,237,0.7)", fontSize: "11px" }}>{edu.degree}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {edu.gpa && (
                      <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(0,128,76,0.2)", color: C.lime, fontSize: "8px", fontWeight: 600 }}>
                        {edu.gpa} GPA
                      </span>
                    )}
                    {edu.credits && (
                      <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(30,72,143,0.3)", color: C.white, fontSize: "8px" }}>
                        {edu.credits}
                      </span>
                    )}
                    {edu.honors && (
                      <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(219,230,76,0.1)", color: C.lime, fontSize: "8px", fontWeight: 600 }}>
                        {edu.honors}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Soft Skills */}
          <motion.div
            className="rounded-2xl p-4"
            style={{ backgroundColor: "rgba(246,247,237,0.04)", border: "1px solid rgba(246,247,237,0.07)" }}
            variants={itemVariants}
          >
            <p className="uppercase mb-3" style={{ color: "rgba(246,247,237,0.4)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em" }}>
              SOFT SKILLS
            </p>
            <div className="flex flex-col gap-2">
              {profile.softSkills.map((skill) => (
                <div key={skill} className="flex items-center gap-2">
                  <CheckCircle2 size={12} color={C.lime} />
                  <span style={{ color: C.white, fontSize: "11px" }}>{skill}</span>
                </div>
              ))}
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
          {/* Bio Intro Box */}
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
            <p style={{ color: C.white, fontSize: "13px", lineHeight: 1.75, opacity: 0.95, fontWeight: 500 }}>
              {profile.bioIntro}
            </p>
          </motion.div>

          {/* Development Narrative */}
          <motion.div
            className="rounded-2xl p-6 relative overflow-hidden"
            style={{ backgroundColor: "rgba(246,247,237,0.04)", border: "1px solid rgba(246,247,237,0.07)" }}
            variants={itemVariants}
          >
            <p className="uppercase mb-4" style={{ color: "rgba(246,247,237,0.4)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em" }}>
              PROFESSIONAL DEVELOPMENT NARRATIVE
            </p>
            <div className="flex flex-col gap-3">
              {profile.narrativePoints.map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: "rgba(219,230,76,0.1)", color: C.lime, fontSize: "10px", fontWeight: 700 }}>
                    {i + 1}
                  </span>
                  <p style={{ color: "rgba(246,247,237,0.8)", fontSize: "12px", lineHeight: 1.65 }}>
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Categorized Technical Skills */}
          <motion.div
            className="rounded-2xl p-5 flex flex-col gap-4"
            style={{ backgroundColor: "rgba(246,247,237,0.04)", border: "1px solid rgba(246,247,237,0.07)" }}
            variants={itemVariants}
          >
            <p className="uppercase" style={{ color: "rgba(246,247,237,0.4)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em" }}>
              CATEGORIZED TECHNICAL SKILLS
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {skillCategories.map((cat) => (
                <div
                  key={cat.category}
                  className="rounded-xl p-3"
                  style={{ backgroundColor: "rgba(246,247,237,0.03)", border: "1px solid rgba(246,247,237,0.06)" }}
                >
                  <p style={{ color: C.lime, fontSize: "10px", fontWeight: 700, marginBottom: "6px" }}>
                    {cat.category}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 rounded-md"
                        style={{
                          backgroundColor: "rgba(246,247,237,0.05)",
                          color: C.white,
                          fontSize: "10px",
                          fontWeight: 500,
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}


