import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { C, containerVariants, itemVariants } from "../components/constants";
import { portfolioData, ExperienceData, OrganizationData, EducationData, AchievementData } from "../data/portfolioData";
import { fetchPublishedExperiences, fetchPublishedEducation, fetchPublishedAchievements } from "../../lib/contentService";
import { Award, Briefcase, Users, GraduationCap, CheckCircle2 } from "lucide-react";

export default function Pengalaman() {
  const [experiences, setExperiences] = useState<ExperienceData[]>(portfolioData.experiences);
  const [organizations, setOrganizations] = useState<OrganizationData[]>(portfolioData.organizations);
  const [education, setEducation] = useState<EducationData[]>(portfolioData.education);
  const [achievements, setAchievements] = useState<AchievementData[]>(portfolioData.achievements);
  const certificationsSidebar = portfolioData.certificationsSidebar;

  useEffect(() => {
    let isMounted = true;

    async function loadContent() {
      const [expResult, fetchedEducation, fetchedAchievements] = await Promise.all([
        fetchPublishedExperiences(),
        fetchPublishedEducation(),
        fetchPublishedAchievements(),
      ]);

      if (isMounted) {
        setExperiences(expResult.experiences);
        setOrganizations(expResult.organizations);
        setEducation(fetchedEducation);
        setAchievements(fetchedAchievements);
      }
    }

    loadContent();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="h-full p-1 pb-6">
      {/* Header */}
      <motion.div className="mb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <span style={{ color: C.lime, fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em" }}>
            02 — EXPERIENCE
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: "rgba(219,230,76,0.2)" }} />
        </div>
        <h1 className="uppercase" style={{ color: C.white, fontWeight: 900, fontSize: "clamp(22px, 3vw, 38px)", letterSpacing: "-0.02em" }}>
          PROFESSIONAL &{" "}
          <span style={{ color: C.lime }}>
            ORGANIZATIONAL JOURNEY
          </span>
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-5">
        {/* Main Content (Professional & Organizational Timeline) */}
        <motion.div
          className="flex flex-col gap-8"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {/* SECTION 1: PROFESSIONAL EXPERIENCE */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase size={16} color={C.lime} />
              <h2 className="uppercase" style={{ color: C.white, fontWeight: 800, fontSize: "16px", letterSpacing: "0.05em" }}>
                PROFESSIONAL EXPERIENCE
              </h2>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <motion.div
                className="absolute left-5 top-0 bottom-0 w-px"
                style={{ backgroundColor: "rgba(246,247,237,0.1)" }}
                initial={{ scaleY: 0, originY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />

              <div className="flex flex-col gap-4">
                {experiences.map((exp, i) => {
                  const cardColor = exp.color || C.green;
                  return (
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
                          backgroundColor: cardColor,
                          boxShadow: `0 0 20px ${cardColor}44`,
                          top: "8px",
                        }}
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 200 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <span style={{ fontSize: "14px" }}>
                          {i === 0 ? "⚡" : i === 1 ? "🔧" : "🏢"}
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
                          borderColor: `${cardColor}44`,
                          y: -2,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <div
                          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                          style={{ backgroundColor: cardColor }}
                        />

                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p style={{ color: cardColor, fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em" }}>
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
                            style={{ backgroundColor: `${cardColor}22`, color: cardColor, fontSize: "9px", fontWeight: 600 }}
                          >
                            {exp.type}
                          </span>
                        </div>

                        <p className="mb-3" style={{ color: "rgba(246,247,237,0.65)", fontSize: "12px", lineHeight: 1.65 }}>
                          {exp.desc}
                        </p>

                        <div className="flex flex-col gap-1.5 mb-3">
                          {exp.achievements.map((a) => (
                            <div key={a} className="flex items-start gap-2">
                              <span style={{ color: C.lime, fontSize: "10px", marginTop: "2px" }}>✦</span>
                              <span style={{ color: "rgba(246,247,237,0.75)", fontSize: "11px" }}>{a}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-1.5">
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
                  );
                })}
              </div>
            </div>
          </div>

          {/* SECTION 2: ORGANIZATION AND LEADERSHIP EXPERIENCE */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users size={16} color={C.lime} />
              <h2 className="uppercase" style={{ color: C.white, fontWeight: 800, fontSize: "16px", letterSpacing: "0.05em" }}>
                ORGANIZATION AND LEADERSHIP EXPERIENCE
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {organizations.map((org, i) => (
                <motion.div
                  key={org.organization}
                  className="rounded-2xl p-5 flex flex-col justify-between"
                  style={{
                    backgroundColor: "rgba(246,247,237,0.04)",
                    border: "1px solid rgba(246,247,237,0.07)",
                  }}
                  variants={itemVariants}
                  whileHover={{
                    backgroundColor: "rgba(246,247,237,0.06)",
                    borderColor: "rgba(219,230,76,0.2)",
                    y: -2,
                  }}
                >
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <span style={{ color: C.lime, fontSize: "9px", fontWeight: 700 }}>{org.year}</span>
                    </div>
                    <h3 style={{ color: C.white, fontWeight: 800, fontSize: "13px" }}>
                      {org.role}
                    </h3>
                    <p style={{ color: "rgba(246,247,237,0.5)", fontSize: "11px", marginBottom: "12px" }}>
                      {org.organization}
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {org.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 size={12} color={C.lime} className="shrink-0 mt-0.5" />
                          <span style={{ color: "rgba(246,247,237,0.75)", fontSize: "11px", lineHeight: 1.5 }}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          {/* SECTION 3: VERIFIED ACHIEVEMENTS & CERTIFICATIONS */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Award size={16} color={C.lime} />
              <h2 className="uppercase" style={{ color: C.white, fontWeight: 800, fontSize: "16px", letterSpacing: "0.05em" }}>
                VERIFIED ACHIEVEMENTS & INTELLECTUAL PROPERTY
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {achievements.map((ach, i) => (
                <motion.div
                  key={i}
                  className="rounded-xl p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3"
                  style={{
                    backgroundColor: "rgba(246,247,237,0.04)",
                    border: "1px solid rgba(246,247,237,0.07)",
                  }}
                  variants={itemVariants}
                  whileHover={{
                    backgroundColor: "rgba(246,247,237,0.06)",
                    borderColor: "rgba(219,230,76,0.2)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: "rgba(219,230,76,0.1)", color: C.lime, fontSize: "12px" }}>
                      🏆
                    </span>
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span style={{ color: C.lime, fontSize: "9px", fontWeight: 700 }}>{ach.year}</span>
                        <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(246,247,237,0.06)", color: "rgba(246,247,237,0.6)", fontSize: "8px" }}>
                          {ach.category}
                        </span>
                        {ach.registrationNumber && (
                          <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(0,128,76,0.2)", color: C.lime, fontSize: "8px", fontWeight: 600 }}>
                            Reg. No. {ach.registrationNumber}
                          </span>
                        )}
                      </div>
                      <h3 style={{ color: C.white, fontWeight: 700, fontSize: "12px", lineHeight: 1.5 }} className="break-words">
                        {ach.title}
                      </h3>
                      <p style={{ color: "rgba(246,247,237,0.5)", fontSize: "10px", marginTop: "2px" }}>
                        Issuer: {ach.issuer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>


        {/* Right sidebar */}
        <motion.div
          className="flex flex-col gap-4"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {/* Education */}
          <motion.div
            className="rounded-2xl p-5"
            style={{ backgroundColor: "rgba(246,247,237,0.04)", border: "1px solid rgba(246,247,237,0.07)" }}
            variants={itemVariants}
          >
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap size={16} color={C.lime} />
              <p className="uppercase" style={{ color: "rgba(246,247,237,0.4)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em" }}>
                ACADEMIC BACKGROUND
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.school}
                  className="rounded-xl p-4"
                  style={{ backgroundColor: "rgba(246,247,237,0.04)", border: "1px solid rgba(246,247,237,0.06)" }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.15 }}
                  whileHover={{ borderColor: "rgba(219,230,76,0.2)", backgroundColor: "rgba(219,230,76,0.04)" }}
                >
                  <p style={{ color: C.lime, fontSize: "9px", fontWeight: 700 }}>{edu.year}</p>
                  <p className="mt-1" style={{ color: C.white, fontSize: "12px", fontWeight: 700 }}>{edu.degree}</p>
                  <p style={{ color: "rgba(246,247,237,0.5)", fontSize: "10px" }}>{edu.school}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {edu.gpa && (
                      <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(0,128,76,0.2)", color: C.lime, fontSize: "8px", fontWeight: 600 }}>
                        GPA {edu.gpa}
                      </span>
                    )}
                    {edu.honors && (
                      <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(219,230,76,0.1)", color: C.lime, fontSize: "8px", fontWeight: 600 }}>
                        {edu.honors}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications Sidebar */}
          <motion.div
            className="rounded-2xl p-5"
            style={{ backgroundColor: C.blue, boxShadow: `0 8px 32px rgba(30,72,143,0.2)` }}
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Award size={16} color={C.lime} />
              <p className="uppercase" style={{ color: "rgba(246,247,237,0.7)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em" }}>
                VERIFIED CERTIFICATIONS
              </p>
            </div>
            {certificationsSidebar.map((cert, i) => (
              <motion.div
                key={cert}
                className="flex items-start gap-2.5 py-2.5"
                style={{ borderBottom: i < certificationsSidebar.length - 1 ? "1px solid rgba(246,247,237,0.08)" : "none" }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
              >
                <span style={{ color: C.lime, fontSize: "10px", marginTop: "2px" }}>✦</span>
                <span style={{ color: "rgba(246,247,237,0.85)", fontSize: "11px", lineHeight: 1.5 }}>{cert}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

