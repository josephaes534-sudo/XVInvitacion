'use client'

import { motion } from 'framer-motion'
import { IoShirtOutline } from 'react-icons/io5'
import eventConfig from '@/config/event'

export default function DressCode() {
  const { colors, title, description } = eventConfig.dressCode

  return (
    <section id="vestimenta" className="relative py-24 md:py-32 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/0 via-royal-700/10 to-navy-900/0" />

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <IoShirtOutline className="text-electric-500 text-xl" />
            <span className="text-electric-500/80 text-sm tracking-[0.3em] uppercase font-light">
              Dress Code
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            {title}
          </h2>
          <p className="text-white/50 max-w-lg mx-auto">{description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass p-8 md:p-12 max-w-2xl mx-auto"
        >
          <p className="text-white/40 text-xs uppercase tracking-[0.2em] text-center mb-6">
            Colores sugeridos
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {colors.map((color, index) => (
              <motion.div
                key={color.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                whileHover={{ scale: 1.1, y: -4 }}
                className="flex flex-col items-center gap-3"
              >
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/20 glow-blue"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="text-center">
                  <p className="text-white text-sm font-medium">{color.name}</p>
                  <p className="text-white/30 text-xs font-mono">{color.hex}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center text-white/30 text-sm mt-8"
        >
          Vístete con los colores que más te gusten de la paleta ✨
        </motion.p>
      </div>
    </section>
  )
}
