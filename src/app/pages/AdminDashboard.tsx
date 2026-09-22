import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { C, containerVariants, itemVariants } from "../components/constants";
import { supabase } from "../../lib/supabase";
import { ShieldCheck, Layers, Award, GraduationCap, Briefcase, Wrench, ArrowRight } from "lucide-react";

export interface AdminOverviewStats {
  publishedProjects: number;
  draftProjects: number;
  totalExperiences: number;
  totalEducation: number;
  totalSkills: number;
  totalAchievements: number;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<AdminOverviewStats>({
    publishedProjects: 0,
    draftProjects: 0,
    totalExperiences: 0,
    totalEducation: 0,
    totalSkills: 0,
    totalAchievements: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadStats() {
      try {
        const [
          { data: projectsData },
          { data: expData },
          { data: eduData },
          { data: skillData },
          { data: achData },
        ] = await Promise.all([
          supabase.from("projects").select("id, is_published"),
          supabase.from("experiences").select("id, is_published"),
          supabase.from("education").select("id, is_published"),
          supabase.from("skills").select("id, is_published"),
          supabase.from("achievements").select("id, is_published"),
        ]);

        if (isMounted) {
          const publishedProjects = projectsData?.filter((p) => p.is_published).length || 0;
          const draftProjects = projectsData?.filter((p) => !p.is_published).length || 0;

          setStats({
            publishedProjects,
            draftProjects,
            totalExperiences: expData?.length || 0,
            totalEducation: eduData?.length || 0,
            totalSkills: skillData?.length || 0,
            totalAchievements: achData?.length || 0,
          });
          setLoading(false);
        }
      } catch {
        console.warn("Admin stats fetch notice: Defaulting to initial counts.");
        if (isMounted) setLoading(false);
      }
    }

    loadStats();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <motion.div
      className="flex flex-col gap-5"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Welcome Banner */}
      <motion.div
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{
          backgroundColor: C.green,
          boxShadow: `0 8px 32px rgba(0,128,76,0.25)`,
        }}
        variants={itemVariants}
      >
        <div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${C.lime} 0%, transparent 70%)`, opacity: 0.15 }}
        />
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck size={16} color={C.lime} />
          <span className="uppercase text-[9px] font-bold tracking-widest" style={{ color: C.lime }}>
            AUTHENTICATED ADMIN SESSION
          </span>
        </div>
        <h2 style={{ color: C.white, fontWeight: 900, fontSize: "20px" }}>
          Welcome to Portfolio Content Administration
        </h2>
        <p className="mt-1 max-w-2xl text-xs leading-relaxed" style={{ color: "rgba(246,247,237,0.85)" }}>
          You are authenticated as an active owner/admin in <code className="text-[#dbe64c]">public.site_admins</code>. You have read access across all published and draft portfolio datasets.
        </p>
      </motion.div>

      {/* Overview Cards Grid */}
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" variants={itemVariants}>
        {/* Projects Card */}
        <div
          className="rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden"
          style={{ backgroundColor: "rgba(246,247,237,0.04)", border: "1px solid rgba(246,247,237,0.08)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span style={{ color: "rgba(246,247,237,0.5)", fontSize: "10px", fontWeight: 700 }}>PROJECTS</span>
            <Layers size={18} color={C.lime} />
          </div>
          <div className="my-2">
            <p style={{ color: C.white, fontSize: "24px", fontWeight: 900 }}>
              {loading ? "..." : stats.publishedProjects + stats.draftProjects}
            </p>
            <p style={{ color: C.lime, fontSize: "11px", fontWeight: 600 }}>
              {stats.publishedProjects} Published · {stats.draftProjects} Draft
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/projects")}
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-[#dbe64c] hover:underline"
          >
            <span>Manage Projects</span>
            <ArrowRight size={12} />
          </button>
        </div>

        {/* Experiences Card */}
        <div
          className="rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden"
          style={{ backgroundColor: "rgba(246,247,237,0.04)", border: "1px solid rgba(246,247,237,0.08)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span style={{ color: "rgba(246,247,237,0.5)", fontSize: "10px", fontWeight: 700 }}>EXPERIENCES</span>
            <Briefcase size={18} color={C.lime} />
          </div>
          <div className="my-2">
            <p style={{ color: C.white, fontSize: "24px", fontWeight: 900 }}>
              {loading ? "..." : stats.totalExperiences}
            </p>
            <p style={{ color: "rgba(246,247,237,0.6)", fontSize: "11px" }}>Verified Experience Records</p>
          </div>
        </div>

        {/* Education & Skills Card */}
        <div
          className="rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden"
          style={{ backgroundColor: "rgba(246,247,237,0.04)", border: "1px solid rgba(246,247,237,0.08)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span style={{ color: "rgba(246,247,237,0.5)", fontSize: "10px", fontWeight: 700 }}>SKILLS & EDU</span>
            <Wrench size={18} color={C.lime} />
          </div>
          <div className="my-2">
            <p style={{ color: C.white, fontSize: "24px", fontWeight: 900 }}>
              {loading ? "..." : stats.totalSkills}
            </p>
            <p style={{ color: "rgba(246,247,237,0.6)", fontSize: "11px" }}>
              {stats.totalSkills} Technical Skills · {stats.totalEducation} Academic Records
            </p>
          </div>
        </div>

        {/* Achievements Card */}
        <div
          className="rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden"
          style={{ backgroundColor: "rgba(246,247,237,0.04)", border: "1px solid rgba(246,247,237,0.08)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span style={{ color: "rgba(246,247,237,0.5)", fontSize: "10px", fontWeight: 700 }}>ACHIEVEMENTS</span>
            <Award size={18} color={C.lime} />
          </div>
          <div className="my-2">
            <p style={{ color: C.white, fontSize: "24px", fontWeight: 900 }}>
              {loading ? "..." : stats.totalAchievements}
            </p>
            <p style={{ color: "rgba(246,247,237,0.6)", fontSize: "11px" }}>Intellectual Property & Awards</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
