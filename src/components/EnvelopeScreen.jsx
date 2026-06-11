'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { HiSparkles } from 'react-icons/hi2'

export default function EnvelopeScreen({ onOpen }) {
  const [state, setState] = useState('idle')
  const envelopeRef = useRef(null)
  const flapRef = useRef(null)
  const bodyFrontRef = useRef(null)
  const letterRef = useRef(null)
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const openingRef = useRef(false)

  const handleOpen = useCallback(() => {
    if (openingRef.current) return
    openingRef.current = true
    setState('opening')

    const tl = gsap.timeline({
      onComplete: () => {
        setState('done')
        setTimeout(() => onOpen(), 600)
      },
    })

    tl.to(flapRef.current, {
      rotateX: -180,
      duration: 0.9,
      ease: 'power3.inOut',
    })
      .to(
        bodyFrontRef.current,
        { opacity: 0, duration: 0.4 },
        '-=0.4'
      )
      .to(
        letterRef.current,
        { y: '0%', duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      )
      .to(containerRef.current, {
        scale: 1.02,
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
      }, '+=0.6')
  }, [onOpen])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const create = () => {
      particles = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -Math.random() * 0.4 - 0.1,
        opacity: Math.random() * 0.5 + 0.1,
        hue: Math.random() > 0.5 ? 190 : 170,
      }))
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < -10) p.y = canvas.height + 10

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${p.opacity})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${p.opacity * 0.1})`
        ctx.fill()
      })
      animId = requestAnimationFrame(animate)
    }

    resize()
    create()
    animate()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  useEffect(() => {
    if (!envelopeRef.current || state !== 'idle') return
    gsap.to(envelopeRef.current, {
      y: -8,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [state])

  const stars = Array.from({ length: 25 })

  return (
    <AnimatePresence>
      {state !== 'done' && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy-900 overflow-hidden"
        >
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

          <div className="absolute w-[500px] h-[500px] bg-electric-500/10 rounded-full blur-[120px] pointer-events-none animate-glow-pulse" />

          {stars.map((_, i) => (
            <div
              key={i}
              className="absolute w-[2px] h-[2px] bg-white rounded-full pointer-events-none"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.6 + 0.1,
                animation: `twinkle ${2 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}

          <div
            ref={envelopeRef}
            className="relative z-10"
            style={{ perspective: '1200px' }}
          >
            <div className="relative w-[270px] sm:w-[320px] md:w-[360px] h-[380px] sm:h-[420px] md:h-[460px] overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-b from-royal-800/60 via-navy-600/40 to-navy-500/40 border border-white/10 shadow-2xl rounded-2xl">
                <div
                  ref={letterRef}
                  className="absolute inset-[6%] rounded-xl bg-gradient-to-br from-white via-gray-50 to-gray-100 p-6 md:p-8 flex flex-col items-center justify-center shadow-xl"
                  style={{ transform: 'translateY(105%)' }}
                >
                  <div className="w-10 h-10 rounded-full bg-electric-500/20 border border-electric-500/30 flex items-center justify-center mb-4">
                    <HiSparkles className="text-electric-500" />
                  </div>
                  <h3 className="text-navy-800 font-display text-xl md:text-2xl font-bold text-center mb-2">
                    ¡Bienvenidos!
                  </h3>
                  <p className="text-navy-600 text-xs md:text-sm text-center leading-relaxed max-w-[200px]">
                    Estamos muy felices de que nos acompañes en este día tan especial
                  </p>
                  <div className="my-4 w-12 h-px bg-gradient-to-r from-transparent via-electric-500/60 to-transparent" />
                  <p className="text-navy-800 font-display text-lg font-bold">Hallie Aes</p>
                  <p className="text-electric-600 font-script text-base">Mis XV Años</p>
                </div>

                <div ref={bodyFrontRef} className="absolute inset-0">
                  <div
                    ref={flapRef}
                    className="absolute top-0 left-0 right-0 h-[38%] bg-gradient-to-b from-royal-700/60 via-royal-600/40 to-navy-500/30"
                    style={{ transformOrigin: 'bottom center', backfaceVisibility: 'hidden' }}
                  >
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric-500/40 to-transparent" />
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electric-500/30 to-royal-500/30 border border-electric-500/40 shadow-lg glow-blue flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-electric-500/60 animate-glow-pulse" />
                      </div>
                    </div>
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 text-electric-500/30 text-xs tracking-[0.3em] uppercase font-light">
                      Para ti
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-[62%] flex flex-col items-center justify-center px-6">
                    <div className="flex items-center gap-2 mb-4">
                      <HiSparkles className="text-electric-500/50 text-sm" />
                      <span className="text-electric-500/50 text-[10px] tracking-[0.3em] uppercase font-light">
                        Special Celebration
                      </span>
                      <HiSparkles className="text-electric-500/50 text-sm" />
                    </div>
                    <h2 className="text-white font-display text-2xl md:text-4xl font-bold text-glow-strong text-center">
                      Hallie Aes
                    </h2>
                    <p className="text-electric-400 font-script text-xl md:text-3xl mt-1">
                      Mis XV Años
                    </p>
                    <div className="mt-6 w-20 h-px bg-gradient-to-r from-transparent via-electric-500/40 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {state === 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="relative z-10 mt-8 md:mt-10"
            >
              <button
                onClick={handleOpen}
                className="group relative px-10 py-4 rounded-full bg-gradient-to-r from-electric-500/20 to-royal-500/20 border border-electric-500/30 text-electric-500 font-semibold text-sm uppercase tracking-[0.3em] transition-all duration-500 hover:bg-electric-500/30 hover:shadow-lg hover:shadow-electric-500/20 overflow-hidden"
              >
                <span className="relative z-10">Abrir Invitación</span>
                <div className="absolute inset-0 bg-gradient-to-r from-electric-500/0 via-electric-500/20 to-electric-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </button>
            </motion.div>
          )}

          {state === 'idle' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-8 text-white/20 text-[10px] tracking-[0.3em] uppercase"
            >
              Presiona para abrir
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
