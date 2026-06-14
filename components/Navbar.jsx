'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const sections = [
  { id: 'hero', label: 'Inicio' },
  { id: 'countdown', label: 'Cuenta Regresiva' },
  { id: 'evento', label: 'Evento' },
  { id: 'vestimenta', label: 'Dress Code' },
  { id: 'trivia', label: 'Trivia' },
  { id: 'galeria', label: 'Galería' },
  { id: 'rsvp', label: 'RSVP' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [hidden, setHidden] = useState(false)
  let lastScroll = 0

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      setScrolled(currentScroll > 50)
      setHidden(currentScroll > lastScroll && currentScroll > 200)
      lastScroll = currentScroll

      const current = sections.find((section) => {
        const el = document.getElementById(section.id)
        if (!el) return false
        const rect = el.getBoundingClientRect()
        return rect.top <= 120 && rect.bottom >= 120
      })
      if (current) setActiveSection(current.id)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <motion.nav
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(22,56,59,0.7)] backdrop-blur-2xl border-b border-[rgba(255,255,255,0.03)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button
            onClick={() => scrollTo('hero')}
            className="font-display text-lg font-bold tracking-wider transition-all duration-300 hover:opacity-80"
            style={{ color: 'rgba(63, 163, 170, 0.8)' }}
          >
            Hallie Aes
          </button>

          <div className="hidden md:flex items-center gap-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-400 relative ${
                  activeSection === section.id
                    ? 'text-white'
                    : 'text-[rgba(255,255,255,0.4)] hover:text-[rgba(255,255,255,0.7)]'
                }`}
              >
                {activeSection === section.id && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: 'rgba(63, 163, 170, 0.06)',
                      border: '1px solid rgba(63, 163, 170, 0.08)',
                    }}
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{section.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
          >
            <div className="flex flex-col gap-1.5">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                className="block w-5 h-[1.5px] rounded-full bg-current transition-colors"
                style={{ color: menuOpen ? 'rgba(63,163,170,0.8)' : 'rgba(255,255,255,0.5)' }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                className="block w-5 h-[1.5px] rounded-full bg-current transition-colors"
                style={{ color: menuOpen ? 'rgba(63,163,170,0.8)' : 'rgba(255,255,255,0.5)' }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                className="block w-5 h-[1.5px] rounded-full bg-current transition-colors"
                style={{ color: menuOpen ? 'rgba(63,163,170,0.8)' : 'rgba(255,255,255,0.5)' }}
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="md:hidden overflow-hidden"
            style={{
              background: 'rgba(22,56,59,0.85)',
              backdropFilter: 'blur(30px)',
              borderBottom: '1px solid rgba(255,255,255,0.03)',
            }}
          >
            <div className="px-4 py-4 space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`block w-full text-left px-5 py-3.5 rounded-2xl text-sm font-medium transition-all duration-300 ${
                    activeSection === section.id
                      ? 'text-white bg-[rgba(63,163,170,0.06)]'
                      : 'text-[rgba(255,255,255,0.4)] hover:text-white hover:bg-[rgba(255,255,255,0.03)]'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
