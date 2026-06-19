'use client'

import { motion } from 'framer-motion'
import { IoArrowUp, IoHeart } from 'react-icons/io5'
import eventConfig from '../config/event'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative py-20 px-4">
      <div className="absolute inset-0 pointer-events-none" />
      <div className="relative max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="glass-card inline-block px-10 py-8 mb-8">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
              ¡Gracias por ser parte!
            </h3>
            <p className="text-white/75 text-sm max-w-sm mx-auto font-light">
              Tu presencia hará de este día un recuerdo inolvidable
            </p>
          </div>

          <p className="text-[rgba(255,255,255,0.1)] text-xs mb-2 tracking-wider">
            {eventConfig.heroName}&apos;s {eventConfig.heroSubtitle}
          </p>
          <p className="text-white/50 text-[11px] flex items-center justify-center gap-1.5">
            Hecho con <IoHeart size={11} style={{ color: 'rgba(41, 141, 148, 0.3)' }} /> para Hallie Aes
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="mt-8 w-12 h-12 rounded-full glass-card flex items-center justify-center mx-auto group cursor-pointer"
          >
            <IoArrowUp
              size={16}
              className="group-hover:-translate-y-1 transition-transform duration-300"
              style={{ color: 'rgba(41, 141, 148, 0.5)' }}
            />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  )
}
