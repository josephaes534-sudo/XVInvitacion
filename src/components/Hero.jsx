'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { IoChevronDown } from 'react-icons/io5'
import { HiSparkles } from 'react-icons/hi2'
import eventConfig from '@/config/event'

export default function Hero() {
  const glowRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(glowRef.current, {
        scale: 1.2,
        opacity: 0.3,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })
    return () => ctx.revert()
  }, [])

  const scrollToCountdown = () => {
    document.getElementById('countdown')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00d4ff] rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#0f2a50] rounded-full blur-[128px]" />
      </div>

      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0, 212, 255, 0.05) 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, rgba(15, 42, 80, 0.08) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <HiSparkles className="text-[#00d4ff] text-lg" />
            <span className="text-[#00d4ff]/80 text-sm tracking-[0.3em] uppercase font-light">
              Pool Party
            </span>
            <HiSparkles className="text-[#00d4ff] text-lg" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold text-white text-glow mb-4 tracking-tight"
        >
          {eventConfig.heroName}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
          className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent mx-auto mb-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          className="text-3xl sm:text-4xl md:text-5xl font-script text-[#00d4ff] mb-8"
        >
          {eventConfig.heroSubtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-white/40 text-sm tracking-[0.3em] uppercase"
        >
          Te invito a celebrar conmigo
        </motion.p>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        onClick={scrollToCountdown}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-[#00d4ff] transition-colors group cursor-pointer"
      >
        <span className="text-xs tracking-[0.2em] uppercase">Descubre m&aacute;s</span>
        <IoChevronDown className="text-2xl animate-bounce group-hover:scale-110 transition-transform" />
      </motion.button>
    </section>
  )
}
