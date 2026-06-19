"use client";

import { motion } from "framer-motion";

export default function OceanBubbles() {
  const bubbles = Array.from({ length: 14 });

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
      {bubbles.map((_, i) => {
        const size = Math.random() * 55 + 15;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              bottom: `-${size}px`,
              background: `
                radial-gradient(
                  circle at 30% 30%,
                  rgba(255,255,255,.18),
                  rgba(248,216,106,.08) 45%,
                  rgba(248,216,106,.03) 70%,
                  transparent 100%
                )
              `,
              border: "2px solid rgba(248,216,106,.65)",
              boxShadow: `
                inset 4px 4px 10px rgba(255,255,255,.25),
                inset -4px -4px 10px rgba(248,216,106,.15),
                0 0 12px rgba(248,216,106,.25),
                0 0 20px rgba(248,216,106,.15)
              `,
            }}
            initial={{ y: 0, x: 0, opacity: 0 }}
            animate={{
              y: -2200,
              x: [0, Math.random() * 40 - 20, Math.random() * 60 - 30],
              opacity: [0, 0.9, 0.9, 0],
            }}
            transition={{
              duration: 18 + Math.random() * 12,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 15,
            }}
          />
        );
      })}
    </div>
  );
}
