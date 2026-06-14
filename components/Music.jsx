'use client'

import { motion } from 'framer-motion'
import { IoMusicalNotes } from 'react-icons/io5'
import eventConfig from '../config/event'

export default function Music() {
  const hasPlaylist = eventConfig.music.playlistUrl && eventConfig.music.playlistUrl.length > 0

  return (
    <section className="relative py-28 md:py-36 px-4">
      <div className="relative max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-10"
        >
          <div className="section-label mb-3">
            <span>Música</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-3">
            Playlist Colaborativa
          </h2>
          <p className="text-[rgba(255,255,255,0.2)] text-sm max-w-sm mx-auto font-light leading-relaxed">
            Agrega tus canciones favoritas para que todos las disfrutemos en la fiesta
          </p>
        </motion.div>

        {hasPlaylist ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <a
              href={eventConfig.music.playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block glass-card p-10 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[rgba(63,163,170,0.015)] to-transparent pointer-events-none group-hover:opacity-0 transition-opacity" />
              <div className="relative">
                <motion.div
                  className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-[rgba(63,163,170,0.05)] border border-[rgba(63,163,170,0.1)] flex items-center justify-center group-hover:scale-110 group-hover:rounded-xl transition-all duration-500"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <IoMusicalNotes className="text-3xl" style={{ color: 'rgba(63, 163, 170, 0.6)' }} />
                </motion.div>
                <h3 className="text-white font-display text-lg mb-2">
                  {eventConfig.music.playlistTitle || 'Ver Playlist'}
                </h3>
                <p className="text-[rgba(255,255,255,0.2)] text-sm mb-6 font-light">
                  Da click para abrir la playlist
                </p>
                <span className="btn-secondary inline-flex">
                  <IoMusicalNotes size={14} />
                  Agregar Canción
                </span>
              </div>
            </a>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="glass-card p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(63,163,170,0.01)] to-transparent pointer-events-none" />
            <div className="relative">
              <IoMusicalNotes className="text-5xl mx-auto mb-5" style={{ color: 'rgba(63, 163, 170, 0.2)' }} />
              <h3 className="text-white/60 font-display text-lg mb-2">Playlist Colaborativa</h3>
              <p className="text-[rgba(255,255,255,0.2)] text-sm leading-relaxed font-light">
                Agrega el enlace de tu playlist favorita
                <br />
                <span className="text-[rgba(63,163,170,0.3)] text-[10px] tracking-wider uppercase">Configura en src/config/event.js</span>
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
