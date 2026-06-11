'use client'

import { motion } from 'framer-motion'
import { HiSparkles } from 'react-icons/hi2'

const cards = [
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10">
        <path d="M32 4L40 20L56 22L44 34L48 50L32 42L16 50L20 34L8 22L24 20L32 4Z" fill="currentColor" opacity="0.15"/>
        <path d="M32 4L40 20L56 22L44 34L48 50L32 42L16 50L20 34L8 22L24 20L32 4Z" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Elegancia Marina',
    text: 'Cada detalle inspirado en la profundidad y belleza del océano.',
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10">
        <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M32 12V32L44 44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.3"/>
      </svg>
    ),
    title: 'Atardeceres Únicos',
    text: 'Momentos mágicos donde el sol se funde con el horizonte marino.',
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10">
        <path d="M12 44C12 44 20 32 32 32C44 32 52 44 52 44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 52C8 52 18 38 32 38C46 38 56 52 56 52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="32" cy="20" r="8" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Lujo y Confort',
    text: 'Una experiencia premium diseñada para los sentidos más exigentes.',
  },
]

export default function About() {
  return (
    <section id="experiencia" className="relative py-24 md:py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-16 md:mb-20">
          <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-cyan-400/40">
            &bull; Experiencia
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-light mt-3 leading-tight">
            Un destino donde el<br />
            <span className="text-white/80">océano abraza el alma</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: 'easeOut' }}
              className="group p-8 rounded-2xl transition-all duration-500 border border-white/5 hover:border-cyan-400/15 bg-gradient-to-br from-white/[0.02] to-transparent hover:from-cyan-500/[0.04] hover:shadow-[0_0_40px_rgba(0,212,255,0.04)]"
            >
              <div className="text-cyan-400/60 mb-6 group-hover:text-cyan-300/80 transition-colors duration-500">
                {card.icon}
              </div>
              <h3 className="font-display text-xl font-medium text-white/80 mb-3 group-hover:text-white transition-colors duration-500">
                {card.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed font-light">
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
