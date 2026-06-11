'use client'

import { motion } from 'framer-motion'
import { IoImagesOutline } from 'react-icons/io5'
import { HiPhoto } from 'react-icons/hi2'
import eventConfig from '@/config/event'

export default function Gallery() {
  const hasGoogleUrl = eventConfig.gallery.googlePhotosUrl && eventConfig.gallery.googlePhotosUrl.length > 0

  return (
    <section id="galeria" className="relative py-24 md:py-32 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a1628]/60 to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <IoImagesOutline className="text-[#00d4ff] text-xl" />
            <span className="text-[#00d4ff]/80 text-sm tracking-[0.3em] uppercase font-light">
              Galer&iacute;a
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Nuestros Momentos
          </h2>
        </motion.div>

        {hasGoogleUrl ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <a
              href={eventConfig.gallery.googlePhotosUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm tracking-[0.15em] transition-all duration-500 border border-[#00d4ff]/20 text-[#00d4ff]/70 hover:text-white hover:border-[#00d4ff]/40 hover:shadow-[0_0_40px_rgba(0,212,255,0.1)] bg-gradient-to-r from-[#00d4ff]/5 to-blue-500/5"
            >
              <IoImagesOutline size={18} />
              <span>Ver Google Photos</span>
            </a>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass p-12 md:p-16 text-center max-w-lg mx-auto"
          >
            <HiPhoto className="text-6xl text-[#00d4ff]/30 mx-auto mb-6" />
            <h3 className="text-xl font-display font-bold text-white/70 mb-3">
              Galer&iacute;a de Fotos
            </h3>
            <p className="text-white/30 text-sm leading-relaxed">
              Las fotos estar&aacute;n disponibles pronto.
              <br />
              Conecta tu &aacute;lbum de Google Photos.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
