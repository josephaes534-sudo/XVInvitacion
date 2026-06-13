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
    const perf = isMobile || isSlow ? 0.3 : 1

    let time = 0

    let deepWater = []
    let corals = []
    let kelp = []
    let lightRays = []
    let bubbles = []
    let particles = []
    let biolum = []
    let fish = []
    let reefSilhouettes = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
    }

    const createDeepWater = () => {
      const n = isMobile ? 2 : 4
      deepWater = Array.from({ length: n }, () => ({
        x: 0.05 + Math.random() * 0.9,
        y: 0.05 + Math.random() * 0.9,
        r: 120 + Math.random() * 250,
        hue: 200 + Math.random() * 40,
        sat: 40 + Math.random() * 30,
        light: 15 + Math.random() * 20,
        opacity: 0.02 + Math.random() * 0.03,
        speed: 0.001 + Math.random() * 0.003,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const createReefSilhouettes = () => {
      const n = isMobile ? 2 : 4
      reefSilhouettes = Array.from({ length: n }, () => ({
        x: 0.05 + Math.random() * 0.9,
        width: 100 + Math.random() * 250,
        height: 40 + Math.random() * 80,
        hue: 210 + Math.random() * 30,
        light: 8 + Math.random() * 12,
        opacity: 0.02 + Math.random() * 0.03,
        complexity: 0.4 + Math.random() * 0.6,
        detail: 0.5 + Math.random() * 0.5,
      }))
    }

    const createCorals = () => {
      const n = Math.round(10 * perf)
      corals = Array.from({ length: n }, () => ({
        x: 0.02 + Math.random() * 0.96,
        baseY: 0.45 + Math.random() * 0.5,
        branches: 3 + Math.floor(Math.random() * 6),
        height: 25 + Math.random() * 60,
        width: 18 + Math.random() * 40,
        hue: 175 + Math.random() * 65,
        sat: 50 + Math.random() * 40,
        light: 40 + Math.random() * 35,
        opacity: 0.1 + Math.random() * 0.18,
        phase: Math.random() * Math.PI * 2,
        swaySpeed: 0.002 + Math.random() * 0.005,
        swayAmp: 2 + Math.random() * 5,
        glowPhase: Math.random() * Math.PI * 2,
        glowSpeed: 0.004 + Math.random() * 0.012,
        type: Math.floor(Math.random() * 3),
      }))
    }

    const createKelp = () => {
      const n = isMobile ? 4 : 8
      kelp = Array.from({ length: n }, () => ({
        x: 0.03 + Math.random() * 0.94,
        height: 50 + Math.random() * 140,
        segments: 4 + Math.floor(Math.random() * 5),
        width: 5 + Math.random() * 14,
        hue: 130 + Math.random() * 50,
        sat: 25 + Math.random() * 35,
        light: 20 + Math.random() * 30,
        opacity: 0.03 + Math.random() * 0.07,
        phase: Math.random() * Math.PI * 2,
        swaySpeed: 0.002 + Math.random() * 0.005,
        swayAmp: 2 + Math.random() * 6,
      }))
    }

    const createLightRays = () => {
      const n = isMobile ? 2 : 6
      lightRays = Array.from({ length: n }, () => ({
        x: 0.03 + Math.random() * 0.94,
        width: 8 + Math.random() * 30,
        height: 0.25 + Math.random() * 0.45,
        opacity: 0.006 + Math.random() * 0.014,
        speed: 0.006 + Math.random() * 0.015,
        hue: 190 + Math.random() * 35,
        phase: Math.random() * Math.PI * 2,
        drift: (Math.random() - 0.5) * 8,
      }))
    }

    const createBubbles = () => {
      const n = Math.round(25 * perf)
      bubbles = Array.from({ length: n }, () => ({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 120,
        r: 0.8 + Math.random() * (isMobile ? 2.5 : 4),
        speed: 0.12 + Math.random() * 0.45,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.005 + Math.random() * 0.014,
        wobbleAmp: 0.2 + Math.random() * 0.7,
        opacity: 0.02 + Math.random() * 0.08,
        hue: 185 + Math.random() * 25,
        depth: Math.random(),
      }))
    }

    const createParticles = () => {
      const n = Math.round(60 * perf)
      particles = Array.from({ length: n }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 0.2 + Math.random() * (Math.random() > 0.85 ? 2.5 : 1),
        opacity: 0.008 + Math.random() * 0.04,
        vx: (Math.random() - 0.5) * 0.025,
        vy: -0.003 - Math.random() * 0.02,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.002 + Math.random() * 0.008,
        hue: 170 + Math.random() * 45,
        isGlow: Math.random() > 0.88,
      }))
    }

    const createBiolum = () => {
      const n = Math.round(12 * perf)
      biolum = Array.from({ length: n }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 1.5 + Math.random() * 3.5,
        life: Math.random() * 600,
        maxLife: 400 + Math.random() * 600,
        angle: Math.random() * Math.PI * 2,
        speed: 0.06 + Math.random() * 0.12,
        phase: Math.random() * Math.PI * 2,
        opacity: 0.06 + Math.random() * 0.2,
        hue: 135 + Math.random() * 80,
      }))
    }

    const createFish = () => {
      const n = isMobile ? 2 : 5
      fish = Array.from({ length: n }, () => ({
        x: Math.random() * canvas.width,
        y: 0.2 + Math.random() * 0.7,
        size: 6 + Math.random() * 14,
        speed: 0.15 + Math.random() * 0.35,
        opacity: 0.02 + Math.random() * 0.04,
        hue: 180 + Math.random() * 60,
        sat: 30 + Math.random() * 40,
        light: 50 + Math.random() * 30,
        phase: Math.random() * Math.PI * 2,
        direction: Math.random() > 0.5 ? 1 : -1,
        depth: Math.random(),
        tailPhase: Math.random() * Math.PI * 2,
      }))
    }

    const drawDeepWater = () => {
      for (const d of deepWater) {
        const cx = d.x * canvas.width
        const cy = d.y * canvas.height
        const pulse = 0.7 + 0.3 * Math.sin(time * d.speed + d.phase)
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, d.r * pulse)
        grad.addColorStop(0, `hsla(${d.hue}, ${d.sat}%, ${d.light + 10}%, ${d.opacity * 1.3})`)
        grad.addColorStop(0.5, `hsla(${d.hue}, ${d.sat}%, ${d.light}%, ${d.opacity})`)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(cx, cy, d.r * pulse, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const drawReefSilhouettes = () => {
      for (const r of reefSilhouettes) {
        const rx = r.x * canvas.width
        const ry = canvas.height
        ctx.save()
        ctx.globalAlpha = r.opacity
        ctx.fillStyle = `hsla(${r.hue}, 20%, ${r.light}%, 1)`
        ctx.beginPath()
        ctx.moveTo(rx - r.width / 2, ry)
        for (let i = 0; i <= 30; i++) {
          const t = i / 30
          const detail = Math.sin(t * 12 * r.detail + r.x * 5) * 0.15 + Math.sin(t * 7) * 0.1
          const shape = 0.3 + 0.7 * Math.sin(t * Math.PI) * (0.5 + 0.5 * (detail * r.complexity + (1 - r.complexity) * 0.5))
          const px = rx - r.width / 2 + t * r.width
          const py = ry - r.height * shape
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
        const glow = 0.6 + 0.4 * Math.sin(time * c.glowSpeed + c.glowPhase)
        const o = c.opacity * glow

        ctx.save()
        ctx.globalAlpha = o

        const drawBranch = (x, y, angle, length, depth, maxDepth) => {
          if (depth > maxDepth || length < 3) return
          const endX = x + Math.sin(angle + sway * 0.015) * length
          const endY = y - Math.cos(angle) * length * 0.9
          const branchHue = c.hue + depth * 6 + Math.sin(time * 0.005 + c.phase + depth) * 3
          const branchSat = c.sat + depth * 4
          const branchLight = c.light + depth * 4

          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.quadraticCurveTo(
            x + Math.sin(angle + sway * 0.015) * length * 0.5 + Math.cos(angle) * length * 0.12,
            y - Math.cos(angle) * length * 0.5,
            endX,
            endY
          )
          ctx.strokeStyle = `hsla(${branchHue}, ${branchSat}%, ${branchLight}%, ${o * (1 - depth * 0.1)})`
          ctx.lineWidth = Math.max(1.2, 4 - depth * 0.7)
          ctx.lineCap = 'round'
          ctx.stroke()

          if (depth >= 1) {
            const glowSize = 3 + depth * 1.5
            const grad = ctx.createRadialGradient(endX, endY, 0, endX, endY, glowSize * 4)
            grad.addColorStop(0, `hsla(${branchHue + 20}, 100%, 85%, ${o * 0.12 * (1 - depth * 0.08)})`)
            grad.addColorStop(1, 'transparent')
            ctx.fillStyle = grad
            ctx.beginPath()
            ctx.arc(endX, endY, glowSize * 4, 0, Math.PI * 2)
            ctx.fill()
          }

          const numBranches = depth === 0 ? c.branches : 1 + Math.floor(Math.random() * 2)
          for (let i = 0; i < numBranches; i++) {
            const branchAngle = angle + (Math.random() - 0.5) * 1.0 + i * 0.3
            const branchLength = length * (0.45 + Math.random() * 0.35)
            drawBranch(endX, endY, branchAngle, branchLength, depth + 1, maxDepth)
          }
        }

        drawBranch(cx, cy, Math.PI / 2 + (Math.random() - 0.5) * 0.25, c.height, 0, 2 + Math.floor(c.branches / 2.5))
        ctx.restore()
      }
    }

    const drawKelp = () => {
      for (const k of kelp) {
        const kx = k.x * canvas.width
        const ky = canvas.height - 5
        ctx.save()
        ctx.globalAlpha = k.opacity

        for (let i = 0; i < k.segments; i++) {
          const fi = i / k.segments
          const sw = Math.sin(time * k.swaySpeed + k.phase + fi * 0.9) * k.swayAmp * (1 - fi * 0.12)
          const sy = ky - i * (k.height / k.segments)
          const ew = k.width * (1 - fi * 0.18)

          ctx.beginPath()
          ctx.ellipse(kx + sw, sy, ew / 2, k.height / k.segments / 2.5, 0, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${k.hue}, ${k.sat}%, ${k.light + i * 2}%, ${k.opacity * (1 - fi * 0.15)})`
          ctx.fill()

          const glow = ctx.createRadialGradient(kx + sw, sy, 0, kx + sw, sy, ew * 1.5)
          glow.addColorStop(0, `hsla(${k.hue + 15}, 70%, 70%, ${k.opacity * 0.06 * (1 - fi * 0.2)})`)
          glow.addColorStop(1, 'transparent')
          ctx.fillStyle = glow
          ctx.beginPath()
          ctx.arc(kx + sw, sy, ew * 1.5, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }
    }

    const drawLightRays = () => {
      for (const r of lightRays) {
        const rx = r.x * canvas.width
        const rh = r.height * canvas.height
        const ox = Math.sin(time * r.speed + r.phase) * r.drift
        ctx.save()
        const pulse = 0.5 + 0.5 * Math.sin(time * 0.003 + r.phase)
        ctx.globalAlpha = r.opacity * pulse

        const grad = ctx.createLinearGradient(rx + ox, 0, rx + r.width * 0.4 + ox, rh)
        grad.addColorStop(0, `hsla(${r.hue}, 70%, 85%, 0.025)`)
        grad.addColorStop(0.3, `hsla(${r.hue}, 50%, 75%, 0.012)`)
        grad.addColorStop(0.7, `hsla(${r.hue}, 30%, 60%, 0.004)`)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.moveTo(rx + ox, 0)
        ctx.lineTo(rx + r.width + ox, 0)
        ctx.lineTo(rx + r.width * 0.6 + ox + 6, rh)
        ctx.lineTo(rx + r.width * 0.4 + ox - 6, rh)
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
          b.y = canvas.height + 20 + Math.random() * 60
          b.x = Math.random() * canvas.width
          b.r = 0.8 + Math.random() * (isMobile ? 2.5 : 4)
        }

        ctx.save()
        const depthFactor = 0.4 + b.depth * 0.6
        ctx.globalAlpha = b.opacity * depthFactor
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.strokeStyle = `hsla(${b.hue}, 40%, 70%, ${b.opacity * 0.6 * depthFactor})`
        ctx.lineWidth = 0.4
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(b.x - b.r * 0.25, b.y - b.r * 0.25, b.r * 0.3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity * 0.3 * depthFactor})`
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

        const o = p.opacity * (0.3 + 0.7 * Math.sin(p.pulse))

        if (p.isGlow && !isMobile) {
          ctx.save()
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6)
          grad.addColorStop(0, `hsla(${p.hue}, 80%, 85%, ${o * 0.12})`)
          grad.addColorStop(1, 'transparent')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }

        ctx.save()
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 50%, 80%, ${o})`
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
        b.angle += 0.002
        b.x += Math.cos(b.angle) * 0.06
        b.y += Math.sin(b.angle) * 0.04
        b.phase += 0.008
        if (b.x < -10 || b.x > canvas.width + 10 || b.y < -10 || b.y > canvas.height + 10) {
          b.x = Math.random() * canvas.width
          b.y = Math.random() * canvas.height
        }

        const progress = b.life / b.maxLife
        const fadeIn = Math.min(progress * 5, 1)
        const fadeOut = Math.max(1 - progress * 1.8, 0)
        const o = b.opacity * fadeIn * fadeOut * (0.3 + 0.7 * Math.sin(b.phase))

        if (o < 0.002) continue

        ctx.save()
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * 8)
        grad.addColorStop(0, `hsla(${b.hue}, 100%, 90%, ${o * 0.4})`)
        grad.addColorStop(0.2, `hsla(${b.hue}, 100%, 80%, ${o * 0.15})`)
        grad.addColorStop(0.5, `hsla(${b.hue}, 80%, 70%, ${o * 0.05})`)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r * 8, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    const drawFish = () => {
      for (const f of fish) {
        f.x += f.speed * f.direction * 0.08
        f.tailPhase += 0.05

        if (f.x < -50) {
          f.x = canvas.width + 20
          f.y = 0.2 + Math.random() * 0.7
          f.direction = -1
        }
        if (f.x > canvas.width + 50) {
          f.x = -20
          f.y = 0.2 + Math.random() * 0.7
          f.direction = 1
        }

        const fy = f.y * canvas.height + Math.sin(time * 0.008 + f.phase) * 8
        const size = f.size
        const tailWag = Math.sin(f.tailPhase) * size * 0.25

        ctx.save()
        ctx.globalAlpha = f.opacity * (0.6 + 0.4 * Math.sin(time * 0.005 + f.phase))
        ctx.translate(f.x, fy)
        ctx.scale(f.direction * size, size)

        ctx.fillStyle = `hsla(${f.hue}, ${f.sat}%, ${f.light}%, 0.9)`
        ctx.strokeStyle = `hsla(${f.hue + 10}, ${f.sat + 10}%, ${f.light + 10}%, 0.3)`
        ctx.lineWidth = 0.3

        ctx.beginPath()
        ctx.ellipse(0, 0, 0.5, 0.2, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(0.5, 0)
        ctx.lineTo(0.8, -0.25 + tailWag * 0.3)
        ctx.lineTo(0.8, 0.25 + tailWag * 0.3)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(0.2, -0.05, 0.04, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(200, 80%, 90%, 0.6)`
        ctx.fill()

        ctx.restore()
      }
    }

    const drawWaterShimmer = () => {
      if (isMobile) return
      ctx.save()
      for (let i = 0; i < 3; i++) {
        const y = canvas.height - 20 + i * 10
        ctx.beginPath()
        ctx.moveTo(0, y)
        for (let x = 0; x <= canvas.width; x += 2) {
          const wy = Math.sin(x * 0.006 + time * 0.003 + i * 2.5) * 2.5
          ctx.lineTo(x, y + wy)
        }
        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()
        ctx.fillStyle = `rgba(0, 200, 255, ${0.004 + i * 0.002})`
        ctx.fill()
      }
      ctx.restore()
    }

    const drawDepthOverlay = () => {
      ctx.save()
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height)
      grad.addColorStop(0, 'rgba(6, 14, 26, 0)')
      grad.addColorStop(0.1, 'rgba(6, 14, 26, 0.015)')
      grad.addColorStop(0.4, 'rgba(6, 14, 26, 0)')
      grad.addColorStop(0.7, 'rgba(6, 14, 26, 0.01)')
      grad.addColorStop(0.9, 'rgba(6, 14, 26, 0.02)')
      grad.addColorStop(1, 'rgba(6, 14, 26, 0.04)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.restore()
    }

    const init = () => {
      resize()
      createDeepWater()
      createReefSilhouettes()
      createCorals()
      createKelp()
      createLightRays()
      createBubbles()
      createParticles()
      createBiolum()
      createFish()
    }

    init()

    const animate = () => {
      time++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      drawDeepWater()
      drawReefSilhouettes()
      drawKelp()
      drawCorals()
      drawLightRays()
      drawBiolum()
      drawFish()
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
            radial-gradient(ellipse at 10% 35%, rgba(0, 70, 140, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 90% 20%, rgba(0, 150, 220, 0.05) 0%, transparent 45%),
            radial-gradient(ellipse at 40% 80%, rgba(0, 50, 120, 0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 75% 70%, rgba(0, 100, 190, 0.04) 0%, transparent 40%),
            radial-gradient(ellipse at 20% 10%, rgba(0, 190, 255, 0.04) 0%, transparent 40%),
            radial-gradient(ellipse at 55% 90%, rgba(0, 80, 160, 0.03) 0%, transparent 35%),
            linear-gradient(180deg,
              rgba(6, 14, 26, 0) 0%,
              rgba(0, 50, 120, 0.015) 15%,
              rgba(0, 30, 80, 0.02) 40%,
              rgba(0, 40, 100, 0.015) 65%,
              rgba(0, 50, 120, 0.02) 85%,
              rgba(6, 14, 26, 0.04) 100%
            )
          `,
        }}
        aria-hidden="true"
      />
    </>
  )
}
