import { NavLink, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { supabase } from "../../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { AuthModal } from "./AuthModal";
import { C } from "./constants";
import {
  UserRound,
  BriefcaseBusiness,
  Layers,
  Star,
  Mail,
  ChevronLeft,
  Activity,
  LogOut,
  LogIn
} from "lucide-react";
import LOGO from "../assets/logo.png";

const navItems = [
  { label: "ABOUT", sub: "Me", Icon: UserRound, path: "/tentang" },
  { label: "EXPERIENCE", sub: "History", Icon: BriefcaseBusiness, path: "/pengalaman" },
  { label: "PORTFOLIO", sub: "Works", Icon: Layers, path: "/karya" },
  { label: "TESTIMONI", sub: "Reviews", Icon: Star, path: "/testimoni" },
  { label: "CONTACT", sub: "Connect", Icon: Mail, path: "/kontak" },
];

interface NavPanelProps {
  open?: boolean;
  onToggle?: () => void;
}

export function NavPanel({ open = true, onToggle }: NavPanelProps) {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const dynamicNavItems = [...navItems];
  if (session) {
    dynamicNavItems.push({ label: "MONITORING", sub: "Dashboard", Icon: Activity, path: "/monitoring" });
  }

  return (
    <>
    <motion.div
      className="nav-panel flex flex-col h-full rounded-2xl relative"
      style={{
        width: "100%",
        backgroundColor: "rgba(0, 31, 63, 0.15)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: `1px solid rgba(246,247,237,0.08)`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(246,247,237,0.05)`,
        overflow: "hidden",
      }}
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
    >
      {/* Glow accent */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${C.lime} 0%, transparent 70%)`, transform: "translate(30%, -30%)", opacity: 0.1 }}
      />

      {/* ── TOP: Logo ── */}
      <div
        className="nav-panel-logo"
        style={{
          padding: "16px 12px 0 12px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          {/* YR logo — always centered */}
        <motion.div
          className="rounded-xl flex items-center justify-center cursor-pointer flex-shrink-0"
          style={{ width: 40, height: 40, backgroundColor: C.lime }}
          onClick={() => navigate("/")}
          onContextMenu={(e) => {
            e.preventDefault();
            setIsAuthOpen(true);
          }}
          whileHover={{ scale: 1.08, rotate: 3 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src={LOGO} alt="Logo" style={{ width: 22, height: 22, objectFit: "contain" }} />
        </motion.div>

        </NavLink>

        {/* Subtitle — fade + collapse height */}
        <motion.div
          style={{ overflow: "hidden", textAlign: "center" }}
          animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0, marginBottom: open ? 0 : 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          <p className="tracking-widest uppercase" style={{ color: C.lime, opacity: 0.85, fontSize: "9px" }}>MY</p>
          <p className="tracking-widest uppercase" style={{ color: C.white, opacity: 0.4, fontSize: "9px" }}>PORTFOLIO</p>
        </motion.div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: "rgba(246,247,237,0.08)", margin: "14px 12px" }} />

      {/* ── MIDDLE: Nav items ── */}
      <nav className="flex flex-col flex-1 overflow-y-auto" style={{ gap: 4, padding: "0 8px", scrollbarWidth: "none" }}>
        {dynamicNavItems.map(({ label, sub, Icon, path }, i) => (
          <NavLink key={label} to={path} style={{ outline: 'none', WebkitTapHighlightColor: 'transparent' }}>
            {({ isActive }) => (
              <motion.div
                className="rounded-xl flex items-center relative overflow-hidden cursor-pointer"
                style={{
                  backgroundColor: isActive && open ? "rgba(219,230,76,0.12)" : "transparent",
                  border: isActive && open ? `1px solid rgba(219,230,76,0.2)` : "1px solid transparent",
                  height: open ? 42 : 48,
                  paddingLeft: open ? 10 : 0,
                  paddingRight: open ? 10 : 0,
                  justifyContent: open ? "flex-start" : "center",
                  gap: open ? 10 : 0,
                  transition: "padding 0.35s ease, gap 0.35s ease, height 0.35s ease",
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.4 }}
                whileHover={isActive ? {} : { backgroundColor: "rgba(246,247,237,0.05)" }}
                title={!open ? label : undefined}
              >
                {isActive && (
                  <div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{ background: `linear-gradient(135deg, rgba(219,230,76,0.06), transparent)` }}
                  />
                )}

                {/* Icon — always visible, centered when collapsed */}
                <span
                  className="flex-shrink-0 flex items-center justify-center relative z-10"
                  style={{
                    width: open ? 28 : 40,
                    height: open ? 28 : 40,
                    borderRadius: open ? 8 : 12,
                    backgroundColor: isActive ? C.lime : "rgba(246,247,237,0.07)",
                    transition: "background-color 0.25s, width 0.35s ease, height 0.35s ease, border-radius 0.35s ease",
                  }}
                >
                  <Icon
                    size={open ? 14 : 19}
                    strokeWidth={open ? 2 : 1.8}
                    color={isActive ? C.midnight : "rgba(246,247,237,0.75)"}
                    style={{ transition: "all 0.3s ease" }}
                  />
                </span>

                {/* Label — fade + slide */}
                <motion.div
                  className="flex-1 min-w-0 relative z-10"
                  animate={{ opacity: open ? 1 : 0, x: open ? 0 : -4 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: "hidden", pointerEvents: "none" }}
                >
                  <p style={{
                    color: isActive ? C.lime : "rgba(246,247,237,0.65)",
                    fontWeight: isActive ? 700 : 500,
                    fontSize: "10px",
                    letterSpacing: "0.08em",
                    whiteSpace: "nowrap",
                  }}>
                    {label}
                  </p>
                  <p style={{ color: "rgba(246,247,237,0.3)", fontSize: "8px", whiteSpace: "nowrap" }}>{sub}</p>
                </motion.div>

                {/* Active indicator bar */}
                <AnimatePresence>
                  {isActive && open && (
                    <motion.div
                      className="w-1 h-4 rounded-full flex-shrink-0 relative z-10"
                      style={{ backgroundColor: C.lime }}
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0, scaleY: 0 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ── BOTTOM: CTA + status + toggle ── */}
      <div style={{ padding: "0 8px 14px 8px" }}>
        <div style={{ height: 1, backgroundColor: "rgba(246,247,237,0.08)", margin: "12px 0 12px 0" }} />

        <div className="flex flex-col gap-2">
          {session ? (
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 rounded-xl py-2 px-3 hover:bg-[rgba(246,247,237,0.1)] transition-colors text-red-400 hover:text-red-300 w-full"
              title={!open ? "Logout" : undefined}
            >
              <LogOut size={open ? 14 : 18} />
              {open && <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.05em" }}>LOGOUT</span>}
            </button>
          ) : (
            <button
              onClick={() => setIsAuthOpen(true)}
              className="flex items-center justify-center gap-2 rounded-xl py-2 px-3 transition-colors text-[rgba(246,247,237,0.7)] hover:text-[#dbe64c] hover:bg-[rgba(219,230,76,0.1)] w-full"
              style={{ border: "1px solid rgba(246,247,237,0.1)" }}
              title={!open ? "Login" : undefined}
            >
              <LogIn size={open ? 14 : 18} />
              {open && <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.05em" }}>LOGIN</span>}
            </button>
          )}

          {/* Status + Toggle */}
          <div className="flex items-center mt-1" style={{ justifyContent: "center", gap: 8, minHeight: 20 }}>
            {/* Status dot always visible */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: C.lime }}
              />
              <motion.p
                animate={{ opacity: open ? 1 : 0, width: open ? "auto" : 0 }}
                transition={{ duration: 0.3 }}
                style={{ color: "rgba(246,247,237,0.3)", fontSize: "8px", whiteSpace: "nowrap", overflow: "hidden" }}
              >
                Available for work
              </motion.p>
            </div>

          {/* Toggle button — always visible */}
          <motion.button
            onClick={onToggle}
            className="rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              width: 24,
              height: 24,
              backgroundColor: "rgba(219,230,76,0.1)",
              border: "1px solid rgba(219,230,76,0.2)",
              marginLeft: "auto",
            }}
            whileHover={{ backgroundColor: "rgba(219,230,76,0.22)", scale: 1.1 }}
            whileTap={{ scale: 0.88 }}
            title={open ? "Close panel" : "Open panel"}
          >
            <motion.div
              animate={{ rotate: open ? 0 : 180 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <ChevronLeft size={13} strokeWidth={2.5} color={C.lime} />
            </motion.div>
          </motion.button>
        </div>
        </div>
      </div>
    </motion.div>
    <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
