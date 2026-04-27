import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { motion } from "motion/react";
import { C, navItems } from "./constants";

export function NavPanel() {
  const navigate = useNavigate();
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  return (
    <motion.div
      className="flex flex-col h-full rounded-2xl p-5 relative overflow-hidden flex-shrink-0"
      style={{
        width: 200,
        backgroundColor: C.midnight,
        border: `1px solid rgba(246,247,237,0.08)`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(246,247,237,0.05)`,
      }}
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Glow accent */}
      <motion.div
        className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none"
        style={{
          background: C.lime,
          filter: "blur(40px)",
          transform: "translate(30%, -30%)",
          opacity: 0.08,
        }}
        animate={{ opacity: [0.06, 0.12, 0.06], scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Logo */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 cursor-pointer"
          style={{ backgroundColor: C.lime }}
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.08, rotate: 3 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-xs" style={{ color: C.midnight, fontWeight: 900 }}>PM</span>
        </motion.div>
        <p className="text-xs tracking-widest uppercase" style={{ color: C.lime, opacity: 0.85, fontSize: "9px" }}>
          PORTOFOLIO
        </p>
        <p className="text-xs tracking-widest uppercase" style={{ color: C.white, opacity: 0.4, fontSize: "9px" }}>
          SAYA
        </p>
      </motion.div>

      {/* Divider */}
      <div className="w-full h-px mb-5" style={{ backgroundColor: "rgba(246,247,237,0.08)" }} />

      {/* Nav items */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item, i) => (
          <NavLink key={item.label} to={item.path}>
            {({ isActive }) => (
              <motion.div
                onMouseEnter={() => setHoveredNav(item.label)}
                onMouseLeave={() => setHoveredNav(null)}
                className="w-full text-left rounded-xl px-3 py-2.5 flex items-center gap-2.5 cursor-pointer relative overflow-hidden"
                style={{
                  backgroundColor: isActive
                    ? "rgba(219,230,76,0.12)"
                    : hoveredNav === item.label
                    ? "rgba(246,247,237,0.04)"
                    : "transparent",
                  border: isActive ? `1px solid rgba(219,230,76,0.2)` : "1px solid transparent",
                  transition: "background-color 0.2s, border-color 0.2s",
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.4 }}
                whileHover={{ x: 2 }}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{ background: `linear-gradient(135deg, rgba(219,230,76,0.06), transparent)` }}
                    layoutId="nav-active-bg"
                    transition={{ duration: 0.3 }}
                  />
                )}
                <span
                  className="text-xs flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center relative z-10"
                  style={{
                    backgroundColor: isActive ? C.lime : "rgba(246,247,237,0.06)",
                    fontSize: "10px",
                    transition: "background-color 0.2s",
                  }}
                >
                  {item.icon}
                </span>
                <div className="relative z-10">
                  <p
                    style={{
                      color: isActive ? C.lime : hoveredNav === item.label ? C.white : "rgba(246,247,237,0.6)",
                      fontWeight: isActive ? 700 : 500,
                      fontSize: "10px",
                      letterSpacing: "0.08em",
                      transition: "color 0.2s",
                    }}
                  >
                    {item.label}
                  </p>
                  <p style={{ color: "rgba(246,247,237,0.3)", fontSize: "8px" }}>{item.sub}</p>
                </div>
                {isActive && (
                  <motion.div
                    className="ml-auto w-1 h-4 rounded-full"
                    style={{ backgroundColor: C.lime }}
                    layoutId="nav-indicator"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Contact button */}
      <motion.div
        className="mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="w-full h-px mb-4" style={{ backgroundColor: "rgba(246,247,237,0.08)" }} />
        <motion.button
          className="w-full rounded-xl py-2.5 px-3 flex items-center justify-center gap-2"
          style={{
            backgroundColor: C.lime,
            boxShadow: `0 4px 20px rgba(219,230,76,0.25)`,
          }}
          onClick={() => navigate("/kontak")}
          whileHover={{
            scale: 1.03,
            boxShadow: `0 6px 28px rgba(219,230,76,0.4)`,
          }}
          whileTap={{ scale: 0.97 }}
        >
          <span
            className="tracking-widest uppercase"
            style={{ color: C.midnight, fontWeight: 800, fontSize: "9px" }}
          >
            HUBUNGI SAYA
          </span>
          <span style={{ color: C.midnight, fontSize: "11px" }}>→</span>
        </motion.button>

        {/* Status indicator */}
        <div className="flex items-center justify-center gap-1.5 mt-3">
          <motion.span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: C.lime }}
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <p style={{ color: "rgba(246,247,237,0.3)", fontSize: "8px" }}>Tersedia untuk proyek</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
