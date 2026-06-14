'use client'

import { useRef, useEffect } from 'react'

export default function OceanBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const isMobile = window.innerWidth < 768
    const isSlow = (navigator.hardwareConcurrency || 8) <= 4
    const perf = isMobile || isSlow ? 0.35 : 1

    let time = 0

    let waterGlows = []
    let corals = []
    let bubbles = []
    let particles = []
    let fish = []
    let sparkles = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
    }

    const randomBetween = (min, max) => min + Math.random() * (max - min)

    const createWaterGlows = () => {
      const n = isMobile ? 3 : 6
      waterGlows = Array.from({ length: n }, () => ({
        x: randomBetween(0.05, 0.95),
        y: randomBetween(0.05, 0.95),
        r: randomBetween(100, 300),
        r2: randomBetween(60, 180),
        hue: randomBetween(170, 190),
        sat: randomBetween(25, 45),
        light: randomBetween(45, 65),
        opacity: randomBetween(0.025, 0.05),
        speed: randomBetween(0.001, 0.003),
        phase: randomBetween(0, Math.PI * 2),
      }))
    }

    const createCorals = () => {
      const n = Math.round(6 * perf)
      corals = Array.from({ length: n }, () => ({
        x: randomBetween(0.05, 0.95),
        baseY: randomBetween(0.55, 0.88),
        height: randomBetween(30, 80),
        width: randomBetween(20, 50),
        hue: randomBetween(168, 188),
        sat: randomBetween(18, 35),
        light: randomBetween(45, 60),
        opacity: randomBetween(0.06, 0.14),
        phase: randomBetween(0, Math.PI * 2),
        swaySpeed: randomBetween(0.0015, 0.0035),
        swayAmp: randomBetween(1.5, 4),
        glowPhase: randomBetween(0, Math.PI * 2),
        glowSpeed: randomBetween(0.003, 0.008),
        type: Math.floor(randomBetween(0, 3)),
      }))
    }

    const createBubbles = () => {
      const n = Math.round(20 * perf)
      bubbles = Array.from({ length: n }, () => ({
        x: randomBetween(0, canvas.width),
        y: randomBetween(canvas.height * 0.3, canvas.height + 80),
        r: randomBetween(0.6, 3.5),
        speed: randomBetween(0.08, 0.3),
        wobble: randomBetween(0, Math.PI * 2),
        wobbleSpeed: randomBetween(0.004, 0.01),
        wobbleAmp: randomBetween(0.2, 0.5),
        opacity: randomBetween(0.03, 0.08),
        hue: randomBetween(172, 190),
      }))
    }

    const createParticles = () => {
      const n = Math.round(40 * perf)
      particles = Array.from({ length: n }, () => ({
        x: randomBetween(0, canvas.width),
        y: randomBetween(0, canvas.height),
        r: randomBetween(0.2, 1.5),
        opacity: randomBetween(0.008, 0.035),
        vx: randomBetween(-0.02, 0.02),
        vy: randomBetween(-0.015, -0.003),
        pulse: randomBetween(0, Math.PI * 2),
        pulseSpeed: randomBetween(0.002, 0.006),
        hue: randomBetween(170, 190),
        isGlow: Math.random() > 0.9,
      }))
    }

    const createFish = () => {
      const n = isMobile ? 2 : 4
      fish = Array.from({ length: n }, () => ({
        x: randomBetween(0, canvas.width),
        y: randomBetween(0.25, 0.75),
        size: randomBetween(5, 12),
        speed: randomBetween(0.08, 0.2),
        opacity: randomBetween(0.015, 0.03),
        hue: randomBetween(170, 185),
        sat: randomBetween(15, 30),
        light: randomBetween(60, 80),
        phase: randomBetween(0, Math.PI * 2),
        direction: Math.random() > 0.5 ? 1 : -1,
        tailPhase: randomBetween(0, Math.PI * 2),
      }))
    }

    const createSparkles = () => {
      const n = Math.round(12 * perf)
      sparkles = Array.from({ length: n }, () => ({
        x: randomBetween(0.05, 0.95),
        y: randomBetween(0.05, 0.95),
        size: randomBetween(1, 3),
        pulse: randomBetween(0, Math.PI * 2),
        pulseSpeed: randomBetween(0.006, 0.018),
        hue: randomBetween(40, 48),
        sat: 70,
        light: 78,
        opacity: randomBetween(0.2, 0.45),
      }))
    }

    const drawWaterGlows = () => {
      for (const g of waterGlows) {
        const cx = g.x * canvas.width
        const cy = g.y * canvas.height
        const pulse = 0.75 + 0.25 * Math.sin(time * g.speed + g.phase)
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, g.r * pulse)
        grad.addColorStop(0, `hsla(${g.hue}, ${g.sat}%, ${g.light + 15}%, ${g.opacity * 1.4})`)
        grad.addColorStop(0.4, `hsla(${g.hue}, ${g.sat}%, ${g.light}%, ${g.opacity})`)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(cx, cy, g.r * pulse, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const drawCorals = () => {
      for (const c of corals) {
        const cx = c.x * canvas.width
        const cy = c.baseY * canvas.height
        const sway = Math.sin(time * c.swaySpeed + c.phase) * c.swayAmp
        const glow = 0.65 + 0.35 * Math.sin(time * c.glowSpeed + c.glowPhase)
        const o = c.opacity * glow

        ctx.save()
        ctx.globalAlpha = o

        const stalkHue = c.hue - 10
        const stalkSat = c.sat - 10
        const stalkLight = c.light - 10

        ctx.beginPath()
        ctx.moveTo(cx - c.width * 0.08, cy)
        ctx.quadraticCurveTo(cx + sway * 0.15, cy - c.height * 0.4, cx + sway * 0.2, cy - c.height * 0.75)
        ctx.quadraticCurveTo(cx + sway * 0.15, cy - c.height * 0.9, cx + sway * 0.1, cy - c.height)
        ctx.quadraticCurveTo(cx + sway * 0.05, cy - c.height * 0.9, cx + sway * 0, cy - c.height * 0.75)
        ctx.quadraticCurveTo(cx - sway * 0.05, cy - c.height * 0.4, cx - c.width * 0.08, cy)
        ctx.closePath()
        ctx.fillStyle = `hsla(${stalkHue}, ${stalkSat}%, ${stalkLight}%, ${o * 0.7})`
        ctx.fill()

        const topX = cx + sway * 0.1
        const topY = cy - c.height
        const numTips = 3 + Math.floor(c.type * 1.5)
        for (let i = 0; i < numTips; i++) {
          const angle = (i / numTips) * Math.PI - Math.PI * 0.4 + Math.sin(time * 0.002 + c.phase + i) * 0.1
          const tipLen = c.width * (0.2 + Math.random() * 0.25)
          const tipX = topX + Math.sin(angle) * tipLen
          const tipY = topY - Math.cos(angle) * tipLen * 0.6
          const tipHue = c.hue + i * 5 + Math.sin(time * 0.004 + c.glowPhase + i * 2) * 3

          ctx.beginPath()
          ctx.moveTo(topX, topY)
          ctx.quadraticCurveTo(topX + Math.sin(angle) * tipLen * 0.4, topY - tipLen * 0.3, tipX, tipY)
          ctx.strokeStyle = `hsla(${tipHue}, ${c.sat + 10}%, ${c.light + 15}%, ${o * 0.9})`
          ctx.lineWidth = Math.max(1.5, c.width * 0.06 * (1 - i * 0.12))
          ctx.lineCap = 'round'
          ctx.stroke()

          const grad = ctx.createRadialGradient(tipX, tipY, 0, tipX, tipY, c.width * 0.12)
          grad.addColorStop(0, `hsla(${tipHue + 15}, 65%, 82%, ${o * 0.25})`)
          grad.addColorStop(1, 'transparent')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(tipX, tipY, c.width * 0.12, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()
      }
    }

    const drawBubbles = () => {
      for (const b of bubbles) {
        b.y -= b.speed
        b.wobble += b.wobbleSpeed
        b.x += Math.sin(b.wobble) * b.wobbleAmp

        if (b.y < -20) {
          b.y = canvas.height + randomBetween(10, 80)
          b.x = randomBetween(0, canvas.width)
          b.r = randomBetween(0.6, 3.5)
        }

        ctx.save()
        ctx.globalAlpha = b.opacity
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.strokeStyle = `hsla(${b.hue}, 30%, 75%, ${b.opacity * 0.5})`
        ctx.lineWidth = 0.4
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(b.x - b.r * 0.25, b.y - b.r * 0.25, b.r * 0.3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity * 0.25})`
        ctx.fill()
        ctx.restore()
      }
    }

    const drawParticles = () => {
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.pulse += p.pulseSpeed
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10
        if (p.y < -20) p.y = canvas.height + 20

        const o = p.opacity * (0.4 + 0.6 * Math.sin(p.pulse))

        if (p.isGlow && !isMobile) {
          ctx.save()
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5)
          grad.addColorStop(0, `hsla(${p.hue}, 55%, 82%, ${o * 0.1})`)
          grad.addColorStop(1, 'transparent')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }

        ctx.save()
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 35%, 75%, ${o})`
        ctx.fill()
        ctx.restore()
      }
    }

    const drawFish = () => {
      for (const f of fish) {
        f.x += f.speed * f.direction * 0.06
        f.tailPhase += 0.03

        if (f.x < -60) {
          f.x = canvas.width + 30
          f.y = randomBetween(0.25, 0.75)
          f.direction = -1
        }
        if (f.x > canvas.width + 60) {
          f.x = -30
          f.y = randomBetween(0.25, 0.75)
          f.direction = 1
        }

        const fy = f.y * canvas.height + Math.sin(time * 0.005 + f.phase) * 6
        const s = f.size
        const tail = Math.sin(f.tailPhase) * s * 0.2

        ctx.save()
        ctx.globalAlpha = f.opacity * (0.6 + 0.4 * Math.sin(time * 0.004 + f.phase))
        ctx.translate(f.x, fy)
        ctx.scale(f.direction * s, s)

        ctx.fillStyle = `hsla(${f.hue}, ${f.sat}%, ${f.light}%, 0.8)`
        ctx.strokeStyle = `hsla(${f.hue + 10}, ${f.sat + 10}%, ${f.light + 10}%, 0.2)`
        ctx.lineWidth = 0.3

        ctx.beginPath()
        ctx.ellipse(0, 0, 0.45, 0.18, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(0.45, 0)
        ctx.lineTo(0.7, -0.2 + tail)
        ctx.lineTo(0.7, 0.2 + tail)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(0.2, -0.04, 0.035, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(180, 70%, 92%, 0.5)`
        ctx.fill()

        ctx.restore()
      }
    }

    const drawLightRays = () => {
      if (isMobile) return
      const numRays = 3
      for (let i = 0; i < numRays; i++) {
        const rx = (i + 1) / (numRays + 1) * canvas.width + Math.sin(time * 0.003 + i * 2) * 15
        const rw = 12 + i * 6
        const rh = canvas.height * (0.35 + i * 0.08)
        const pulse = 0.5 + 0.5 * Math.sin(time * 0.002 + i * 1.5)

        ctx.save()
        ctx.globalAlpha = 0.01 * pulse

        const grad = ctx.createLinearGradient(rx, 0, rx + rw * 0.3, rh)
        grad.addColorStop(0, `hsla(180, 55%, 90%, 0.025)`)
        grad.addColorStop(0.4, `hsla(180, 40%, 82%, 0.012)`)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.moveTo(rx, 0)
        ctx.lineTo(rx + rw, 0)
        ctx.lineTo(rx + rw * 0.5, rh)
        ctx.lineTo(rx - rw * 0.1, rh * 0.8)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      }
    }

    const drawSparkles = () => {
      for (const s of sparkles) {
        s.pulse += s.pulseSpeed
        const o = s.opacity * (0.2 + 0.8 * Math.sin(s.pulse))
        const size = s.size * (isMobile ? 0.6 : 1)

        ctx.save()
        ctx.globalAlpha = o

        const sx = s.x * canvas.width
        const sy = s.y * canvas.height

        const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, size * 5)
        grad.addColorStop(0, `hsla(${s.hue}, ${s.sat}%, ${s.light}%, 0.9)`)
        grad.addColorStop(0.2, `hsla(${s.hue}, ${s.sat}%, ${s.light}%, 0.35)`)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(sx, sy, size * 5, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.arc(sx, sy, size * 0.4, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${s.hue}, ${s.sat + 10}%, ${s.light + 15}%, 0.95)`
        ctx.fill()

        ctx.restore()
      }
    }

    const drawDepthOverlay = () => {
      ctx.save()
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height)
      grad.addColorStop(0, 'rgba(22, 56, 59, 0)')
      grad.addColorStop(0.15, 'rgba(28, 75, 79, 0.015)')
      grad.addColorStop(0.5, 'rgba(22, 56, 59, 0)')
      grad.addColorStop(0.8, 'rgba(28, 75, 79, 0.015)')
      grad.addColorStop(1, 'rgba(22, 56, 59, 0.04)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.restore()
    }

    const init = () => {
      resize()
      createWaterGlows()
      createCorals()
      createBubbles()
      createParticles()
      createFish()
      createSparkles()
    }

    init()

    const animate = () => {
      time++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      drawWaterGlows()
      drawCorals()
      drawLightRays()
      drawFish()
      drawSparkles()
      drawParticles()
      drawBubbles()
      drawDepthOverlay()

      animId = requestAnimationFrame(animate)
    }

    animate()

    const onResize = () => resize()
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background: `
            radial-gradient(ellipse at 15% 30%, rgba(63, 163, 170, 0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 85% 20%, rgba(89, 184, 190, 0.04) 0%, transparent 45%),
            radial-gradient(ellipse at 50% 80%, rgba(41, 141, 148, 0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 50%, rgba(63, 163, 170, 0.03) 0%, transparent 40%),
            radial-gradient(ellipse at 25% 80%, rgba(41, 141, 148, 0.03) 0%, transparent 35%),
            linear-gradient(180deg,
              rgba(22, 56, 59, 0) 0%,
              rgba(28, 75, 79, 0.02) 20%,
              rgba(35, 97, 102, 0.02) 50%,
              rgba(28, 75, 79, 0.015) 75%,
              rgba(22, 56, 59, 0.04) 100%
            )
          `,
        }}
        aria-hidden="true"
      />
    </>
  )
}
