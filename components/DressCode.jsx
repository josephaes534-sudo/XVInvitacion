'use client'

import { motion } from 'framer-motion'
import eventConfig from '../config/event'

const colors = [
  { hex: '#D96B4A', name: 'Coral' },
  { hex: '#A8B8A0', name: 'Verde Salvia' },
  { hex: '#C9DDE0', name: 'Azul Perla' },
  { hex: '#EFE4CF', name: 'Marfil' },
  { hex: '#E7D59B', name: 'Beige' },
]

export default function DressCode() {
  return (
    <section id="vestimenta" className="relative py-28 md:py-36 px-4">
      <div className="absolute inset-0 pointer-events-none" />
      <div className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-14"
        >
          <div className="section-label mb-3">
            <span>Dress Code</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            {eventConfig.dressCode.title}
          </h2>
          <p className="text-white/75 max-w-lg mx-auto font-light leading-relaxed text-sm md:text-base">
            {eventConfig.dressCode.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          className="glass-card p-8 md:p-12 max-w-2xl mx-auto relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,255,255,0.02)] to-transparent pointer-events-none" />
          <div className="relative">
            <p className="text-white/50 text-[10px] uppercase tracking-[0.3em] text-center mb-6 font-medium">
              {eventConfig.dressCode.note}
            </p>
            <h3 className="text-white/80 text-lg md:text-xl font-display font-semibold text-center mb-8">
              Colores sugeridos
            </h3>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {colors.map((color, index) => (
                <motion.div
                  key={color.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center gap-3 group"
                >
                  <div className="relative">
                    <motion.div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full cursor-pointer relative overflow-hidden"
                      style={{ backgroundColor: color.hex }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 70%)',
                        }}
                      />
                    </motion.div>
                  </div>
                  <span className="text-white/75 text-[11px] font-medium tracking-wider">
                    {color.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
