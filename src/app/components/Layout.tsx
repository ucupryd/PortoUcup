import { useEffect, useState, Suspense } from "react";
import { Outlet, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { NavPanel } from "./NavPanel";
import { ParticleField } from "./ParticleField";
import { C, pageVariants } from "./constants";

function PageFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: `${C.lime} transparent ${C.lime} ${C.lime}` }} />
        <span className="text-xs tracking-widest uppercase text-white/50 font-mono">Memuat...</span>
      </div>
    </div>
  );
}

export function Layout() {
  const location = useLocation();
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(() => (typeof window !== "undefined" ? window.innerWidth <= 767 : false));

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const matches = (e as any).matches ?? mq.matches;
      setIsMobile(matches);
      if (matches) setNavOpen(false);
    };
    setIsMobile(mq.matches);
    if (mq.matches) setNavOpen(false);
    if (mq.addEventListener) mq.addEventListener("change", onChange as any);
    else mq.addListener(onChange as any);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange as any);
      else mq.removeListener(onChange as any);
    };
  }, []);

  return (
    <div
      className={`app-root w-full h-screen overflow-hidden flex relative ${navOpen ? "nav-open" : ""}`}
      style={{
        backgroundColor: C.midnight,
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        gap: "12px",
        padding: "12px",
      }}
    >
      {/* Mobile open button */}
      <button
        className="mobile-nav-toggle"
        aria-label="Open navigation"
        onClick={() => setNavOpen(true)}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 6h18M3 12h18M3 18h18" stroke={C.white} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Backdrop for mobile when nav is open */}
      <div className={`mobile-backdrop ${navOpen ? "visible" : ""}`} onClick={() => setNavOpen(false)} />
      {/* Global particle background */}
      <ParticleField />

      {/* Left nav panel — collapses to icon-only mode */}
      <motion.div
        className="nav-wrapper"
        animate={isMobile ? {} : { width: navOpen ? 200 : 58 }}
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
            <Suspense fallback={<PageFallback />}>
              <Outlet />
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
