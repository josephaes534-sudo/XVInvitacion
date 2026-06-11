'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.05), transparent)' }} />
        <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.05), transparent)' }} />
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <span className="inline-block text-[10px] md:text-xs tracking-[0.3em] uppercase text-cyan-400/60 mb-6 px-5 py-2 rounded-full border border-cyan-400/10 bg-cyan-400/5 backdrop-blur-sm">
            Beach Club &bull; Luxury
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="mb-6"
        >
          <span className="block text-2xl md:text-4xl font-light text-white/60 mb-2">
            Bienvenida al
          </span>
          <span className="block text-6xl md:text-8xl lg:text-9xl font-bold font-display bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent leading-[1.1]">
            Océano
          </span>
          <span className="block text-xl md:text-3xl font-light italic text-white/40 tracking-[0.15em] mt-2">
            de la Elegancia
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          className="text-sm md:text-base text-white/40 max-w-lg mx-auto leading-relaxed mb-10 font-light"
        >
          Donde el lujo se encuentra con el mar. Una experiencia exclusiva dise&ntilde;ada para ti.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
        >
          <a
            href="#experiencia"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm tracking-[0.15em] uppercase transition-all duration-500 border border-cyan-400/20 text-cyan-300/80 hover:text-white hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(0,212,255,0.12)] bg-gradient-to-r from-cyan-500/5 to-blue-500/5"
          >
            <span>Descubrir</span>
            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/20 to-transparent animate-pulse" />
        <span className="text-[9px] tracking-[0.25em] uppercase text-white/15">Explorar</span>
      </div>
    </section>
  )
}
