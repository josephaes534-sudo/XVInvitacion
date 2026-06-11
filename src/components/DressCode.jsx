'use client'

import { motion } from 'framer-motion'
import { IoShirtOutline } from 'react-icons/io5'
import eventConfig from '@/config/event'

export default function DressCode() {
  return (
    <section id="vestimenta" className="relative py-24 md:py-32 px-4">
      <div className="absolute inset-0 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <IoShirtOutline className="text-[#00d4ff] text-xl" />
            <span className="text-[#00d4ff]/80 text-sm tracking-[0.3em] uppercase font-light">
              Dress Code
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            {eventConfig.dressCode.title}
          </h2>
          <p className="text-white/40 max-w-lg mx-auto font-light">
            {eventConfig.dressCode.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass p-8 md:p-12 max-w-2xl mx-auto"
        >
          <p className="text-white/30 text-xs uppercase tracking-[0.2em] text-center mb-4">
            {eventConfig.dressCode.note}
          </p>
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/20 glow-blue" style={{ backgroundColor: '#f5f0e8' }} />
                <span className="text-white/50 text-xs mt-2">Beige / Crema</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/20 glow-blue" style={{ backgroundColor: '#e8d5c4' }} />
                <span className="text-white/50 text-xs mt-2">Camel</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/20 glow-blue" style={{ backgroundColor: '#f0e6d3' }} />
                <span className="text-white/50 text-xs mt-2">Champagne</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/20 glow-blue" style={{ backgroundColor: '#c0c0c0' }} />
                <span className="text-white/50 text-xs mt-2">Plateado</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/20 glow-blue" style={{ backgroundColor: '#ffd700' }} />
                <span className="text-white/50 text-xs mt-2">Dorado</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
