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

    let corals = []
    let kelp = []
    let bubbles = []
    let particles = []
    let biolum = []
    let lightRays = []
    let reefSilhouettes = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
    }

    const createCorals = () => {
      const n = Math.round(8 * perf)
      corals = Array.from({ length: n }, () => ({
        x: 0.02 + Math.random() * 0.96,
        baseY: 0.5 + Math.random() * 0.45,
        branches: 3 + Math.floor(Math.random() * 5),
        height: 20 + Math.random() * 50,
        width: 15 + Math.random() * 35,
        hue: 175 + Math.random() * 60,
        sat: 50 + Math.random() * 40,
        light: 45 + Math.random() * 35,
        opacity: 0.12 + Math.random() * 0.15,
        phase: Math.random() * Math.PI * 2,
        swaySpeed: 0.003 + Math.random() * 0.005,
        swayAmp: 2 + Math.random() * 4,
        glowPhase: Math.random() * Math.PI * 2,
        glowSpeed: 0.005 + Math.random() * 0.01,
        type: Math.floor(Math.random() * 3),
      }))
    }

    const createKelp = () => {
      const n = isMobile ? 3 : 6
      kelp = Array.from({ length: n }, () => ({
        x: 0.05 + Math.random() * 0.9,
        height: 60 + Math.random() * 120,
        segments: 5 + Math.floor(Math.random() * 4),
        width: 6 + Math.random() * 12,
        hue: 140 + Math.random() * 40,
        sat: 30 + Math.random() * 30,
        light: 25 + Math.random() * 25,
        opacity: 0.04 + Math.random() * 0.06,
        phase: Math.random() * Math.PI * 2,
        swaySpeed: 0.002 + Math.random() * 0.004,
        swayAmp: 3 + Math.random() * 5,
      }))
    }

    const createReefSilhouettes = () => {
      const n = isMobile ? 2 : 4
      reefSilhouettes = Array.from({ length: n }, () => ({
        x: 0.05 + Math.random() * 0.9,
        width: 80 + Math.random() * 200,
        height: 30 + Math.random() * 70,
        hue: 210 + Math.random() * 30,
        light: 10 + Math.random() * 15,
        opacity: 0.03 + Math.random() * 0.04,
      }))
    }

    const createBubbles = () => {
      const n = Math.round(18 * perf)
      bubbles = Array.from({ length: n }, () => ({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100,
        r: 1 + Math.random() * (isMobile ? 2 : 3.5),
        speed: 0.15 + Math.random() * 0.4,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.006 + Math.random() * 0.012,
        wobbleAmp: 0.3 + Math.random() * 0.6,
        opacity: 0.03 + Math.random() * 0.07,
        hue: 185 + Math.random() * 25,
      }))
    }

    const createParticles = () => {
      const n = Math.round(50 * perf)
      particles = Array.from({ length: n }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 0.3 + Math.random() * (Math.random() > 0.8 ? 2.5 : 1.2),
        opacity: 0.01 + Math.random() * 0.05,
        vx: (Math.random() - 0.5) * 0.03,
        vy: -0.005 - Math.random() * 0.025,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.003 + Math.random() * 0.008,
        hue: 170 + Math.random() * 40,
        isGlow: Math.random() > 0.85,
      }))
    }

    const createBiolum = () => {
      const n = Math.round(10 * perf)
      biolum = Array.from({ length: n }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 1.5 + Math.random() * 3,
        life: Math.random() * 500,
        maxLife: 400 + Math.random() * 500,
        angle: Math.random() * Math.PI * 2,
        speed: 0.08 + Math.random() * 0.15,
        phase: Math.random() * Math.PI * 2,
        opacity: 0.08 + Math.random() * 0.2,
        hue: 140 + Math.random() * 70,
      }))
    }

    const createLightRays = () => {
      const n = isMobile ? 2 : 5
      lightRays = Array.from({ length: n }, () => ({
        x: 0.05 + Math.random() * 0.9,
        width: 10 + Math.random() * 28,
        height: 0.3 + Math.random() * 0.4,
        opacity: 0.008 + Math.random() * 0.015,
        speed: 0.008 + Math.random() * 0.018,
        angle: -20 + Math.random() * 40,
        hue: 190 + Math.random() * 30,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const drawReefSilhouettes = () => {
      for (const r of reefSilhouettes) {
        const rx = r.x * canvas.width
        const ry = canvas.height
        ctx.save()
        ctx.globalAlpha = r.opacity
        ctx.fillStyle = `hsla(${r.hue}, 30%, ${r.light}%, 1)`
        ctx.beginPath()
        ctx.moveTo(rx - r.width / 2, ry)
        for (let i = 0; i <= 20; i++) {
          const t = i / 20
          const px = rx - r.width / 2 + t * r.width
          const py = ry - r.height * (0.3 + 0.7 * Math.sin(t * Math.PI) * (0.6 + 0.4 * Math.sin(t * 5 + r.x)))
          ctx.lineTo(px, py)
        }
        ctx.lineTo(rx + r.width / 2, ry)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      }
    }

    const drawCorals = () => {
      for (const c of corals) {
        const cx = c.x * canvas.width
        const cy = c.baseY * canvas.height
        const sway = Math.sin(time * c.swaySpeed + c.phase) * c.swayAmp
        const glow = 0.7 + 0.3 * Math.sin(time * c.glowSpeed + c.glowPhase)
        const o = c.opacity * glow

        ctx.save()
        ctx.globalAlpha = o

        const baseHue = c.hue
        const baseSat = c.sat
        const baseLight = c.light

        const drawBranch = (x, y, angle, length, depth, maxDepth) => {
          if (depth > maxDepth || length < 3) return
          const endX = x + Math.sin(angle + sway * 0.02) * length
          const endY = y - Math.cos(angle) * length * 0.9
          const branchHue = baseHue + depth * 5
          const branchSat = baseSat + depth * 3
          const branchLight = baseLight + depth * 3

          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.quadraticCurveTo(
            x + Math.sin(angle + sway * 0.02) * length * 0.5 + Math.cos(angle) * length * 0.15,
            y - Math.cos(angle) * length * 0.5,
            endX,
            endY
          )
          ctx.strokeStyle = `hsla(${branchHue}, ${branchSat}%, ${branchLight}%, ${o * (1 - depth * 0.12)})`
          ctx.lineWidth = Math.max(1.5, 4 - depth * 0.8)
          ctx.lineCap = 'round'
          ctx.stroke()

          const glowSize = 4 + depth * 1.2
          const grad = ctx.createRadialGradient(endX, endY, 0, endX, endY, glowSize * 3)
          grad.addColorStop(0, `hsla(${branchHue}, 100%, 80%, ${o * 0.15 * (1 - depth * 0.1)})`)
          grad.addColorStop(1, 'transparent')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(endX, endY, glowSize * 3, 0, Math.PI * 2)
          ctx.fill()

          const numBranches = depth === 0 ? c.branches : 1 + Math.floor(Math.random() * 2)
          for (let i = 0; i < numBranches; i++) {
            const branchAngle = angle + (Math.random() - 0.5) * 1.2
            const branchLength = length * (0.5 + Math.random() * 0.35)
            drawBranch(endX, endY, branchAngle, branchLength, depth + 1, maxDepth)
          }
        }

        drawBranch(cx, cy, Math.PI / 2 + (Math.random() - 0.5) * 0.3, c.height, 0, 2 + Math.floor(c.branches / 2))
        ctx.restore()
      }
    }

    const drawKelp = () => {
      for (const k of kelp) {
        const kx = k.x * canvas.width
        const ky = canvas.height
        ctx.save()
        ctx.globalAlpha = k.opacity

        for (let i = 0; i < k.segments; i++) {
          const fi = i / k.segments
          const sw = Math.sin(time * k.swaySpeed + k.phase + fi * 0.8) * k.swayAmp * (1 - fi * 0.15)
          const sy = ky - i * (k.height / k.segments)
          const ew = k.width * (1 - fi * 0.2)

          ctx.beginPath()
          ctx.ellipse(kx + sw, sy, ew / 2, k.height / k.segments / 2.5, 0, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${k.hue}, ${k.sat}%, ${k.light + i * 2}%, ${k.opacity * (1 - fi * 0.2)})`
          ctx.fill()

          const glow = ctx.createRadialGradient(kx + sw, sy, 0, kx + sw, sy, ew * 1.2)
          glow.addColorStop(0, `hsla(${k.hue + 20}, 80%, 70%, ${k.opacity * 0.08 * (1 - fi * 0.3)})`)
          glow.addColorStop(1, 'transparent')
          ctx.fillStyle = glow
          ctx.beginPath()
          ctx.arc(kx + sw, sy, ew * 1.2, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }
    }

    const drawLightRays = () => {
      for (const r of lightRays) {
        const rx = r.x * canvas.width
        const rh = r.height * canvas.height
        const ox = Math.sin(time * r.speed + r.phase) * 6
        ctx.save()
        ctx.globalAlpha = r.opacity * (0.5 + 0.5 * Math.sin(time * 0.004 + r.phase))

        const grad = ctx.createLinearGradient(rx + ox, 0, rx + r.width * 0.4 + ox, rh)
        grad.addColorStop(0, `hsla(${r.hue}, 80%, 85%, 0.03)`)
        grad.addColorStop(0.3, `hsla(${r.hue}, 60%, 75%, 0.015)`)
        grad.addColorStop(0.7, `hsla(${r.hue}, 40%, 60%, 0.005)`)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.moveTo(rx + ox, 0)
        ctx.lineTo(rx + r.width + ox, 0)
        ctx.lineTo(rx + r.width * 0.6 + ox + 8, rh)
        ctx.lineTo(rx + r.width * 0.4 + ox - 8, rh)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      }
    }

    const drawBubbles = () => {
      for (const b of bubbles) {
        b.y -= b.speed
        b.wobble += b.wobbleSpeed
        b.x += Math.sin(b.wobble) * b.wobbleAmp
        if (b.y < -20) {
          b.y = canvas.height + 20 + Math.random() * 40
          b.x = Math.random() * canvas.width
          b.r = 1 + Math.random() * (isMobile ? 2 : 3.5)
        }

        ctx.save()
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.strokeStyle = `hsla(${b.hue}, 50%, 75%, ${b.opacity * 0.7})`
        ctx.lineWidth = 0.5
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(b.x - b.r * 0.25, b.y - b.r * 0.25, b.r * 0.3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity * 0.35})`
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
          grad.addColorStop(0, `hsla(${p.hue}, 80%, 80%, ${o * 0.15})`)
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
        ctx.fillStyle = `hsla(${p.hue}, 60%, 80%, ${o})`
        ctx.fill()
        ctx.restore()
      }
    }

    const drawBiolum = () => {
      for (const b of biolum) {
        b.life++
        if (b.life > b.maxLife) {
          b.life = 0
          b.x = Math.random() * canvas.width
          b.y = Math.random() * canvas.height
        }
        b.angle += 0.003
        b.x += Math.cos(b.angle) * 0.08
        b.y += Math.sin(b.angle) * 0.05
        b.phase += 0.01
        if (b.x < -10 || b.x > canvas.width + 10 || b.y < -10 || b.y > canvas.height + 10) {
          b.x = Math.random() * canvas.width
          b.y = Math.random() * canvas.height
        }

        const progress = b.life / b.maxLife
        const fadeIn = Math.min(progress * 4, 1)
        const fadeOut = Math.max(1 - progress * 1.5, 0)
        const o = b.opacity * fadeIn * fadeOut * (0.4 + 0.6 * Math.sin(b.phase))

        if (o < 0.003) continue

        ctx.save()
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * 7)
        grad.addColorStop(0, `hsla(${b.hue}, 100%, 85%, ${o * 0.5})`)
        grad.addColorStop(0.2, `hsla(${b.hue}, 100%, 75%, ${o * 0.2})`)
        grad.addColorStop(0.5, `hsla(${b.hue}, 80%, 65%, ${o * 0.06})`)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r * 7, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    const drawWaterShimmer = () => {
      if (isMobile) return
      ctx.save()
      for (let i = 0; i < 3; i++) {
        const y = canvas.height - 25 + i * 12
        ctx.beginPath()
        ctx.moveTo(0, y)
        for (let x = 0; x <= canvas.width; x += 3) {
          const wy = Math.sin(x * 0.007 + time * 0.003 + i * 2.2) * 3
          const wa = Math.sin(x * 0.015 + time * 0.005 + i * 1.5) * 0.5
          ctx.lineTo(x, y + wy + wa)
        }
        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()
        ctx.fillStyle = `rgba(0, 200, 255, ${0.005 + i * 0.003})`
        ctx.fill()
      }
      ctx.restore()
    }

    const drawDepthOverlay = () => {
      if (isMobile) return
      ctx.save()
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height)
      grad.addColorStop(0, 'rgba(6, 14, 26, 0)')
      grad.addColorStop(0.15, 'rgba(6, 14, 26, 0.02)')
      grad.addColorStop(0.5, 'rgba(6, 14, 26, 0)')
      grad.addColorStop(0.85, 'rgba(6, 14, 26, 0.02)')
      grad.addColorStop(1, 'rgba(6, 14, 26, 0.05)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.restore()
    }

    const init = () => {
      resize()
      createCorals()
      createKelp()
      createReefSilhouettes()
      createBubbles()
      createParticles()
      createBiolum()
      createLightRays()
    }

    init()

    const animate = () => {
      time++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      drawReefSilhouettes()
      drawLightRays()
      drawKelp()
      drawCorals()
      drawBiolum()
      drawParticles()
      drawBubbles()
      drawWaterShimmer()
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
            radial-gradient(ellipse at 15% 40%, rgba(0, 80, 160, 0.05) 0%, transparent 55%),
            radial-gradient(ellipse at 85% 25%, rgba(0, 160, 220, 0.04) 0%, transparent 45%),
            radial-gradient(ellipse at 45% 75%, rgba(0, 60, 140, 0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 85%, rgba(0, 120, 200, 0.03) 0%, transparent 40%),
            radial-gradient(ellipse at 25% 15%, rgba(0, 200, 255, 0.03) 0%, transparent 40%),
            linear-gradient(180deg,
              rgba(6, 14, 26, 0) 0%,
              rgba(0, 60, 140, 0.01) 20%,
              rgba(0, 40, 100, 0.02) 50%,
              rgba(0, 60, 140, 0.01) 80%,
              rgba(6, 14, 26, 0.03) 100%
            )
          `,
        }}
        aria-hidden="true"
      />
    </>
  )
}
