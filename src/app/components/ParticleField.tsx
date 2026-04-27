import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { C } from "./constants";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
}

function generateParticles(count: number): Particle[] {
  const colors = [C.lime, C.green, C.blue, C.white];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    color: colors[Math.floor(Math.random() * colors.length)],
    duration: Math.random() * 12 + 8,
    delay: Math.random() * -20,
    driftX: (Math.random() - 0.5) * 60,
    driftY: (Math.random() - 0.5) * 80,
  }));
}

const PARTICLES = generateParticles(28);

const ORBS = [
  { x: 70, y: 15, size: 280, color: C.green, opacity: 0.06, duration: 14 },
  { x: 20, y: 70, size: 220, color: C.blue, opacity: 0.07, duration: 18 },
  { x: 85, y: 75, size: 180, color: C.lime, opacity: 0.04, duration: 12 },
  { x: 45, y: 40, size: 160, color: C.green, opacity: 0.05, duration: 16 },
];

export function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Floating glowing orbs */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: orb.color,
            opacity: orb.opacity,
            filter: "blur(60px)",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -25, 15, -10, 0],
            scale: [1, 1.15, 0.9, 1.1, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2.5,
          }}
        />
      ))}

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={{
            x: [0, p.driftX, p.driftX * 0.5, 0],
            y: [0, p.driftY, p.driftY * 0.3, 0],
            opacity: [0.15, 0.6, 0.3, 0.15],
            scale: [1, 1.5, 0.8, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}

      {/* Grid lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(246,247,237,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(246,247,237,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
