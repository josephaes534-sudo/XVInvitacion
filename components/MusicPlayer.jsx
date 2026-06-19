'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoMusicalNotes, IoVolumeMute } from 'react-icons/io5'
import eventConfig from '../config/event'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const audioRef = useRef(null)
  const startedRef = useRef(false)
  const hasSong = eventConfig.music.songUrl && eventConfig.music.songUrl.length > 0

  useEffect(() => {
    if (!hasSong) return
    const audio = new Audio(eventConfig.music.songUrl)
    audio.loop = true
    audio.volume = 0.3
    audioRef.current = audio

    audio.addEventListener('canplaythrough', () => setReady(true))

    const startOnClick = () => {
      if (startedRef.current) return
      startedRef.current = true
      audio.play().then(() => {
        setIsPlaying(true)
      }).catch(() => {})
    }

    document.addEventListener('click', startOnClick, { once: true })

    return () => {
      audio.pause()
      audio.src = ''
      document.removeEventListener('click', startOnClick)
    }
  }, [hasSong])

  const toggle = useCallback(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }, [isPlaying])

  if (!hasSong) return null

  return (
    <motion.button
      onClick={toggle}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 cursor-pointer"
      style={{
        background: isPlaying
          ? 'linear-gradient(135deg, rgba(41,141,148,0.12), rgba(41,141,148,0.06))'
          : 'rgba(255,255,255,0.03)',
        border: isPlaying
          ? '1px solid rgba(41,141,148,0.15)'
          : '1px solid rgba(255,255,255,0.06)',
        boxShadow: isPlaying
          ? '0 0 30px rgba(41,141,148,0.08), 0 4px 20px rgba(0,0,0,0.2)'
          : '0 4px 20px rgba(0,0,0,0.1)',
      }}
      title={isPlaying ? 'Pausar música' : 'Reproducir música'}
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.div
            key="playing"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="flex items-center gap-[2px]"
          >
            {[1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="w-[2px] rounded-full"
                style={{ background: 'rgba(41,141,148,0.6)' }}
                animate={{
                  height: [8, 14 + i * 4, 8],
                }}
                transition={{
                  duration: 0.6 + i * 0.15,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.1,
                }}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="paused"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <IoVolumeMute className="text-lg" style={{ color: 'rgba(255,255,255,0.3)' }} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
