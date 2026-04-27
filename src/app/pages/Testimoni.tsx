import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { C, containerVariants, itemVariants } from "../components/constants";

const testimonials = [
  {
    id: 1,
    name: "Andi Pratama",
    role: "CEO",
    company: "Startup Alpha",
    avatar: "A",
    color: C.green,
    rating: 5,
    text: "Alex benar-benar mengubah cara kami melihat produk kami. Desain yang dihasilkan tidak hanya indah secara visual, tapi juga meningkatkan konversi kami hingga 120%. Sangat merekomendasikan untuk proyek apapun!",
    project: "Platform B2B Redesign",
    year: "2024",
  },
  {
    id: 2,
    name: "Sari Dewi",
    role: "CMO",
    company: "TechVision",
    avatar: "S",
    color: C.blue,
    rating: 5,
    text: "Profesionalisme dan pemahaman mendalam tentang kebutuhan bisnis yang jarang saya temukan. Alex tidak hanya mendesain, tapi juga memberikan strategi yang solid. Kami menjadi klien langganan!",
    project: "Brand Identity & Digital Strategy",
    year: "2024",
  },
  {
    id: 3,
    name: "Budi Santoso",
    role: "Product Manager",
    company: "GoTech Solutions",
    avatar: "B",
    color: C.mantis,
    rating: 5,
    text: "Kami bekerja bersama selama 2 tahun dan setiap proyek selalu melampaui ekspektasi. NPS kami naik dari 42 ke 71 berkat pendekatan user-centered yang konsisten diterapkan Alex.",
    project: "Mobile App UX Overhaul",
    year: "2023",
  },
  {
    id: 4,
    name: "Rini Lestari",
    role: "Founder",
    company: "Nusantara Brew",
    avatar: "R",
    color: "#F59E0B",
    rating: 5,
    text: "Brand identity yang diciptakan Alex benar-benar menangkap esensi dari visi kami. Sekarang merek kami dikenal di 50 kota dan identitasnya tetap konsisten di semua touchpoint. Luar biasa!",
    project: "Complete Brand Identity",
    year: "2023",
  },
  {
    id: 5,
    name: "Hendro Wijaya",
    role: "CTO",
    company: "DataPulse",
    avatar: "H",
    color: C.lime,
    rating: 5,
    text: "Kemampuan Alex dalam menerjemahkan data yang kompleks menjadi visualisasi yang intuitif sungguh memukau. Dashboard yang dibuat menjadi standar baru di industri kami.",
    project: "Analytics Dashboard Design",
    year: "2023",
  },
  {
    id: 6,
    name: "Maya Putri",
    role: "Head of Education",
    company: "EduPath",
    avatar: "M",
    color: "#EC4899",
    rating: 5,
    text: "Pendekatan empatik Alex terhadap pengguna kami yang muda sangat terasa di setiap keputusan desain. Engagement rate kami naik 65% setelah redesign.",
    project: "EdTech Platform Design",
    year: "2022",
  },
];

const stats = [
  { num: "30+", label: "Klien Puas", icon: "😊" },
  { num: "4.9", label: "Rating Rata-rata", icon: "⭐" },
  { num: "98%", label: "Repeat Client", icon: "🔄" },
  { num: "100%", label: "On-Time Delivery", icon: "⏰" },
];

function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [target]);

  return <>{count}</>;
}

export default function Testimoni() {
  const [featured, setFeatured] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFeatured((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const featuredTestimonial = testimonials[featured];

  return (
    <div className="h-full p-1 pb-6">
      {/* Header */}
      <motion.div className="mb-5" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <span style={{ color: C.lime, fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em" }}>
            04 — TESTIMONI
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: "rgba(219,230,76,0.2)" }} />
        </div>
        <h1 className="uppercase" style={{ color: C.white, fontWeight: 900, fontSize: "clamp(22px, 3vw, 38px)", letterSpacing: "-0.02em" }}>
          KATA{" "}
          <motion.span
            style={{ color: C.lime }}
            animate={{ textShadow: [`0 0 20px rgba(219,230,76,0)`, `0 0 30px rgba(219,230,76,0.5)`, `0 0 20px rgba(219,230,76,0)`] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            MEREKA
          </motion.span>
        </h1>
      </motion.div>

      {/* Stats row */}
      <motion.div
        className="grid grid-cols-4 gap-3 mb-5"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="rounded-2xl p-4 text-center relative overflow-hidden"
            style={{ backgroundColor: i % 2 === 0 ? C.green : C.blue, boxShadow: `0 8px 24px rgba(0,0,0,0.2)` }}
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -2 }}
          >
            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 rounded-full pointer-events-none"
              style={{ background: C.lime, filter: "blur(20px)", opacity: 0.1 }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 4 + i, repeat: Infinity }}
            />
            <span style={{ fontSize: "18px" }}>{stat.icon}</span>
            <p style={{ color: C.lime, fontWeight: 900, fontSize: "22px", lineHeight: 1, marginTop: "4px" }}>
              {stat.num}
            </p>
            <p style={{ color: "rgba(246,247,237,0.6)", fontSize: "9px", marginTop: "2px" }}>{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-4" style={{ gridTemplateColumns: "1.4fr 1fr" }}>
        {/* Featured testimonial */}
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={featured}
              className="rounded-2xl p-7 relative overflow-hidden flex-1"
              style={{
                backgroundColor: featuredTestimonial.color === C.lime ? C.mantis : featuredTestimonial.color,
                boxShadow: `0 12px 40px ${featuredTestimonial.color}33`,
                minHeight: 240,
              }}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="absolute -top-8 -right-8 w-40 h-40 rounded-full pointer-events-none"
                style={{ background: C.lime, filter: "blur(50px)", opacity: 0.1 }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              {/* Quote mark */}
              <span
                className="absolute top-5 right-6 pointer-events-none select-none"
                style={{ color: "rgba(246,247,237,0.06)", fontSize: "80px", fontFamily: "Georgia, serif", lineHeight: 1 }}
              >
                "
              </span>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: featuredTestimonial.rating }).map((_, i) => (
                  <motion.span
                    key={i}
                    style={{ fontSize: "14px" }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    ⭐
                  </motion.span>
                ))}
              </div>

              <p style={{ color: C.white, fontSize: "13px", lineHeight: 1.75, fontStyle: "italic", opacity: 0.9 }}>
                "{featuredTestimonial.text}"
              </p>

              <div className="flex items-center gap-3 mt-5">
                <motion.div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: C.lime, boxShadow: `0 4px 12px rgba(219,230,76,0.3)` }}
                  whileHover={{ rotate: 5 }}
                >
                  <span style={{ color: C.midnight, fontWeight: 900, fontSize: "16px" }}>{featuredTestimonial.avatar}</span>
                </motion.div>
                <div>
                  <p style={{ color: C.white, fontWeight: 800, fontSize: "13px" }}>{featuredTestimonial.name}</p>
                  <p style={{ color: "rgba(246,247,237,0.6)", fontSize: "10px" }}>
                    {featuredTestimonial.role}, {featuredTestimonial.company}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <span
                    className="px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: "rgba(0,31,63,0.25)", color: C.lime, fontSize: "8px", fontWeight: 700 }}
                  >
                    {featuredTestimonial.project}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-2">
            {testimonials.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setFeatured(i)}
                className="rounded-full"
                style={{
                  width: i === featured ? 24 : 6,
                  height: 6,
                  backgroundColor: i === featured ? C.lime : "rgba(246,247,237,0.2)",
                  transition: "width 0.3s",
                }}
                whileHover={{ scale: 1.3 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Testimonial list */}
        <motion.div
          className="flex flex-col gap-3"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              className="rounded-xl p-4 cursor-pointer relative overflow-hidden"
              style={{
                backgroundColor: i === featured ? "rgba(219,230,76,0.08)" : "rgba(246,247,237,0.04)",
                border: i === featured ? `1px solid rgba(219,230,76,0.2)` : "1px solid rgba(246,247,237,0.06)",
                transition: "all 0.3s",
              }}
              variants={itemVariants}
              onClick={() => setFeatured(i)}
              whileHover={{
                backgroundColor: "rgba(219,230,76,0.05)",
                borderColor: "rgba(219,230,76,0.15)",
                x: 3,
              }}
            >
              {i === featured && (
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-xl"
                  style={{ backgroundColor: C.lime }}
                  layoutId="active-testimonial-bar"
                />
              )}
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: t.color === C.lime ? C.mantis : t.color }}
                >
                  <span style={{ color: C.white, fontWeight: 900, fontSize: "12px" }}>{t.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ color: C.white, fontWeight: 700, fontSize: "11px" }}>{t.name}</p>
                  <p style={{ color: "rgba(246,247,237,0.45)", fontSize: "9px" }}>{t.role}, {t.company}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} style={{ fontSize: "8px" }}>⭐</span>
                  ))}
                </div>
              </div>
              <p className="mt-2 line-clamp-2" style={{ color: "rgba(246,247,237,0.55)", fontSize: "10px", lineHeight: 1.5 }}>
                "{t.text}"
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
