'use client'

import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <section id="contacto" className="relative py-24 md:py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-900/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12 md:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-cyan-400/40">
              &bull; Contacto
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-light mt-3 leading-tight mb-4">
              Reserva tu<br />
              <span className="text-white/80">experiencia</span>
            </h2>
            <p className="text-sm md:text-base text-white/40 leading-relaxed max-w-md font-light mb-8">
              D&eacute;janos ser parte de tu historia junto al mar.
            </p>
            <a
              href="mailto:hello@xvhallie.com"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm tracking-[0.15em] transition-all duration-500 border border-cyan-400/20 text-cyan-300/80 hover:text-white hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(0,212,255,0.12)] bg-gradient-to-r from-cyan-500/5 to-blue-500/5"
            >
              hello@xvhallie.com
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex-shrink-0"
          >
            <div className="w-36 h-36 md:w-52 md:h-52 rounded-full border border-cyan-400/10 shadow-[0_0_60px_rgba(0,212,255,0.04)] animate-marine-float flex items-center justify-center" style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.05), transparent)' }}>
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border border-cyan-400/15 shadow-[inset_0_0_40px_rgba(0,212,255,0.04)] animate-glow-pulse" style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.1), transparent)' }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
