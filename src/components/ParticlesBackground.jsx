'use client'

import { useRef, useEffect } from 'react'

export default function ParticlesBackground({ variant = 'ocean' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const isMobile = window.innerWidth < 768
    const count = isMobile ? 30 : 60
    let particles = []
    let sparkles = []
    let biolum = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const create = () => {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.12,
        speedY: -Math.random() * 0.2 - 0.02,
        opacity: Math.random() * 0.25 + 0.05,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.015,
      }))
      sparkles = Array.from({ length: isMobile ? 4 : 10 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.2 + 0.3,
        speed: 0.005 + Math.random() * 0.01,
        phase: Math.random() * Math.PI * 2,
      }))
      biolum = Array.from({ length: isMobile ? 3 : 8 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: 0.3 + Math.random() * 0.5,
        angle: Math.random() * Math.PI * 2,
        phase: Math.random() * Math.PI * 2,
        life: 0,
        maxLife: 200 + Math.random() * 300,
      }))
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const w = canvas.width
      const h = canvas.height

      biolum.forEach((b) => {
        b.life++
        if (b.life > b.maxLife) { b.life = 0; b.x = Math.random() * w; b.y = Math.random() * h }
        b.angle += 0.008
        b.x += Math.cos(b.angle) * 0.15
        b.y += Math.sin(b.angle) * 0.1
        b.phase += 0.02
        if (b.x < -10 || b.x > w + 10 || b.y < -10 || b.y > h + 10) {
          b.x = Math.random() * w; b.y = Math.random() * h
        }
        const progress = b.life / b.maxLife
        const fadeIn = Math.min(progress * 3, 1)
        const fadeOut = Math.max(1 - progress, 0)
        const o = 0.15 * fadeIn * fadeOut * (0.6 + 0.4 * Math.sin(b.phase))
        if (o < 0.01) return
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.size * 5)
        grad.addColorStop(0, `rgba(0, 212, 255, ${o * 0.5})`)
        grad.addColorStop(0.3, `rgba(0, 180, 216, ${o * 0.15})`)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.size * 5, 0, Math.PI * 2)
        ctx.fill()
      })

      particles.forEach((p) => {
        p.x += p.speedX; p.y += p.speedY
        p.pulse += p.pulseSpeed
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -20) p.y = h + 20
        const po = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180, 220, 255, ${po})`
        ctx.fill()
      })

      const t = Date.now() / 1000
      sparkles.forEach((s) => {
        const alpha = 0.1 + 0.3 * Math.sin(t * s.speed * 10 + s.phase)
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
  }, [variant])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
