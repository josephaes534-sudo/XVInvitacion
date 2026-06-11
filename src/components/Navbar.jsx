'use client'

import { useState, useEffect } from 'react'
import { HiSparkles } from 'react-icons/hi2'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-[rgba(6,14,26,0.85)] backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        <span className="font-display text-xl md:text-2xl font-semibold bg-gradient-to-r from-blue-300 to-cyan-400 bg-clip-text text-transparent">
          XVhallie
        </span>
        <div className="hidden md:flex items-center gap-8">
          {['Experiencia', 'Galería', 'Contacto'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}
              className="text-xs tracking-[0.15em] uppercase text-white/40 hover:text-cyan-300 transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </div>
        <HiSparkles className="text-cyan-400/50 text-lg md:hidden" />
      </div>
    </nav>
  )
}
