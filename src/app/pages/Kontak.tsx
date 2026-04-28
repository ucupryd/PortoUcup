import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { C, containerVariants, itemVariants } from "../components/constants";

const contactInfo = [
  { icon: "✉️", label: "Email", value: "yusufriyadi141004@gmail.com", link: "mailto:yusufriyadi141004@gmail.com" },
  { icon: "📱", label: "WhatsApp", value: "+62 895-4228-85344", link: "https://wa.me/6289542288534" },
  { icon: "🌐", label: "Email Undip", value: "myusufriyadi@students.undip.ac.id", link: "mailto:myusufriyadi@students.undip.ac.id" },
  { icon: "📍", label: "Lokasi", value: "Semarang, Jawa Tengah", link: "#" },
];

const socialLinks = [
  { icon: "in", label: "LinkedIn", color: "#0A66C2", handle: "@myusufriyadi" },
  { icon: "gh", label: "GitHub", color: "#fff", handle: "@yusuf-riyadi" },
  { icon: "ig", label: "Instagram", color: "#E1306C", handle: "@yusufriyadi_" },
  { icon: "yt", label: "YouTube", color: "#FF0000", handle: "@yusufriyadi" },
];

const availability = [
  { day: "Senin – Jumat", time: "08.00 – 17.00 WIB", available: true },
  { day: "Sabtu", time: "09.00 – 13.00 WIB", available: true },
  { day: "Minggu", time: "Tidak tersedia", available: false },
];

type FormStatus = "idle" | "sending" | "success" | "error";

export default function Kontak() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", budget: "" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1800));
    setStatus("success");
    setTimeout(() => {
      setStatus("idle");
      setForm({ name: "", email: "", subject: "", message: "", budget: "" });
    }, 3500);
  };

  const fieldStyle = (name: string) => ({
    backgroundColor: focused === name ? "rgba(219,230,76,0.06)" : "rgba(246,247,237,0.04)",
    border: `1px solid ${focused === name ? "rgba(219,230,76,0.35)" : "rgba(246,247,237,0.1)"}`,
    color: C.white,
    fontSize: "12px",
    outline: "none",
    transition: "all 0.25s",
    width: "100%",
    borderRadius: "12px",
    padding: "10px 14px",
  });

  return (
    <div className="h-full p-1 pb-6">
      {/* Header */}
      <motion.div className="mb-5" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <span style={{ color: C.lime, fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em" }}>
            05 — KONTAK
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: "rgba(219,230,76,0.2)" }} />
        </div>
        <h1 className="uppercase" style={{ color: C.white, fontWeight: 900, fontSize: "clamp(22px, 3vw, 38px)", letterSpacing: "-0.02em" }}>
          MARI{" "}
          <motion.span
            style={{ color: C.lime }}
            animate={{ textShadow: [`0 0 20px rgba(219,230,76,0)`, `0 0 30px rgba(219,230,76,0.5)`, `0 0 20px rgba(219,230,76,0)`] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            BERKOLABORASI
          </motion.span>
        </h1>
      </motion.div>

      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1.6fr" }}>
        {/* Left: Contact Info */}
        <motion.div
          className="flex flex-col gap-4"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {/* Status card */}
          <motion.div
            className="rounded-2xl p-5 relative overflow-hidden"
            style={{ backgroundColor: C.green, boxShadow: `0 8px 32px rgba(0,128,76,0.25)` }}
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
          >
            <motion.div
              className="absolute -top-6 -right-6 w-24 h-24 rounded-full pointer-events-none"
              style={{ background: C.lime, filter: "blur(30px)", opacity: 0.12 }}
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <div className="flex items-center gap-2 mb-3">
              <motion.span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: C.lime }}
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span style={{ color: C.lime, fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em" }}>
                TERSEDIA UNTUK PROYEK
              </span>
            </div>
            <p style={{ color: C.white, fontWeight: 900, fontSize: "17px", lineHeight: 1.3 }}>
              Ada proyek IoT atau otomasi?
              <br />
              <span style={{ opacity: 0.7 }}>Mari berkolaborasi! 🚀</span>
            </p>
            <p className="mt-3" style={{ color: "rgba(246,247,237,0.6)", fontSize: "11px", lineHeight: 1.6 }}>
              Terbuka untuk proyek IoT, sistem kontrol, HMI, web development, freelance, atau diskusi teknis bersama.
            </p>
          </motion.div>

          {/* Contact details */}
          <motion.div
            className="rounded-2xl p-4"
            style={{ backgroundColor: "rgba(246,247,237,0.04)", border: "1px solid rgba(246,247,237,0.07)" }}
            variants={itemVariants}
          >
            <p className="uppercase mb-3" style={{ color: "rgba(246,247,237,0.35)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em" }}>
              KONTAK LANGSUNG
            </p>
            <div className="flex flex-col gap-2">
              {contactInfo.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.link}
                  className="flex items-center gap-3 p-2.5 rounded-xl"
                  style={{ textDecoration: "none" }}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ backgroundColor: "rgba(219,230,76,0.06)", x: 3 }}
                >
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(219,230,76,0.1)", fontSize: "14px" }}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <p style={{ color: "rgba(246,247,237,0.4)", fontSize: "8px", fontWeight: 600 }}>{item.label}</p>
                    <p style={{ color: C.white, fontSize: "11px", fontWeight: 600 }}>{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div variants={itemVariants}>
            <p className="uppercase mb-3" style={{ color: "rgba(246,247,237,0.35)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em" }}>
              MEDIA SOSIAL
            </p>
            <div className="grid grid-cols-2 gap-2">
              {socialLinks.map((s, i) => (
                <motion.button
                  key={s.label}
                  className="rounded-xl p-3 flex items-center gap-2.5 text-left"
                  style={{ backgroundColor: "rgba(246,247,237,0.04)", border: "1px solid rgba(246,247,237,0.07)" }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  whileHover={{ backgroundColor: "rgba(246,247,237,0.08)", y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${s.color}22`, border: `1px solid ${s.color}33` }}
                  >
                    <span style={{ color: s.color, fontSize: "9px", fontWeight: 900 }}>{s.icon}</span>
                  </div>
                  <div>
                    <p style={{ color: C.white, fontSize: "10px", fontWeight: 700 }}>{s.label}</p>
                    <p style={{ color: "rgba(246,247,237,0.4)", fontSize: "8px" }}>{s.handle}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Availability */}
          <motion.div
            className="rounded-2xl p-4"
            style={{ backgroundColor: C.blue, boxShadow: `0 8px 24px rgba(30,72,143,0.2)` }}
            variants={itemVariants}
          >
            <p className="uppercase mb-3" style={{ color: "rgba(246,247,237,0.5)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em" }}>
              JAM KERJA
            </p>
            {availability.map((slot, i) => (
              <div
                key={slot.day}
                className="flex items-center justify-between py-2"
                style={{ borderBottom: i < 2 ? "1px solid rgba(246,247,237,0.06)" : "none" }}
              >
                <span style={{ color: "rgba(246,247,237,0.7)", fontSize: "11px" }}>{slot.day}</span>
                <div className="flex items-center gap-2">
                  <span style={{ color: slot.available ? C.lime : "rgba(246,247,237,0.3)", fontSize: "10px" }}>
                    {slot.time}
                  </span>
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: slot.available ? C.lime : "rgba(246,247,237,0.2)" }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          className="rounded-2xl p-7 relative overflow-hidden"
          style={{ backgroundColor: "rgba(246,247,237,0.04)", border: "1px solid rgba(246,247,237,0.08)" }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          {/* BG decoration */}
          <motion.div
            className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full pointer-events-none"
            style={{ background: C.green, filter: "blur(50px)", opacity: 0.08 }}
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                className="flex flex-col items-center justify-center h-full py-16"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                  style={{ backgroundColor: C.lime, boxShadow: `0 0 40px rgba(219,230,76,0.4)` }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <span style={{ fontSize: "28px" }}>✓</span>
                </motion.div>
                <h3 style={{ color: C.white, fontWeight: 900, fontSize: "20px", textAlign: "center" }}>
                  Pesan Terkirim!
                </h3>
                <p style={{ color: "rgba(246,247,237,0.6)", fontSize: "12px", textAlign: "center", marginTop: "8px", lineHeight: 1.6 }}>
                  Terima kasih telah menghubungi saya.
                  <br />
                  Saya akan membalas dalam 24 jam.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div>
                  <p className="uppercase mb-4" style={{ color: "rgba(246,247,237,0.4)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em" }}>
                    KIRIM PESAN
                  </p>
                </div>

                <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
                  {/* Name */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <label style={{ color: "rgba(246,247,237,0.5)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>
                      NAMA LENGKAP *
                    </label>
                    <input
                      type="text"
                      placeholder="Nama Anda"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      required
                      style={fieldStyle("name")}
                    />
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label style={{ color: "rgba(246,247,237,0.5)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>
                      EMAIL *
                    </label>
                    <input
                      type="email"
                      placeholder="email@anda.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      required
                      style={fieldStyle("email")}
                    />
                  </motion.div>
                </div>

                {/* Subject */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                  <label style={{ color: "rgba(246,247,237,0.5)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>
                    SUBJEK *
                  </label>
                  <input
                    type="text"
                    placeholder="Tentang apa yang ingin didiskusikan?"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    onFocus={() => setFocused("subject")}
                    onBlur={() => setFocused(null)}
                    required
                    style={fieldStyle("subject")}
                  />
                </motion.div>

                {/* Budget */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  <label style={{ color: "rgba(246,247,237,0.5)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>
                    ESTIMASI BUDGET
                  </label>
                  <select
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    onFocus={() => setFocused("budget")}
                    onBlur={() => setFocused(null)}
                    style={{ ...fieldStyle("budget"), cursor: "pointer" }}
                  >
                    <option value="" style={{ backgroundColor: C.midnight }}>Pilih range budget...</option>
                    <option value="<5jt" style={{ backgroundColor: C.midnight }}>Di bawah Rp 5 juta</option>
                    <option value="5-15jt" style={{ backgroundColor: C.midnight }}>Rp 5 – 15 juta</option>
                    <option value="15-50jt" style={{ backgroundColor: C.midnight }}>Rp 15 – 50 juta</option>
                    <option value=">50jt" style={{ backgroundColor: C.midnight }}>Di atas Rp 50 juta</option>
                    <option value="diskusi" style={{ backgroundColor: C.midnight }}>Ingin didiskusikan</option>
                  </select>
                </motion.div>

                {/* Message */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
                  <label style={{ color: "rgba(246,247,237,0.5)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>
                    PESAN *
                  </label>
                  <textarea
                    placeholder="Ceritakan tentang proyek Anda, tujuan yang ingin dicapai, timeline, dan detail lainnya..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    required
                    rows={4}
                    style={{ ...fieldStyle("message"), resize: "none" }}
                  />
                </motion.div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-xl py-3.5 flex items-center justify-center gap-3 relative overflow-hidden"
                  style={{
                    backgroundColor: C.lime,
                    boxShadow: `0 6px 30px rgba(219,230,76,0.3)`,
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                    opacity: status === "sending" ? 0.8 : 1,
                  }}
                  whileHover={{ scale: status === "idle" ? 1.02 : 1, boxShadow: `0 8px 40px rgba(219,230,76,0.45)` }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 }}
                >
                  <AnimatePresence mode="wait">
                    {status === "sending" ? (
                      <motion.div
                        key="loading"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.div
                          className="w-4 h-4 border-2 rounded-full"
                          style={{ borderColor: `${C.midnight}44`, borderTopColor: C.midnight }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />
                        <span style={{ color: C.midnight, fontWeight: 800, fontSize: "11px" }}>Mengirim...</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <span style={{ color: C.midnight, fontWeight: 900, fontSize: "11px", letterSpacing: "0.08em" }}>
                          KIRIM PESAN
                        </span>
                        <motion.span
                          style={{ color: C.midnight, fontSize: "14px" }}
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                <p style={{ color: "rgba(246,247,237,0.3)", fontSize: "9px", textAlign: "center" }}>
                  🔒 Data Anda aman dan tidak akan dibagikan kepada pihak ketiga
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
