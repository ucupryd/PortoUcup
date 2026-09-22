import { NavLink, Outlet, useNavigate } from "react-router";
import { motion } from "motion/react";
import { C } from "./constants";
import { ShieldCheck, LayoutDashboard, Layers, ArrowLeft, LogOut } from "lucide-react";
import { supabase } from "../../lib/supabase";

export function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-full p-2 md:p-4 flex flex-col gap-4">
      {/* Top Header Bar */}
      <motion.div
        className="rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 relative overflow-hidden"
        style={{
          backgroundColor: "rgba(0, 31, 63, 0.35)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(219,230,76,0.2)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: C.lime }}
          >
            <ShieldCheck size={20} color={C.midnight} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 style={{ color: C.white, fontWeight: 900, fontSize: "16px", letterSpacing: "0.02em" }}>
                ADMIN DASHBOARD
              </h1>
              <span
                className="px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider"
                style={{ backgroundColor: "rgba(0,128,76,0.25)", color: C.lime, border: "1px solid rgba(0,128,76,0.4)" }}
              >
                VERIFIED ADMIN
              </span>
            </div>
            <p style={{ color: "rgba(246,247,237,0.5)", fontSize: "11px" }}>
              Content Management & Security Control Center
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? "bg-[rgba(219,230,76,0.15)] text-[#dbe64c] border border-[rgba(219,230,76,0.3)]"
                  : "text-[rgba(246,247,237,0.6)] hover:text-white hover:bg-[rgba(246,247,237,0.05)]"
              }`
            }
          >
            <LayoutDashboard size={14} />
            <span>Overview</span>
          </NavLink>

          <NavLink
            to="/admin/projects"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? "bg-[rgba(219,230,76,0.15)] text-[#dbe64c] border border-[rgba(219,230,76,0.3)]"
                  : "text-[rgba(246,247,237,0.6)] hover:text-white hover:bg-[rgba(246,247,237,0.05)]"
              }`
            }
          >
            <Layers size={14} />
            <span>Projects</span>
          </NavLink>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-[rgba(246,247,237,0.6)] hover:text-white hover:bg-[rgba(246,247,237,0.08)] transition-all"
          >
            <ArrowLeft size={14} />
            <span>Public Site</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-all border border-red-900/30"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>
      </motion.div>

      {/* Main Outlet */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
