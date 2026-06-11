'use client'

import { motion } from 'framer-motion'
import { IoHeart, IoArrowUp } from 'react-icons/io5'
import eventConfig from '@/config/event'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative py-16 px-4">
      <div className="absolute inset-0 bg-gradient-to-t from-[#060e1a] via-[#060e1a]/50 to-transparent pointer-events-none" />

      <div className="relative max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="glass inline-block px-8 py-6 mb-8">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
              &iexcl;Gracias por ser parte!
            </h3>
            <p className="text-white/30 text-sm max-w-sm mx-auto font-light">
              Tu presencia har&aacute; de este d&iacute;a un recuerdo inolvidable
            </p>
          </div>

          <p className="text-white/15 text-xs mb-2">
            {eventConfig.heroName}&apos;s {eventConfig.heroSubtitle}
          </p>
          <p className="text-white/10 text-xs flex items-center justify-center gap-1">
            Hecho con <IoHeart className="text-[#00d4ff]/50" /> para Hallie
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mt-8 w-12 h-12 rounded-full glass flex items-center justify-center mx-auto text-[#00d4ff] hover:bg-[#00d4ff]/10 transition-all duration-300 group"
          >
            <IoArrowUp className="group-hover:-translate-y-1 transition-transform duration-300" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  )
}
