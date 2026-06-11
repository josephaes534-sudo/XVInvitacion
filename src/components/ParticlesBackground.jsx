'use client'

import { useEffect, useRef } from 'react'

export default function ParticlesBackground({ count = 40, variant = 'default' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let particles = []

    const isMarine = variant === 'marine'

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (isMarine ? 3 : 2.5) + (isMarine ? 0.5 : 0.8),
        speedX: (Math.random() - 0.5) * (isMarine ? 0.3 : 0.4),
        speedY: (Math.random() - 0.5) * (isMarine ? 0.3 : 0.4),
        opacity: Math.random() * 0.5 + 0.1,
        hue: isMarine
          ? Math.random() > 0.5
            ? 180 + Math.random() * 20
            : 160 + Math.random() * 20
          : 195,
        pulse: Math.random() * Math.PI * 2,
      }))
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const time = Date.now() / 1000

      particles.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY
        p.pulse += 0.02

        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10
        if (p.y < -10) p.y = canvas.height + 10
        if (p.y > canvas.height + 10) p.y = -10

        const pulseOpacity = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse))

        ctx.save()
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = isMarine
          ? `hsla(${p.hue}, 100%, 70%, ${pulseOpacity})`
          : `rgba(0, 212, 255, ${pulseOpacity})`
        ctx.fill()

        if (isMarine) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${pulseOpacity * 0.08})`
          ctx.fill()
        }

        ctx.restore()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    resize()
    createParticles()
    animate()

    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
    }
  }, [count, variant])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
