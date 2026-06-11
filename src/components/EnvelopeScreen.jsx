'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'

function Star({ data }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: data.size,
        height: data.size,
        top: `${data.top}%`,
        left: `${data.left}%`,
        opacity: data.opacity,
        background: data.big
          ? 'radial-gradient(circle, #fff 0%, rgba(0,212,255,0.6) 50%, transparent 100%)'
          : '#fff',
        boxShadow: data.big ? '0 0 8px rgba(0,212,255,0.5), 0 0 16px rgba(0,212,255,0.25)' : 'none',
        animation: `twinkle ${data.duration}s ease-in-out infinite`,
        animationDelay: `${data.delay}s`,
      }}
    />
  )
}

export default function EnvelopeScreen({ onOpen }) {
  const [state, setState] = useState('idle')
  const [isMobile, setIsMobile] = useState(false)
  const envelopeRef = useRef(null)
  const flapRef = useRef(null)
  const frontContentRef = useRef(null)
  const letterRef = useRef(null)
  const letterContentRef = useRef(null)
  const containerRef = useRef(null)
  const glowOverlayRef = useRef(null)
  const canvasRef = useRef(null)
  const openingRef = useRef(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const stars = useMemo(() =>
    Array.from({ length: isMobile ? 20 : 35 }, (_, i) => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: `${Math.random() * (i % 5 === 0 ? 2.5 : 1.2) + 0.6}px`,
      opacity: Math.random() * 0.6 + 0.1,
      duration: 2 + Math.random() * 5,
      delay: Math.random() * 4,
      big: i % 5 === 0,
    })), [isMobile])

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

    tl.to(glowOverlayRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
    })
      .to(frontContentRef.current, {
        opacity: 0,
        duration: 0.3,
      }, '-=0.1')
      .to(flapRef.current, {
        rotateX: -180,
        duration: 1.2,
        ease: 'power3.inOut',
      }, '-=0.2')
      .to(letterRef.current, {
        y: '0%',
        duration: 1,
        ease: 'power3.out',
      }, '-=0.4')
      .to(letterContentRef.current, {
        opacity: 1,
        duration: 0.6,
      }, '-=0.2')
      .to(glowOverlayRef.current, {
        opacity: 0,
        duration: 0.6,
      }, '+=0.4')
      .to(letterContentRef.current, {
        opacity: 0,
        y: '-20%',
        duration: 0.7,
        ease: 'power2.in',
      }, '+=0.3')
      .to(containerRef.current, {
        opacity: 0,
        scale: 1.02,
        duration: 0.8,
        ease: 'power2.inOut',
      }, '-=0.3')
  }, [onOpen])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const isMobileView = window.innerWidth < 768
    const count = isMobileView ? 15 : 30
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const create = () => {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.12,
        speedY: -Math.random() * 0.2 - 0.02,
        opacity: Math.random() * 0.25 + 0.05,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.015,
        hue: 190 + Math.random() * 25,
      }))
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.speedX; p.y += p.speedY
        p.pulse += p.pulseSpeed
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10
        if (p.y < -20) p.y = canvas.height + 20
        const po = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${po})`
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
      y: -4,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [state])

  const w = isMobile ? 340 : 440
  const h = isMobile ? 420 : 540

  return (
    <AnimatePresence>
      {state !== 'done' && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{
            background: 'linear-gradient(170deg, #060e1a 0%, #0a1628 25%, #0d2345 45%, #0a1628 65%, #0f2a50 85%, #060e1a 100%)',
          }}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          />

          {stars.map((s, i) => (
            <Star key={i} data={s} />
          ))}

          <div
            ref={glowOverlayRef}
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: 'radial-gradient(circle at center, rgba(0,212,255,0.25), transparent 60%)',
              opacity: 0,
            }}
          />

          <div
            ref={envelopeRef}
            className="relative z-20"
            style={{ perspective: '1200px', willChange: 'transform' }}
          >
            <div className="relative" style={{ width: w }}>
              <div
                style={{
                  width: w,
                  height: h,
                  position: 'relative',
                  borderRadius: '4px',
                  background: 'linear-gradient(175deg, #0f2a50 0%, #1a3f72 30%, #0d2a55 60%, #0a1a32 100%)',
                  border: '1.5px solid rgba(74, 143, 212, 0.3)',
                  boxShadow: `
                    0 8px 40px rgba(0, 20, 60, 0.5),
                    0 0 30px rgba(42, 90, 158, 0.12),
                    inset 0 0 60px rgba(0, 212, 255, 0.03)
                  `,
                  overflow: 'hidden',
                }}
              >
                {/* Shine overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,212,255,0.04) 0%, transparent 40%, rgba(0,212,255,0.02) 100%)',
                  }}
                />

                {/* FLAP - Triangular */}
                <div
                  ref={flapRef}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '36%',
                    transformOrigin: 'bottom center',
                    backfaceVisibility: 'hidden',
                    zIndex: 3,
                    willChange: 'transform',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(170deg, #1a3f72 0%, #0f2a50 50%, #0d2345 100%)',
                      clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: -2,
                      left: '5%',
                      width: '90%',
                      height: '4px',
                      background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.15), transparent)',
                    }}
                  />
                </div>

                {/* FRONT - minimal, no text */}
                <div
                  ref={frontContentRef}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '68%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                  }}
                >
                  {/* Minimal decorative seal */}
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,100,180,0.08))',
                      border: '1.5px solid rgba(0,212,255,0.15)',
                      boxShadow: '0 0 20px rgba(0,212,255,0.08)',
                    }}
                  />
                </div>

                {/* LETTER INSIDE */}
                <div
                  ref={letterRef}
                  style={{
                    position: 'absolute',
                    top: '3%',
                    left: '5%',
                    right: '5%',
                    bottom: '3%',
                    transform: 'translateY(105%)',
                    willChange: 'transform',
                    zIndex: 1,
                  }}
                >
                  <div
                    ref={letterContentRef}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '8px',
                      background: 'linear-gradient(160deg, #e8f0f8 0%, #d0dce8 30%, #c8d8e8 60%, #e0e8f0 100%)',
                      boxShadow: '0 8px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.8)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '24px',
                      opacity: 0,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0,212,255,0.04) 0%, transparent 50%, rgba(0,100,180,0.03) 100%)',
                        borderRadius: '8px',
                      }}
                    />
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,100,180,0.1))',
                        border: '1px solid rgba(0,212,255,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '14px',
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#00d4ff" opacity="0.6"/>
                      </svg>
                    </div>
                    <h3
                      className="font-display font-bold text-center"
                      style={{ fontSize: isMobile ? '22px' : '28px', color: '#0a1628', marginBottom: '10px' }}
                    >
                      &iexcl;Bienvenidos!
                    </h3>
                    <p
                      className="text-center leading-relaxed"
                      style={{
                        fontSize: isMobile ? '12px' : '14px',
                        color: '#4a6a8a',
                        maxWidth: '300px',
                        fontWeight: 300,
                      }}
                    >
                      Los espero en mi Pool Party para celebrar juntos este d&iacute;a tan especial. 
                      Su presencia har&aacute; de este momento un recuerdo inolvidable.
                    </p>
                    <div
                      style={{
                        width: '60px',
                        height: '1px',
                        background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.3), transparent)',
                        margin: '16px 0',
                      }}
                    />
                    <p className="font-display font-bold" style={{ fontSize: isMobile ? '20px' : '24px', color: '#0a1628' }}>
                      Hallie Aes
                    </p>
                    <p className="font-script" style={{ fontSize: isMobile ? '16px' : '20px', color: '#0f2a50', marginTop: '2px' }}>
                      XV A&ntilde;os
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="absolute -inset-[1px] pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,212,255,0.08), transparent 40%, rgba(0,212,255,0.04) 70%, transparent 100%)',
                  borderRadius: '5px',
                  zIndex: -1,
                }}
              />
            </div>
          </div>

          {state === 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="relative z-20 mt-10"
            >
              <button
                onClick={handleOpen}
                className="group relative px-12 py-4 rounded-full font-semibold text-sm uppercase tracking-[0.3em] overflow-hidden transition-all duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,212,255,0.1), rgba(0,100,180,0.1))',
                  border: '1px solid rgba(0,212,255,0.2)',
                  color: 'rgba(0,212,255,0.85)',
                  boxShadow: '0 0 25px rgba(0,212,255,0.05), inset 0 1px 0 rgba(0,212,255,0.08)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,212,255,0.18), rgba(0,100,180,0.18))'
                  e.currentTarget.style.boxShadow = '0 0 40px rgba(0,212,255,0.12)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,212,255,0.1), rgba(0,100,180,0.1))'
                  e.currentTarget.style.boxShadow = '0 0 25px rgba(0,212,255,0.05)'
                }}
              >
                <span className="relative z-10">Abrir Invitaci&oacute;n</span>
                <div
                  className="absolute inset-0 transition-all duration-700"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.1), transparent)',
                    transform: 'translateX(-100%)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateX(100%)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateX(-100%)' }}
                />
              </button>
            </motion.div>
          )}

          {state === 'idle' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 1.2 }}
              className="absolute bottom-8 text-[10px] tracking-[0.3em] uppercase z-20"
              style={{ color: 'rgba(255,255,255,0.1)' }}
            >
              Presiona para abrir
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
