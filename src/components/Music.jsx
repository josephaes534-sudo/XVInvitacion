'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { IoMusicalNotes, IoPlay, IoPause } from 'react-icons/io5'
import eventConfig from '@/config/event'

export default function Music() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef(null)
  const hasSong = eventConfig.music.songUrl && eventConfig.music.songUrl.length > 0

  useEffect(() => {
    if (!hasSong) return
    audioRef.current = new Audio(eventConfig.music.songUrl)
    audioRef.current.loop = true

    const audio = audioRef.current
    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }

    audio.addEventListener('timeupdate', updateProgress)
    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
      audio.pause()
      audio.src = ''
    }
  }, [hasSong])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <section className="relative py-24 md:py-32 px-4">
      <div className="absolute inset-0 pointer-events-none" />

      <div className="relative max-w-md mx-auto">
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
            Ambient Musical
          </h2>
        </motion.div>

        {hasSong ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass p-8 text-center"
          >
            <motion.div
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={isPlaying ? { duration: 8, repeat: Infinity, ease: 'linear' } : {}}
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#00d4ff]/20 to-royal-500/20 border-2 border-[#00d4ff]/30 flex items-center justify-center"
            >
              <IoMusicalNotes className={`text-3xl ${isPlaying ? 'text-[#00d4ff]' : 'text-white/40'}`} />
            </motion.div>

            <h3 className="text-white font-display text-lg mb-1">{eventConfig.music.songTitle}</h3>
            <p className="text-white/30 text-sm mb-6">{eventConfig.music.artist}</p>

            <div className="w-full h-1 bg-white/10 rounded-full mb-6 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#00d4ff] to-[#40e0ff] rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            <button
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-[#00d4ff]/20 border border-[#00d4ff]/30 flex items-center justify-center mx-auto hover:bg-[#00d4ff]/30 transition-all duration-300 group"
            >
              {isPlaying ? (
                <IoPause className="text-2xl text-[#00d4ff] group-hover:scale-110 transition-transform" />
              ) : (
                <IoPlay className="text-2xl text-[#00d4ff] ml-1 group-hover:scale-110 transition-transform" />
              )}
            </button>

            <p className="text-white/20 text-xs mt-4">
              {isPlaying ? 'Reproduciendo...' : 'Presiona play para ambientar'}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass p-8 text-center"
          >
            <IoMusicalNotes className="text-5xl text-[#00d4ff]/30 mx-auto mb-4" />
            <p className="text-white/30 text-sm">
              Agrega una canci&oacute;n en el archivo de configuraci&oacute;n
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
