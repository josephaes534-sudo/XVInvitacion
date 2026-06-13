'use client'

import { motion } from 'framer-motion'
import { IoMusicalNotes, IoAddCircle } from 'react-icons/io5'
import eventConfig from '@/config/event'

export default function Music() {
  const hasPlaylist = eventConfig.music.playlistUrl && eventConfig.music.playlistUrl.length > 0

  return (
    <section className="relative py-24 md:py-32 px-4">
      <div className="relative max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <IoMusicalNotes className="text-[#00d4ff] text-xl" />
            <span className="text-[#00d4ff]/80 text-sm tracking-[0.3em] uppercase font-light">
              M&uacute;sica
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Playlist Colaborativa
          </h2>
          <p className="text-white/40 text-sm mt-3 max-w-sm mx-auto font-light">
            Agrega tus canciones favoritas para que todos las disfrutemos en la fiesta
          </p>
        </motion.div>

        {hasPlaylist ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <a
              href={eventConfig.music.playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block glass p-8 text-center hover:bg-white/[0.06] transition-all duration-500"
            >
              <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br from-green-400/20 to-[#00d4ff]/10 border-2 border-green-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <IoMusicalNotes className="text-3xl text-green-400" />
              </div>
              <h3 className="text-white font-display text-lg mb-2">{eventConfig.music.playlistTitle || 'Ver Playlist'}</h3>
              <p className="text-white/30 text-sm mb-6">
                Da click para abrir la playlist
              </p>
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm border border-green-400/30 text-green-400/80 group-hover:text-green-400 group-hover:border-green-400/50 transition-all duration-500">
                <IoAddCircle className="text-lg" />
                Agregar Canci&oacute;n
              </span>
            </a>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass p-10 text-center"
          >
            <IoMusicalNotes className="text-5xl text-[#00d4ff]/30 mx-auto mb-5" />
            <h3 className="text-white/70 font-display text-lg mb-2">Playlist Colaborativa</h3>
            <p className="text-white/30 text-sm leading-relaxed">
              Agrega el enlace de tu playlist favorita
              <br />
              <span className="text-[#00d4ff]/50 text-xs">Configura en src/config/event.js</span>
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
