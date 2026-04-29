import { useState } from "react";
import { Outlet, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { NavPanel } from "./NavPanel";
import { ParticleField } from "./ParticleField";
import { C, pageVariants } from "./constants";

export function Layout() {
  const location = useLocation();
  const [navOpen, setNavOpen] = useState(true);

  return (
    <div
      className="w-full h-screen overflow-hidden flex relative"
      style={{
        backgroundColor: C.midnight,
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        gap: "12px",
        padding: "12px",
      }}
    >
      {/* Global particle background */}
      <ParticleField />

      {/* Left nav panel — collapses to icon-only mode */}
      <motion.div
        animate={{ width: navOpen ? 200 : 58 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        style={{ flexShrink: 0, overflow: "hidden" }}
      >
        <NavPanel open={navOpen} onToggle={() => setNavOpen((v) => !v)} />
      </motion.div>

      {/* Page content area */}
      <div className="flex-1 relative overflow-hidden h-full min-w-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={location.pathname}
            className="absolute inset-0 overflow-y-auto"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: `rgba(219,230,76,0.3) transparent`,
            }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
