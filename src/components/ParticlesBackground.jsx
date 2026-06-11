'use client'

import { useRef, useEffect } from 'react'

export default function ParticlesBackground() {
  const canvasRef = useRef(null)
  const scrollRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const isMobile = window.innerWidth < 768
    const isSlow = (navigator.hardwareConcurrency || 8) <= 4
    const perf = isMobile || isSlow ? 0.4 : 1

    let bubbles = []
    let particlesFar = []
    let particlesMid = []
    let particlesNear = []
    let biolum = []
    let corals = []
    let lightRays = []
    let time = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
    }

    const createBubbles = () => {
      const n = Math.round(12 * perf)
      bubbles = Array.from({ length: n }, () => ({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100,
        r: 1 + Math.random() * (isMobile ? 2 : 3.5),
        speed: 0.15 + Math.random() * 0.4,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.01 + Math.random() * 0.02,
        wobbleAmp: 0.3 + Math.random() * 0.5,
        opacity: 0.05 + Math.random() * 0.1,
      }))
    }

    const createParticles = () => {
      const nFar = Math.round(20 * perf)
      const nMid = Math.round(15 * perf)
      const nNear = Math.round(8 * perf)

      particlesFar = Array.from({ length: nFar }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        r: 0.5 + Math.random() * 1, opacity: 0.03 + Math.random() * 0.04,
        vx: (Math.random() - 0.5) * 0.05, vy: -0.02 - Math.random() * 0.03,
        pulse: Math.random() * Math.PI * 2, pulseSpeed: 0.005 + Math.random() * 0.01,
      }))
      particlesMid = Array.from({ length: nMid }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        r: 0.8 + Math.random() * 1.5, opacity: 0.05 + Math.random() * 0.06,
        vx: (Math.random() - 0.5) * 0.08, vy: -0.03 - Math.random() * 0.04,
        pulse: Math.random() * Math.PI * 2, pulseSpeed: 0.008 + Math.random() * 0.012,
      }))
      particlesNear = Array.from({ length: nNear }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        r: 1.5 + Math.random() * 2, opacity: 0.08 + Math.random() * 0.08,
        vx: (Math.random() - 0.5) * 0.12, vy: -0.05 - Math.random() * 0.06,
        pulse: Math.random() * Math.PI * 2, pulseSpeed: 0.01 + Math.random() * 0.015,
      }))
    }

    const createBiolum = () => {
      const n = Math.round(8 * perf)
      biolum = Array.from({ length: n }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        r: 1 + Math.random() * 2, life: Math.random() * 300, maxLife: 200 + Math.random() * 300,
        angle: Math.random() * Math.PI * 2, speed: 0.2 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2, opacity: 0.1 + Math.random() * 0.2,
      }))
    }

    const createCorals = () => {
      const n = isMobile ? 3 : 5
      corals = Array.from({ length: n }, () => ({
        x: 0.05 + Math.random() * 0.9, baseH: 30 + Math.random() * 60,
        w: 20 + Math.random() * 40, phase: Math.random() * Math.PI * 2,
        color: `hsla(${160 + Math.random() * 40}, 60%, ${35 + Math.random() * 20}%, ${0.06 + Math.random() * 0.06})`,
        swaySpeed: 0.005 + Math.random() * 0.01, swayAmp: 2 + Math.random() * 3,
      }))
    }

    const createLightRays = () => {
      const n = isMobile ? 2 : 4
      lightRays = Array.from({ length: n }, () => ({
        x: Math.random() * canvas.width * 0.8 + canvas.width * 0.1,
        w: 10 + Math.random() * 30, h: canvas.height * (0.4 + Math.random() * 0.3),
        opacity: 0.01 + Math.random() * 0.02, speed: 0.02 + Math.random() * 0.03,
        angle: -15 + Math.random() * 30,
      }))
    }

    const init = () => {
      resize()
      createBubbles()
      createParticles()
      createBiolum()
      createCorals()
      createLightRays()
    }

    const drawCorals = (scrollOffset) => {
      const w = canvas.width
      const h = canvas.height
      for (const c of corals) {
        const cx = c.x * w
        const cy = h - 40
        const sway = Math.sin(time * c.swaySpeed + c.phase + scrollOffset * 0.001) * c.swayAmp
        ctx.save()
        ctx.translate(cx, cy)
        ctx.fillStyle = c.color
        const segs = 5
        for (let i = 0; i < segs; i++) {
          const fi = i / segs
          const fw = c.w * (1 - fi * 0.3)
          const fh = c.baseH / segs
          const sw = Math.sin(time * c.swaySpeed + c.phase + fi * 0.5 + scrollOffset * 0.001) * c.swayAmp * (1 - fi * 0.3)
          ctx.beginPath()
          ctx.ellipse(sw, -(i + 0.5) * fh, fw / 2, fh / 2, 0, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }
    }

    const drawLightRays = (scrollOffset) => {
      for (const r of lightRays) {
        const ox = Math.sin(time * r.speed + scrollOffset * 0.0005) * 10
        ctx.save()
        ctx.globalAlpha = r.opacity * (0.7 + 0.3 * Math.sin(time * 0.01))
        const grad = ctx.createLinearGradient(r.x + ox, 0, r.x + r.w * 0.3 + ox, r.h)
        grad.addColorStop(0, 'rgba(0, 180, 216, 0.03)')
        grad.addColorStop(0.5, 'rgba(0, 212, 255, 0.015)')
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.moveTo(r.x + ox, 0)
        ctx.lineTo(r.x + r.w + ox, 0)
        ctx.lineTo(r.x + r.w * 0.7 + ox + 15, r.h)
        ctx.lineTo(r.x + r.w * 0.3 + ox - 15, r.h)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      }
    }

    const drawWaveOverlay = () => {
      const w = canvas.width
      const h = canvas.height
      ctx.save()
      for (let i = 0; i < 3; i++) {
        const y = h - 30 + i * 20
        ctx.beginPath()
        ctx.moveTo(0, y)
        for (let x = 0; x <= w; x += 4) {
          const wy = Math.sin(x * 0.01 + time * 0.008 + i * 2) * 4
          ctx.lineTo(x, y + wy)
        }
        ctx.lineTo(w, h)
        ctx.lineTo(0, h)
        ctx.closePath()
        ctx.fillStyle = `rgba(0, 212, 255, ${0.01 + i * 0.005})`
        ctx.fill()
      }
      ctx.restore()
    }

    const drawBiolum = () => {
      for (const b of biolum) {
        b.life++
        if (b.life > b.maxLife) { b.life = 0; b.x = Math.random() * canvas.width; b.y = Math.random() * canvas.height }
        b.angle += 0.005
        b.x += Math.cos(b.angle) * 0.12
        b.y += Math.sin(b.angle) * 0.08
        b.phase += 0.015
        if (b.x < -10 || b.x > canvas.width + 10 || b.y < -10 || b.y > canvas.height + 10) {
          b.x = Math.random() * canvas.width; b.y = Math.random() * canvas.height
        }
        const progress = b.life / b.maxLife
        const fadeIn = Math.min(progress * 3, 1)
        const fadeOut = Math.max(1 - progress * 1.2, 0)
        const o = b.opacity * fadeIn * fadeOut * (0.6 + 0.4 * Math.sin(b.phase))
        if (o < 0.005) continue
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * 5)
        grad.addColorStop(0, `rgba(0, 212, 255, ${o * 0.5})`)
        grad.addColorStop(0.3, `rgba(0, 180, 216, ${o * 0.15})`)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r * 5, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const drawBubbles = () => {
      for (const b of bubbles) {
        b.y -= b.speed
        b.wobble += b.wobbleSpeed
        b.x += Math.sin(b.wobble) * b.wobbleAmp
        if (b.y < -20) { b.y = canvas.height + 20; b.x = Math.random() * canvas.width }
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(180, 220, 255, ${b.opacity})`
        ctx.lineWidth = 0.5
        ctx.stroke()
        // Bubble highlight
        ctx.beginPath()
        ctx.arc(b.x - b.r * 0.25, b.y - b.r * 0.25, b.r * 0.3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity * 0.5})`
        ctx.fill()
      }
    }

    const drawParticleLayer = (particles, mult) => {
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy
        p.pulse += p.pulseSpeed
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10
        if (p.y < -20) p.y = canvas.height + 20
        const o = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180, 220, 255, ${o * mult})`
        ctx.fill()
      }
    }

    let onScroll = () => {}
    if (!isMobile) {
      onScroll = () => { scrollRef.current = window.scrollY }
      window.addEventListener('scroll', onScroll, { passive: true })
    }

    init()

    const animate = () => {
      time++
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const scrollOffset = scrollRef.current

      drawLightRays(scrollOffset)
      drawParticleLayer(particlesFar, 1)
      drawCorals(scrollOffset)
      drawParticleLayer(particlesMid, 1.5)
      drawBiolum()
      drawBubbles()
      drawParticleLayer(particlesNear, 2)
      drawWaveOverlay()

      animId = requestAnimationFrame(animate)
    }

    animate()

    const onResize = () => { resize() }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      if (!isMobile) window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
