import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { C, containerVariants, itemVariants } from "../components/constants";
import { Instagram, Linkedin, Github, Youtube, Phone, Mail, MapPin, GraduationCap } from "lucide-react";

const availability = [
  { day: "Mon – Fri", time: "08:00 – 17:00", available: true },
  { day: "Saturday", time: "09:00 – 13:00", available: true },
  { day: "Sunday", time: "Not available", available: false },
];

type FormStatus = "idle" | "sending" | "success" | "error";

// ── LinksCard component (referensi UI card dengan efek hover fan) ──
const LinksCard = ({ id, title, bgGradient, items }: {
  id: string;
  title: string;
  bgGradient: string;
  items: { link: string; icon: React.ReactNode; hoverBg: string }[];
}) => (
  <div className={`lc-wrap lc-${id}`} style={{ width: "100%" }}>
    <div className="lc-card">
      <div className="lc-bg" style={{ background: bgGradient }} />
      <div className="lc-logo">{title}</div>
      {items.map((item, i) =>
        item.link !== "#" ? (
          <a key={i} href={item.link} target="_blank" rel="noopener noreferrer">
            <div className={`lc-box lc-box${i + 1}`}>
              <span className="lc-icon">{item.icon}</span>
            </div>
          </a>
        ) : (
          <div key={i} className={`lc-box lc-box${i + 1}`}>
            <span className="lc-icon">{item.icon}</span>
          </div>
        )
      )}
    </div>
    <style>{`
      .lc-wrap { display:flex; justify-content:center; align-items:center; }
      .lc-card {
        position:relative; width:100%; aspect-ratio:1;
        border-radius:22px; overflow:hidden;
        box-shadow:rgba(0,0,0,0.25) 0px 8px 28px;
        transition:all 0.7s cubic-bezier(.4,0,.2,1);
        border:1px solid rgba(255,255,255,0.1);
      }
      .lc-bg { position:absolute; inset:0; opacity:0.95; transition:opacity 0.5s; }
      .lc-card:hover .lc-bg { opacity:1; }
      .lc-logo {
        position:absolute; right:50%; bottom:50%;
        transform:translate(50%,50%);
        transition:all 0.55s cubic-bezier(.4,0,.2,1);
        font-size:clamp(0.95rem,1.8vw,1.3rem);
        font-weight:800; color:#fff; letter-spacing:0.15em;
        z-index:10; pointer-events:none;
      }
      .lc-icon {
        display:inline-flex; align-items:center; justify-content:center;
        width:22px; height:22px;
      }
      .lc-icon svg {
        stroke:rgba(255,255,255,0.75); fill:none;
        width:100%; height:100%; transition:all 0.45s ease;
      }
      .lc-box {
        position:absolute; padding:12px;
        display:flex; justify-content:flex-end; align-items:flex-start;
        background:rgba(255,255,255,0.12); backdrop-filter:blur(6px);
        border-top:1px solid rgba(255,255,255,0.35);
        border-right:1px solid rgba(255,255,255,0.35);
        border-radius:10% 13% 42% 0%/10% 12% 75% 0%;
        box-shadow:rgba(0,0,0,0.18) -6px 6px 18px;
        transform-origin:bottom left;
        transition:all 0.75s cubic-bezier(.4,0,.2,1);
      }
      .lc-box::before {
        content:""; position:absolute; inset:0;
        border-radius:inherit; opacity:0;
        transition:opacity 0.45s ease;
      }
      .lc-box:hover svg { stroke:#fff; filter:drop-shadow(0 0 5px #fff); transform:scale(1.1); }
      .lc-box1 { width:82%; height:82%; bottom:-80%; left:-80%; }
      .lc-box1:hover::before { opacity:1; }
      .lc-box2 { width:62%; height:62%; bottom:-60%; left:-60%; transition-delay:0.08s; }
      .lc-box2:hover::before { opacity:1; }
      .lc-box3 { width:42%; height:42%; bottom:-40%; left:-40%; transition-delay:0.16s; }
      .lc-box3:hover::before { opacity:1; }
      .lc-box4 { width:22%; height:22%; bottom:-20%; left:-20%; transition-delay:0.24s; }
      .lc-box4:hover::before { opacity:1; }
      .lc-card:hover { transform:scale(1.03); box-shadow:rgba(0,0,0,0.35) 0px 14px 40px; }
      .lc-card:hover .lc-box { bottom:-1px; left:-1px; }
      .lc-card:hover .lc-logo { transform:translate(40%, -65%); letter-spacing:0px; font-size:clamp(0.75rem,1.3vw,1rem); }
      .lc-${id} .lc-box1::before { background:${items[0]?.hoverBg}; }
      .lc-${id} .lc-box2::before { background:${items[1]?.hoverBg}; }
      .lc-${id} .lc-box3::before { background:${items[2]?.hoverBg}; }
      .lc-${id} .lc-box4::before { background:${items[3]?.hoverBg}; }
    `}</style>
  </div>
);

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
            05 — CONTACT
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: "rgba(219,230,76,0.2)" }} />
        </div>
        <h1 className="uppercase" style={{ color: C.white, fontWeight: 900, fontSize: "clamp(22px, 3vw, 38px)", letterSpacing: "-0.02em" }}>
          LET'S{" "}
          <span style={{ color: C.lime }}>
            COLLABORATE
          </span>
        </h1>
      </motion.div>

      <div className="grid md:grid-cols-[1fr_1.6fr] gap-6">
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
            <div
              className="absolute -top-6 -right-6 w-24 h-24 rounded-full pointer-events-none"
              style={{ background: `radial-gradient(circle, ${C.lime} 0%, transparent 70%)`, opacity: 0.15 }}
            />
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: C.lime }}
              />
              <span style={{ color: C.lime, fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em" }}>
                AVAILABLE FOR WORK
              </span>
            </div>
            <p style={{ color: C.white, fontWeight: 900, fontSize: "17px", lineHeight: 1.3 }}>
              Have an IoT or automation project?
              <br />
              <span style={{ opacity: 0.7 }}>Let's collaborate! 🚀</span>
            </p>
            <p className="mt-3" style={{ color: "rgba(246,247,237,0.6)", fontSize: "11px", lineHeight: 1.6 }}>
              Open for IoT projects, control systems, HMI, web development, freelance, or technical discussions.
            </p>
          </motion.div>

          {/* Social & Contact Cards */}
          <motion.div className="grid grid-cols-2 gap-3" variants={itemVariants}>
            <LinksCard
              id="socials"
              title="Socials"
              bgGradient={`linear-gradient(135deg, ${C.blue} 0%, ${C.midnight} 100%)`}
              items={[
                { link: "https://www.youtube.com/@MECHUP14", icon: <Youtube />, hoverBg: "radial-gradient(circle at 30% 107%, #ff0000 0%, #cc0000 90%)" },
                { link: "https://www.linkedin.com/in/m-yusuf-riyadi-661535386", icon: <Linkedin />, hoverBg: "radial-gradient(circle at 30% 107%, #0077b5 0%, #005582 90%)" },
                { link: "https://github.com/ucupryd", icon: <Github />, hoverBg: "radial-gradient(circle at 30% 107%, #333 0%, #111 90%)" },
                { link: "https://www.instagram.com/ucup_ryd/", icon: <Instagram />, hoverBg: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #ff53d4 60%, #62c2fe 90%)" },
              ]}
            />
            <LinksCard
              id="contacts"
              title="Contact"
              bgGradient={`linear-gradient(135deg, ${C.green} 0%, ${C.mantisLight} 100%)`}
              items={[
                { link: "mailto:myusufriyadi@students.undip.ac.id", icon: <GraduationCap />, hoverBg: "radial-gradient(circle at 30% 107%, #4CAF50 0%, #2E7D32 90%)" },
                { link: "mailto:yusufriyadi141004@gmail.com", icon: <Mail />, hoverBg: "radial-gradient(circle at 30% 107%, #ea4335 0%, #c5221f 90%)" },
                { link: "https://wa.me/62895422885344", icon: <Phone />, hoverBg: "radial-gradient(circle at 30% 107%, #25D366 0%, #128C7E 90%)" },
                { link: "#", icon: <MapPin />, hoverBg: "radial-gradient(circle at 30% 107%, #FF9800 0%, #E65100 90%)" },
              ]}
            />
          </motion.div>

          {/* Availability */}
          <motion.div
            className="rounded-2xl p-4"
            style={{ backgroundColor: C.blue, boxShadow: `0 8px 24px rgba(30,72,143,0.2)` }}
            variants={itemVariants}
          >
            <p className="uppercase mb-3" style={{ color: "rgba(246,247,237,0.5)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em" }}>
              WORKING HOURS
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
          <div
            className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${C.green} 0%, transparent 70%)`, opacity: 0.15 }}
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
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                  style={{ backgroundColor: C.lime, boxShadow: `0 0 40px rgba(219,230,76,0.4)` }}
                >
                  <span style={{ fontSize: "28px" }}>✓</span>
                </div>
                <h3 style={{ color: C.white, fontWeight: 900, fontSize: "20px", textAlign: "center" }}>
                  Message Sent!
                </h3>
                <p style={{ color: "rgba(246,247,237,0.6)", fontSize: "12px", textAlign: "center", marginTop: "8px", lineHeight: 1.6 }}>
                  Thank you for reaching out.
                  <br />
                  I will reply within 24 hours.
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
                    SEND MESSAGE
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
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
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
                      placeholder="your@email.com"
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
                    SUBJECT *
                  </label>
                  <input
                    type="text"
                    placeholder="What do you want to discuss?"
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
                    BUDGET ESTIMATE
                  </label>
                  <select
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    onFocus={() => setFocused("budget")}
                    onBlur={() => setFocused(null)}
                    style={{ ...fieldStyle("budget"), cursor: "pointer" }}
                  >
                    <option value="" style={{ backgroundColor: C.midnight }}>Select budget range...</option>
                    <option value="<5jt" style={{ backgroundColor: C.midnight }}>Under Rp 5 million</option>
                    <option value="5-15jt" style={{ backgroundColor: C.midnight }}>Rp 5 – 15 million</option>
                    <option value="15-50jt" style={{ backgroundColor: C.midnight }}>Rp 15 – 50 million</option>
                    <option value=">50jt" style={{ backgroundColor: C.midnight }}>Over Rp 50 million</option>
                    <option value="diskusi" style={{ backgroundColor: C.midnight }}>To be discussed</option>
                  </select>
                </motion.div>

                {/* Message */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
                  <label style={{ color: "rgba(246,247,237,0.5)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>
                    MESSAGE *
                  </label>
                  <textarea
                    placeholder="Tell me about your project, goals, timeline, and other details..."
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
                        <span style={{ color: C.midnight, fontWeight: 800, fontSize: "11px" }}>Sending...</span>
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
                          SEND MESSAGE
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
                  🔒 Your data is secure and will not be shared with third parties
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
