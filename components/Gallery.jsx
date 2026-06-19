'use client'

import { motion } from 'framer-motion'
import { IoImagesOutline } from 'react-icons/io5'
import eventConfig from '../config/event'

export default function Gallery() {
  const hasGoogleUrl = eventConfig.gallery.googlePhotosUrl && eventConfig.gallery.googlePhotosUrl.length > 0

  return (
    <section id="galeria" className="relative py-28 md:py-36 px-4">
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
            <span>Galería</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white">
            Nuestros Momentos
          </h2>
        </motion.div>

        {hasGoogleUrl ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="glass-card p-10 md:p-12 text-center max-w-lg mx-auto relative overflow-hidden"
          >
            <div className="relative">
              <div className="text-5xl mb-5 opacity-40">📸</div>
              <h3 className="text-xl font-display font-bold text-white mb-2">
                Álbum de Fotos
              </h3>
              <p className="text-white/75 text-sm mb-8 font-light max-w-xs mx-auto">
                ¿Tomaste fotos? Súbelas aquí para después compartirlas
              </p>
              <a
                href={eventConfig.gallery.googlePhotosUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rsvp-btn inline-flex"
              >
                <IoImagesOutline size={16} />
                <span>Ver Google Photos</span>
              </a>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="glass-card p-14 md:p-16 text-center max-w-lg mx-auto relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(41,141,148,0.01)] to-transparent pointer-events-none" />
            <div className="relative">
              <div className="text-5xl mb-5 opacity-30">📸</div>
              <h3 className="text-xl font-display font-bold text-white/60 mb-3">
                Galería de Fotos
              </h3>
              <p className="text-white/75 text-sm leading-relaxed font-light">
                Las fotos estarán disponibles pronto.
                <br />
                Conecta tu álbum de Google Photos.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
