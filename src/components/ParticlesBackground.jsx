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
    const perf = isMobile || isSlow ? 0.35 : 1

    let bubbles = []
    let biolum = []
    let floaters = []
    let lightRays = []
    let kelp = []
    let time = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
    }

    const createBubbles = () => {
      const n = Math.round(15 * perf)
      bubbles = Array.from({ length: n }, () => ({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 80,
        r: 1 + Math.random() * (isMobile ? 2 : 3),
        speed: 0.12 + Math.random() * 0.35,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.008 + Math.random() * 0.015,
        wobbleAmp: 0.3 + Math.random() * 0.5,
        opacity: 0.04 + Math.random() * 0.08,
        hue: 180 + Math.random() * 30,
      }))
    }

    const createFloaters = () => {
      const n = Math.round(35 * perf)
      floaters = Array.from({ length: n }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        r: 0.4 + Math.random() * (Math.random() > 0.7 ? 3 : 1.5),
        opacity: 0.02 + Math.random() * 0.06,
        vx: (Math.random() - 0.5) * 0.04, vy: -0.01 - Math.random() * 0.03,
        pulse: Math.random() * Math.PI * 2, pulseSpeed: 0.004 + Math.random() * 0.01,
        hue: 170 + Math.random() * 40,
        isGlow: Math.random() > 0.85,
      }))
    }

    const createBiolum = () => {
      const n = Math.round(12 * perf)
      biolum = Array.from({ length: n }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        r: 1 + Math.random() * 2.5, life: Math.random() * 400, maxLife: 300 + Math.random() * 400,
        angle: Math.random() * Math.PI * 2, speed: 0.15 + Math.random() * 0.25,
        phase: Math.random() * Math.PI * 2, opacity: 0.1 + Math.random() * 0.25,
        hue: 140 + Math.random() * 60,
      }))
    }

    const createKelp = () => {
      const n = isMobile ? 2 : 4
      kelp = Array.from({ length: n }, () => ({
        x: 0.08 + Math.random() * 0.84, baseH: 40 + Math.random() * 80,
        segments: 4 + Math.floor(Math.random() * 3),
        w: 8 + Math.random() * 15, phase: Math.random() * Math.PI * 2,
        color: `hsla(${130 + Math.random() * 40}, 50%, ${30 + Math.random() * 25}%, ${0.04 + Math.random() * 0.04})`,
        swaySpeed: 0.004 + Math.random() * 0.008, swayAmp: 3 + Math.random() * 4,
      }))
    }

    const createLightRays = () => {
      const n = isMobile ? 2 : 5
      lightRays = Array.from({ length: n }, () => ({
        x: Math.random() * canvas.width * 0.85 + canvas.width * 0.05,
        w: 8 + Math.random() * 25, h: canvas.height * (0.3 + Math.random() * 0.4),
        opacity: 0.008 + Math.random() * 0.015, speed: 0.015 + Math.random() * 0.025,
        angle: -20 + Math.random() * 40, hue: 180 + Math.random() * 30,
      }))
    }

    const init = () => {
      resize()
      createBubbles()
      createFloaters()
      createBiolum()
      createKelp()
      createLightRays()
    }

    const drawKelp = (scrollOffset) => {
      for (const k of kelp) {
        const kx = k.x * canvas.width
        const ky = canvas.height - 20
        ctx.save()
        for (let i = 0; i < k.segments; i++) {
          const fi = i / k.segments
          const sw = Math.sin(time * k.swaySpeed + k.phase + fi * 0.8 + scrollOffset * 0.0008) * k.swayAmp * (1 - fi * 0.2)
          const sy = ky - i * (k.baseH / k.segments)
          const ew = k.w * (1 - fi * 0.25)
          ctx.beginPath()
          ctx.ellipse(kx + sw, sy, ew / 2, k.baseH / k.segments / 2, 0, 0, Math.PI * 2)
          ctx.fillStyle = k.color
          ctx.fill()
        }
        ctx.restore()
      }
    }

    const drawLightRays = (scrollOffset) => {
      for (const r of lightRays) {
        const ox = Math.sin(time * r.speed + scrollOffset * 0.0004) * 8
        ctx.save()
        ctx.globalAlpha = r.opacity * (0.6 + 0.4 * Math.sin(time * 0.008))
        const grad = ctx.createLinearGradient(r.x + ox, 0, r.x + r.w * 0.4 + ox, r.h)
        grad.addColorStop(0, `rgba(100, 220, 255, 0.025)`)
        grad.addColorStop(0.4, `rgba(0, 200, 255, 0.012)`)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.moveTo(r.x + ox, 0)
        ctx.lineTo(r.x + r.w + ox, 0)
        ctx.lineTo(r.x + r.w * 0.6 + ox + 12, r.h)
        ctx.lineTo(r.x + r.w * 0.4 + ox - 12, r.h)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      }
    }

    const drawWaveOverlay = () => {
      if (isMobile) return
      ctx.save()
      for (let i = 0; i < 3; i++) {
        const y = canvas.height - 20 + i * 15
        ctx.beginPath()
        ctx.moveTo(0, y)
        for (let x = 0; x <= canvas.width; x += 3) {
          const wy = Math.sin(x * 0.008 + time * 0.006 + i * 2) * 3
          ctx.lineTo(x, y + wy)
        }
        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()
        ctx.fillStyle = `rgba(0, 200, 255, ${0.008 + i * 0.004})`
        ctx.fill()
      }
      ctx.restore()
    }

    const drawBiolum = () => {
      for (const b of biolum) {
        b.life++
        if (b.life > b.maxLife) { b.life = 0; b.x = Math.random() * canvas.width; b.y = Math.random() * canvas.height }
        b.angle += 0.004
        b.x += Math.cos(b.angle) * 0.1
        b.y += Math.sin(b.angle) * 0.06
        b.phase += 0.012
        if (b.x < -10 || b.x > canvas.width + 10 || b.y < -10 || b.y > canvas.height + 10) {
          b.x = Math.random() * canvas.width; b.y = Math.random() * canvas.height
        }
        const progress = b.life / b.maxLife
        const fadeIn = Math.min(progress * 3, 1)
        const fadeOut = Math.max(1 - progress * 1.2, 0)
        const o = b.opacity * fadeIn * fadeOut * (0.5 + 0.5 * Math.sin(b.phase))
        if (o < 0.005) continue
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * 6)
        grad.addColorStop(0, `hsla(${b.hue}, 100%, 80%, ${o * 0.5})`)
        grad.addColorStop(0.3, `hsla(${b.hue}, 100%, 70%, ${o * 0.12})`)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r * 6, 0, Math.PI * 2)
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
        ctx.strokeStyle = `hsla(${b.hue}, 60%, 70%, ${b.opacity})`
        ctx.lineWidth = 0.5
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(b.x - b.r * 0.25, b.y - b.r * 0.25, b.r * 0.3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity * 0.4})`
        ctx.fill()
      }
    }

    const drawFloaters = () => {
      for (const f of floaters) {
        f.x += f.vx; f.y += f.vy
        f.pulse += f.pulseSpeed
        if (f.x < -10) f.x = canvas.width + 10
        if (f.x > canvas.width + 10) f.x = -10
        if (f.y < -20) f.y = canvas.height + 20
        const o = f.opacity * (0.5 + 0.5 * Math.sin(f.pulse))
        if (f.isGlow) {
          const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 4)
          grad.addColorStop(0, `hsla(${f.hue}, 80%, 80%, ${o * 0.2})`)
          grad.addColorStop(1, 'transparent')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(f.x, f.y, f.r * 4, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${f.hue}, 70%, 75%, ${o})`
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
      drawFloaters()
      drawKelp(scrollOffset)
      drawBiolum()
      drawBubbles()
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
