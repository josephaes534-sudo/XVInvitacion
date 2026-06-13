'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { IoMusicalNotes, IoVolumeMute } from 'react-icons/io5'
import eventConfig from '@/config/event'

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
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110"
      style={{
        background: isPlaying ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(0,212,255,0.2)',
        boxShadow: isPlaying ? '0 0 20px rgba(0,212,255,0.15)' : 'none',
      }}
      title={isPlaying ? 'Pausar m\u00fasica' : 'Reproducir m\u00fasica'}
    >
      {isPlaying ? (
        <IoMusicalNotes className="text-[#00d4ff] text-lg animate-pulse" />
      ) : (
        <IoVolumeMute className="text-white/40 text-lg" />
      )}
    </button>
  )
}
