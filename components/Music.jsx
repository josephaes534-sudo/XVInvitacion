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
          <p className="text-white/75 text-sm max-w-sm mx-auto font-light leading-relaxed">
            Agrega tus canciones favoritas para que todos las disfrutemos en la fiesta
          </p>
        </motion.div>

        {hasPlaylist ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="glass-card p-10 md:p-12 text-center max-w-lg mx-auto relative overflow-hidden"
          >
            <div className="relative">
              <div className="text-5xl mb-5 opacity-40">🎵</div>
              <h3 className="text-xl font-display font-bold text-white mb-2">
                {eventConfig.music.playlistTitle || 'Playlist Colaborativa'}
              </h3>
              <p className="text-white/75 text-sm mb-8 font-light max-w-xs mx-auto">
                Agrega tus canciones favoritas y disfruta la playlist de la fiesta
              </p>
              <a
                href={eventConfig.music.playlistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rsvp-btn inline-flex"
              >
                <IoMusicalNotes size={16} />
                <span>Abrir en Spotify</span>
              </a>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="glass-card p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(41,141,148,0.01)] to-transparent pointer-events-none" />
            <div className="relative">
              <IoMusicalNotes className="text-5xl mx-auto mb-5" style={{ color: 'rgba(41, 141, 148, 0.2)' }} />
              <h3 className="text-white/60 font-display text-lg mb-2">Playlist Colaborativa</h3>
              <p className="text-white/75 text-sm leading-relaxed font-light">
                Agrega el enlace de tu playlist favorita
                <br />
                <span className="text-[rgba(41,141,148,0.3)] text-[10px] tracking-wider uppercase">Configura en src/config/event.js</span>
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
