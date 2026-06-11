'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { HiSparkles } from 'react-icons/hi2'

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
        boxShadow: data.big
          ? '0 0 8px rgba(0,212,255,0.5), 0 0 16px rgba(0,212,255,0.25), 0 0 32px rgba(0,212,255,0.1)'
          : 'none',
        animation: `twinkle ${data.duration}s ease-in-out infinite`,
        animationDelay: `${data.delay}s`,
      }}
    />
  )
}

function OceanGem({ isMobile }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <div
        className="relative"
        style={{
          width: isMobile ? 180 : 260,
          height: isMobile ? 180 : 260,
          animation: 'marineFloat 7s ease-in-out infinite',
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 25%, rgba(200,240,255,0.9) 0%, rgba(0,212,255,0.5) 15%, rgba(0,150,200,0.3) 30%, rgba(0,60,120,0.15) 55%, transparent 80%)',
            boxShadow: `
              0 0 80px rgba(0,212,255,0.3),
              0 0 160px rgba(0,212,255,0.15),
              0 0 240px rgba(0,212,255,0.08),
              inset 0 -40px 60px rgba(0,212,255,0.1)
            `,
            animation: 'glowPulse 4s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '35%',
            height: '22%',
            top: '18%',
            left: '22%',
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.7), transparent)',
            transform: 'rotate(-25deg)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '16%',
            height: '10%',
            top: '38%',
            left: '58%',
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.3), transparent)',
            transform: 'rotate(15deg)',
          }}
        />
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180
          const rayLength = 45 + (i % 3) * 20
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: '2px',
                height: rayLength,
                background: `linear-gradient(to top, transparent, rgba(0,212,255,${0.05 + (i % 4) * 0.02}))`,
                top: '50%',
                left: '50%',
                transformOrigin: 'bottom center',
                transform: `translate(-50%, -100%) rotate(${i * 30}deg)`,
                opacity: 0.2 + (i % 3) * 0.2,
                animation: `rayPulse ${2 + (i % 4) * 0.6}s ease-in-out infinite`,
                animationDelay: `${i * 0.25}s`,
              }}
            />
          )
        })}
      </div>
      <div
        className="absolute rounded-full"
        style={{
          width: isMobile ? 250 : 360,
          height: isMobile ? 80 : 100,
          bottom: isMobile ? '25%' : '28%',
          background: 'radial-gradient(ellipse, rgba(0,212,255,0.1), transparent 70%)',
          animation: 'glowPulse 4s ease-in-out infinite',
          animationDelay: '1s',
        }}
      />
    </div>
  )
}

export default function EnvelopeScreen({ onOpen }) {
  const [state, setState] = useState('idle')
  const [isMobile, setIsMobile] = useState(false)
  const envelopeRef = useRef(null)
  const flapRef = useRef(null)
  const bodyFrontRef = useRef(null)
  const letterRef = useRef(null)
  const letterContentRef = useRef(null)
  const containerRef = useRef(null)
  const glowOverlayRef = useRef(null)
  const canvasRef = useRef(null)
  const sparkleBurstRef = useRef(null)
  const openingRef = useRef(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const stars = useMemo(() =>
    Array.from({ length: isMobile ? 25 : 45 }, (_, i) => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: `${Math.random() * (i % 4 === 0 ? 3 : 1.5) + 0.8}px`,
      opacity: Math.random() * 0.7 + 0.15,
      duration: 2 + Math.random() * 5,
      delay: Math.random() * 4,
      big: i % 4 === 0,
    })), [isMobile])

  const handleOpen = useCallback(() => {
    if (openingRef.current) return
    openingRef.current = true
    setState('opening')

    const tl = gsap.timeline({
      onComplete: () => {
        setState('done')
        setTimeout(() => onOpen(), 700)
      },
    })

    tl.to(glowOverlayRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    })
      .to(sparkleBurstRef.current, {
        opacity: 1,
        scale: 1.2,
        duration: 0.3,
      }, '-=0.1')
      .to(sparkleBurstRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
      }, '+=0.2')
      .to(flapRef.current, {
        rotateX: -180,
        duration: 1,
        ease: 'power3.inOut',
      }, '-=0.1')
      .to(bodyFrontRef.current, {
        opacity: 0,
        duration: 0.5,
      }, '-=0.4')
      .to(letterRef.current, {
        y: '0%',
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.3')
      .to(letterContentRef.current, {
        opacity: 1,
        duration: 0.4,
      }, '-=0.3')
      .to(glowOverlayRef.current, {
        opacity: 0,
        duration: 0.5,
      }, '+=0.2')
      .to(letterContentRef.current, {
        opacity: 0,
        y: '-15%',
        duration: 0.6,
        ease: 'power2.in',
      }, '+=0.3')
      .to(containerRef.current, {
        opacity: 0,
        scale: 1.02,
        duration: 0.7,
        ease: 'power2.inOut',
      }, '-=0.2')
  }, [onOpen])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const isMobileView = window.innerWidth < 768
    const count = isMobileView ? 20 : 40
    let particles = []
    let sparkles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const create = () => {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: -Math.random() * 0.25 - 0.03,
        opacity: Math.random() * 0.3 + 0.05,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.015,
        hue: Math.random() > 0.3 ? 185 + Math.random() * 25 : 165 + Math.random() * 20,
        isLarge: Math.random() < 0.2,
      }))
      sparkles = Array.from({ length: isMobileView ? 8 : 15 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.3,
        speed: 0.005 + Math.random() * 0.01,
        phase: Math.random() * Math.PI * 2,
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
        ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${po})`
        ctx.fill()
        if (p.isLarge) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${po * 0.07})`
          ctx.fill()
        }
      })
      const t = Date.now() / 1000
      sparkles.forEach((s) => {
        const alpha = 0.15 + 0.35 * Math.sin(t * s.speed * 10 + s.phase)
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
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
      y: -5,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [state])

  return (
    <AnimatePresence>
      {state !== 'done' && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{
            background: 'linear-gradient(170deg, #030810 0%, #0a1628 20%, #0d2345 40%, #0a1628 60%, #0f2a50 80%, #060e1a 100%)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse at 15% 20%, rgba(0,212,255,0.06) 0%, transparent 45%),
                radial-gradient(ellipse at 85% 75%, rgba(0,100,180,0.08) 0%, transparent 45%),
                radial-gradient(ellipse at 50% 50%, rgba(0,150,200,0.04) 0%, transparent 50%),
                radial-gradient(ellipse at 20% 80%, rgba(0,212,255,0.03) 0%, transparent 35%)
              `,
              animation: 'caustic 20s ease-in-out infinite',
            }}
          />

          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          />

          <OceanGem isMobile={isMobile} />

          {stars.map((s, i) => (
            <Star key={i} data={s} />
          ))}

          <div
            ref={glowOverlayRef}
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: 'radial-gradient(circle at center, rgba(0,212,255,0.2), transparent 60%)',
              opacity: 0,
            }}
          />

          <div
            ref={sparkleBurstRef}
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `
                radial-gradient(circle at 30% 40%, rgba(0,212,255,0.15), transparent 40%),
                radial-gradient(circle at 70% 60%, rgba(0,212,255,0.1), transparent 35%),
                radial-gradient(circle at 50% 30%, rgba(255,255,255,0.08), transparent 30%)
              `,
              opacity: 0,
            }}
          />

          <div
            ref={envelopeRef}
            className="relative z-20"
            style={{ perspective: '1200px', willChange: 'transform' }}
          >
            <div
              className="relative"
              style={{ width: isMobile ? '290px' : '380px' }}
            >
              <div
                className="relative overflow-hidden"
                style={{
                  borderRadius: '16px',
                  height: isMobile ? '380px' : '500px',
                  background: 'linear-gradient(180deg, rgba(15,42,80,0.5) 0%, rgba(10,25,50,0.45) 40%, rgba(8,20,40,0.5) 100%)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(0,212,255,0.15)',
                  boxShadow: `
                    0 0 30px rgba(0,212,255,0.08),
                    0 0 60px rgba(0,212,255,0.04),
                    inset 0 0 40px rgba(0,212,255,0.03),
                    0 20px 60px rgba(0,0,0,0.3)
                  `,
                }}
              >
                <div
                  className="absolute inset-0 rounded-[16px] pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,212,255,0.05) 0%, transparent 40%, rgba(0,212,255,0.03) 100%)',
                  }}
                />

                <div
                  ref={letterRef}
                  className="absolute flex items-center justify-center"
                  style={{
                    top: '5%',
                    left: '5%',
                    right: '5%',
                    bottom: '5%',
                    transform: 'translateY(105%)',
                    willChange: 'transform',
                  }}
                >
                  <div
                    ref={letterContentRef}
                    className="w-full h-full rounded-xl flex flex-col items-center justify-center relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(160deg, #e8f0f8 0%, #d0dce8 30%, #c8d8e8 60%, #e0e8f0 100%)',
                      boxShadow: '0 8px 40px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)',
                      opacity: 0,
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0,212,255,0.04) 0%, transparent 50%, rgba(0,100,180,0.03) 100%)',
                      }}
                    />
                    <div
                      className="flex items-center justify-center mb-5"
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,100,180,0.15))',
                        border: '1px solid rgba(0,212,255,0.25)',
                        boxShadow: '0 0 20px rgba(0,212,255,0.1)',
                      }}
                    >
                      <HiSparkles style={{ fontSize: '22px', color: '#00d4ff' }} />
                    </div>
                    <h3
                      className="font-display font-bold text-center mb-3"
                      style={{
                        fontSize: isMobile ? '22px' : '28px',
                        color: '#0a1628',
                        letterSpacing: '0.02em',
                      }}
                    >
                      Bienvenida
                    </h3>
                    <p
                      className="text-center leading-relaxed px-6"
                      style={{
                        fontSize: isMobile ? '12px' : '14px',
                        color: '#4a6a8a',
                        maxWidth: '280px',
                        fontWeight: 300,
                      }}
                    >
                      Te espera una experiencia &uacute;nica junto al mar
                    </p>
                    <div
                      className="my-5"
                      style={{
                        width: '60px',
                        height: '1px',
                        background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.4), transparent)',
                      }}
                    />
                    <p
                      className="font-display font-bold"
                      style={{
                        fontSize: isMobile ? '20px' : '26px',
                        color: '#0a1628',
                        letterSpacing: '0.02em',
                      }}
                    >
                      XVhallie
                    </p>
                    <p
                      className="font-script"
                      style={{
                        fontSize: isMobile ? '16px' : '22px',
                        color: '#0f2a50',
                        marginTop: '2px',
                      }}
                    >
                      Océano de Elegancia
                    </p>
                  </div>
                </div>

                <div ref={bodyFrontRef} className="absolute inset-0" style={{ willChange: 'opacity' }}>
                  <div
                    ref={flapRef}
                    className="absolute top-0 left-0 right-0"
                    style={{
                      height: '40%',
                      transformOrigin: 'bottom center',
                      backfaceVisibility: 'hidden',
                      background: 'linear-gradient(180deg, rgba(15,42,80,0.6) 0%, rgba(15,35,70,0.45) 50%, rgba(10,25,50,0.35) 100%)',
                      borderBottom: '1px solid rgba(0,212,255,0.1)',
                      borderTopLeftRadius: '16px',
                      borderTopRightRadius: '16px',
                      willChange: 'transform',
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 right-0"
                      style={{
                        height: '60px',
                        background: 'linear-gradient(180deg, rgba(0,212,255,0.08) 0%, transparent 100%)',
                        borderTopLeftRadius: '16px',
                        borderTopRightRadius: '16px',
                      }}
                    />
                    <div
                      className="absolute bottom-0 left-0 right-0"
                      style={{
                        height: '1px',
                        background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.25), transparent)',
                      }}
                    />
                    <div
                      className="absolute flex items-center justify-center"
                      style={{
                        bottom: '-18px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(0,212,255,0.25), rgba(0,100,180,0.3))',
                        border: '2px solid rgba(0,212,255,0.3)',
                        boxShadow: '0 0 20px rgba(0,212,255,0.2), 0 0 40px rgba(0,212,255,0.08)',
                      }}
                    >
                      <div
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: 'radial-gradient(circle, rgba(0,212,255,0.7), rgba(0,212,255,0.3))',
                          animation: 'glowPulse 2s ease-in-out infinite',
                        }}
                      />
                    </div>
                    <div
                      className="flex items-center justify-center"
                      style={{ paddingTop: isMobile ? '28px' : '36px' }}
                    >
                      <span
                        className="text-xs tracking-[0.3em] uppercase font-light"
                        style={{ color: 'rgba(0,212,255,0.35)', letterSpacing: '0.3em' }}
                      >
                        Para ti
                      </span>
                    </div>
                  </div>

                  <div
                    className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center"
                    style={{ height: '62%', padding: '0 24px' }}
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <HiSparkles style={{ color: 'rgba(0,212,255,0.35)', fontSize: '14px' }} />
                      <span
                        className="text-[10px] tracking-[0.3em] uppercase font-light"
                        style={{ color: 'rgba(0,212,255,0.35)' }}
                      >
                        Luxury Experience
                      </span>
                      <HiSparkles style={{ color: 'rgba(0,212,255,0.35)', fontSize: '14px' }} />
                    </div>
                    <h2
                      className="font-display font-bold text-center"
                      style={{
                        fontSize: isMobile ? '32px' : '46px',
                        color: '#fff',
                        textShadow: '0 0 30px rgba(0,212,255,0.4), 0 0 60px rgba(0,212,255,0.2), 0 0 120px rgba(0,212,255,0.1)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      XVhallie
                    </h2>
                    <p
                      className="font-script mt-2"
                      style={{
                        fontSize: isMobile ? '22px' : '34px',
                        color: 'rgba(0,212,255,0.6)',
                        textShadow: '0 0 20px rgba(0,212,255,0.2)',
                      }}
                    >
                      Océano de Elegancia
                    </p>
                    <div
                      className="mt-8"
                      style={{
                        width: '80px',
                        height: '1px',
                        background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.25), transparent)',
                      }}
                    />
                    <p
                      className="mt-6 text-[10px] tracking-[0.3em] uppercase font-light"
                      style={{ color: 'rgba(0,212,255,0.2)' }}
                    >
                      &mdash; Exclusivo &mdash;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {state === 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="relative z-20 mt-10"
            >
              <button
                onClick={handleOpen}
                className="group relative px-12 py-4 rounded-full font-semibold text-sm uppercase tracking-[0.3em] overflow-hidden transition-all duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,212,255,0.12), rgba(0,100,180,0.12))',
                  border: '1px solid rgba(0,212,255,0.25)',
                  color: 'rgba(0,212,255,0.85)',
                  boxShadow: '0 0 25px rgba(0,212,255,0.06), inset 0 1px 0 rgba(0,212,255,0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,100,180,0.2))'
                  e.currentTarget.style.boxShadow = '0 0 40px rgba(0,212,255,0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,212,255,0.12), rgba(0,100,180,0.12))'
                  e.currentTarget.style.boxShadow = '0 0 25px rgba(0,212,255,0.06)'
                }}
              >
                <span className="relative z-10">Abrir Invitaci&oacute;n</span>
                <div
                  className="absolute inset-0 transition-all duration-700"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.12), transparent)',
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
              transition={{ delay: 2.5, duration: 1.2 }}
              className="absolute bottom-8 text-[10px] tracking-[0.3em] uppercase z-20"
              style={{ color: 'rgba(255,255,255,0.12)' }}
            >
              Presiona para abrir
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
