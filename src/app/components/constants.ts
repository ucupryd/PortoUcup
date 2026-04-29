export const C = {
  midnight: "#001F3F",
  green: "#00804C",
  lime: "#DBE64C",
  blue: "#1E488F",
  white: "#F6F7ED",
  mantis: "#3D9970",
  mantisLight: "#2E7D5E",
  mantisDeep: "#1A5C3F",
};

export const pageVariants = {
  // Only fade and de-blur the page container to avoid conflicting translate animations
  initial: { opacity: 0, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: {
    opacity: 0,
    filter: "blur(4px)",
    transition: { duration: 0.3, ease: "easeIn" as const },
  },
};

export const containerVariants = {
  animate: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

export const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export const navItems = [
  { label: "TENTANG", sub: "About", icon: "👤", path: "/tentang" },
  { label: "PENGALAMAN", sub: "Experience", icon: "💼", path: "/pengalaman" },
  { label: "KARYA", sub: "Portfolio", icon: "🎨", path: "/karya" },
  { label: "TESTIMONI", sub: "Testimonials", icon: "⭐", path: "/testimoni" },
  { label: "KONTAK", sub: "Contact", icon: "✉️", path: "/kontak" },
];
