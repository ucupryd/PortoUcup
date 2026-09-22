import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { C, containerVariants, itemVariants } from "../components/constants";
import { supabase } from "../../lib/supabase";
import { Layers, Star, Eye, EyeOff, Plus, Edit3, AlertTriangle } from "lucide-react";

export interface AdminProjectRow {
  id: string;
  title: string;
  slug: string;
  category: string;
  role: string;
  period: string;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
}

export default function AdminProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<AdminProjectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchAdminProjects = async (isMounted = true) => {
    try {
      const { data, error: queryError } = await supabase
        .from("projects")
        .select("id, title, slug, category, role, period, is_featured, is_published, display_order")
        .order("display_order", { ascending: true });

      if (queryError) {
        console.warn("Admin project fetch notice: Query error occurred.");
        if (isMounted) {
          setError("Unable to retrieve project database records. Please check admin session.");
          setLoading(false);
        }
        return;
      }

      if (isMounted) {
        setProjects((data as AdminProjectRow[]) || []);
        setLoading(false);
      }
    } catch {
      console.warn("Admin project fetch notice: Exception caught during project fetch.");
      if (isMounted) {
        setError("Failed to load projects due to a network connection error.");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetchAdminProjects(isMounted);
    return () => {
      isMounted = false;
    };
  }, []);

  const handleTogglePublish = async (proj: AdminProjectRow) => {
    setTogglingId(proj.id);
    try {
      const { error } = await supabase
        .from("projects")
        .update({ is_published: !proj.is_published })
        .eq("id", proj.id);

      if (error) {
        console.warn("Failed to toggle publish state.");
      } else {
        await fetchAdminProjects(true);
      }
    } catch {
      console.warn("Exception during publish state toggle.");
    } finally {
      setTogglingId(null);
    }
  };

  const handleToggleFeatured = async (proj: AdminProjectRow) => {
    if (!proj.is_featured && !proj.slug.toLowerCase().includes("ebro")) {
      const confirmed = window.confirm(
        "Warning: eBro is established as the primary featured project. Marking another project as featured will result in multiple featured projects. Do you want to proceed?"
      );
      if (!confirmed) return;
    }
    setTogglingId(proj.id);
    try {
      const { error } = await supabase
        .from("projects")
        .update({ is_featured: !proj.is_featured })
        .eq("id", proj.id);

      if (error) {
        console.warn("Failed to toggle featured state.");
      } else {
        await fetchAdminProjects(true);
      }
    } catch {
      console.warn("Exception during featured state toggle.");
    } finally {
      setTogglingId(null);
    }
  };

  const featuredCount = projects.filter((p) => p.is_featured).length;

  return (
    <motion.div
      className="flex flex-col gap-5"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Header Info & Action Banner */}
      <motion.div
        className="rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        style={{
          backgroundColor: "rgba(246,247,237,0.04)",
          border: "1px solid rgba(246,247,237,0.08)",
        }}
        variants={itemVariants}
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers size={16} color={C.lime} />
            <h2 className="uppercase" style={{ color: C.white, fontWeight: 800, fontSize: "16px", letterSpacing: "0.05em" }}>
              PROJECT MANAGEMENT (CREATE, EDIT & PUBLISH)
            </h2>
          </div>
          <p style={{ color: "rgba(246,247,237,0.6)", fontSize: "11px" }}>
            Create new project records, edit descriptions, toggle publication status, or configure display order.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin/projects/new")}
            className="px-4 py-2 rounded-xl text-xs font-bold text-midnight bg-[#dbe64c] hover:bg-[#c9d43b] transition-all shadow-lg flex items-center gap-2"
          >
            <Plus size={16} />
            <span>Create New Project</span>
          </button>
        </div>
      </motion.div>

      {/* Multiple Featured Warning */}
      {featuredCount > 1 && (
        <motion.div
          className="rounded-xl p-4 flex items-center gap-3 bg-amber-950/40 border border-amber-500/40 text-amber-200"
          variants={itemVariants}
        >
          <AlertTriangle size={18} className="text-amber-400 shrink-0" />
          <p className="text-xs font-medium">
            <strong>Multiple Featured Projects Detected ({featuredCount}):</strong> eBro is established as the primary featured project. Multiple featured flags may cause unexpected hero card selections.
          </p>
        </motion.div>
      )}

      {/* Error Alert */}
      {error && (
        <motion.div
          className="rounded-xl p-4 flex items-center gap-3 bg-red-950/40 border border-red-500/40 text-red-200"
          variants={itemVariants}
        >
          <span style={{ color: "#EF4444", fontSize: "14px" }}>⚠️</span>
          <p style={{ color: C.white, fontSize: "12px", fontWeight: 500 }}>{error}</p>
        </motion.div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full" style={{ backgroundColor: "rgba(0,31,63,0.4)", border: "1px solid rgba(246,247,237,0.1)" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: C.lime }} />
            <span style={{ color: C.white, fontSize: "11px" }}>Loading Project Records...</span>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && projects.length === 0 && (
        <div
          className="rounded-2xl p-8 text-center"
          style={{ backgroundColor: "rgba(246,247,237,0.03)", border: "1px solid rgba(246,247,237,0.06)" }}
        >
          <Layers size={32} color={C.lime} className="mx-auto mb-2 opacity-50" />
          <p style={{ color: C.white, fontWeight: 700, fontSize: "14px" }}>No projects found in database.</p>
          <p style={{ color: "rgba(246,247,237,0.5)", fontSize: "11px", marginTop: "4px" }}>
            Click "Create New Project" above to insert your first project record.
          </p>
        </div>
      )}

      {/* Project Table */}
      {!loading && !error && projects.length > 0 && (
        <motion.div className="flex flex-col gap-3" variants={itemVariants}>
          <div className="overflow-x-auto rounded-2xl border border-[rgba(246,247,237,0.08)] bg-[rgba(246,247,237,0.02)]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[rgba(246,247,237,0.08)] bg-[rgba(0,31,63,0.3)]">
                  <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-[rgba(246,247,237,0.5)]">
                    Order
                  </th>
                  <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-[rgba(246,247,237,0.5)]">
                    Title & Slug
                  </th>
                  <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-[rgba(246,247,237,0.5)]">
                    Category
                  </th>
                  <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-[rgba(246,247,237,0.5)]">
                    Role & Period
                  </th>
                  <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-[rgba(246,247,237,0.5)] text-center">
                    Featured
                  </th>
                  <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-[rgba(246,247,237,0.5)] text-center">
                    Status
                  </th>
                  <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-[rgba(246,247,237,0.5)] text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(246,247,237,0.05)]">
                {projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-[rgba(246,247,237,0.03)] transition-colors">
                    {/* Display Order */}
                    <td className="py-3.5 px-4">
                      <span className="w-6 h-6 rounded-lg bg-[rgba(219,230,76,0.1)] text-[#dbe64c] text-[10px] font-bold flex items-center justify-center">
                        {proj.display_order}
                      </span>
                    </td>

                    {/* Title & Slug */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="text-xs font-bold text-white line-clamp-1">{proj.title}</p>
                      <p className="text-[10px] text-[rgba(246,247,237,0.4)] font-mono mt-0.5">{proj.slug}</p>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-md bg-[rgba(246,247,237,0.05)] text-white text-[10px] font-medium border border-[rgba(246,247,237,0.08)]">
                        {proj.category}
                      </span>
                    </td>

                    {/* Role & Period */}
                    <td className="py-3.5 px-4">
                      <p className="text-xs text-white font-medium">{proj.role}</p>
                      <p className="text-[10px] text-[rgba(219,230,76,0.8)] font-semibold">{proj.period}</p>
                    </td>

                    {/* Featured Status */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleToggleFeatured(proj)}
                        disabled={togglingId === proj.id}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold border transition-all ${
                          proj.is_featured
                            ? "bg-[rgba(219,230,76,0.2)] text-[#dbe64c] border-[rgba(219,230,76,0.4)] hover:bg-[rgba(219,230,76,0.3)]"
                            : "bg-[rgba(246,247,237,0.05)] text-[rgba(246,247,237,0.4)] border-[rgba(246,247,237,0.1)] hover:text-white hover:border-[rgba(246,247,237,0.3)]"
                        }`}
                        title="Click to toggle featured status"
                      >
                        <Star size={10} className={proj.is_featured ? "fill-[#dbe64c]" : ""} />
                        {proj.is_featured ? "Featured" : "Standard"}
                      </button>
                    </td>

                    {/* Published Status */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleTogglePublish(proj)}
                        disabled={togglingId === proj.id}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold border transition-all ${
                          proj.is_published
                            ? "bg-[rgba(0,128,76,0.2)] text-[#dbe64c] border-[rgba(0,128,76,0.4)] hover:bg-[rgba(0,128,76,0.3)]"
                            : "bg-[rgba(245,158,11,0.2)] text-amber-300 border-amber-500/30 hover:bg-[rgba(245,158,11,0.3)]"
                        }`}
                        title="Click to toggle publish status"
                      >
                        {proj.is_published ? <Eye size={10} /> : <EyeOff size={10} />}
                        {togglingId === proj.id ? "Updating..." : proj.is_published ? "Published" : "Draft"}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => navigate(`/admin/projects/${proj.id}/edit`)}
                        className="px-3 py-1.5 rounded-lg bg-[rgba(246,247,237,0.06)] hover:bg-[rgba(219,230,76,0.15)] text-[rgba(246,247,237,0.8)] hover:text-[#dbe64c] text-xs font-semibold transition-all border border-[rgba(246,247,237,0.1)] inline-flex items-center gap-1.5"
                      >
                        <Edit3 size={12} />
                        <span>Edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

