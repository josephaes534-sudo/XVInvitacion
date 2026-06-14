'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import eventConfig from '../config/event'

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    const target = new Date(targetDate).getTime()

    const tick = () => {
      const now = Date.now()
      const diff = target - now

      if (diff <= 0) {
        setCompleted(true)
        return
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return { ...timeLeft, completed }
}

function CountdownItem({ value, label }) {
  const formatted = String(value).padStart(2, '0')

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      className="glass-card p-5 sm:p-7 md:p-9 text-center min-w-[85px] sm:min-w-[110px] md:min-w-[130px] relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(63,163,170,0.02)] pointer-events-none" />
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[rgba(63,163,170,0.15)] to-transparent" />
      <motion.div
        className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(63,163,170,0.04), transparent 70%)',
          filter: 'blur(20px)',
        }}
      />
      <motion.span
        key={value}
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-glow-soft relative"
        style={{ color: 'rgba(63, 163, 170, 0.9)' }}
      >
        {formatted}
      </motion.span>
      <span className="text-[rgba(255,255,255,0.25)] text-[10px] sm:text-xs uppercase tracking-[0.25em] mt-2 block font-medium relative">
        {label}
      </span>
    </motion.div>
  )
}

export default function CountdownSection() {
  const { days, hours, minutes, seconds, completed } = useCountdown(eventConfig.countdownDate)

  return (
    <section id="countdown" className="relative py-28 md:py-36 px-4">
      <div className="absolute inset-0 pointer-events-none" />
      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="section-label mb-3">
            <span>Cuenta Regresiva</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-3">
            Faltan
          </h2>
          <p className="text-[rgba(255,255,255,0.2)] text-sm md:text-base mb-14 max-w-md mx-auto font-light leading-relaxed">
            Cada segundo me acerca más a este día especial
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          {completed ? (
            <div className="text-center">
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.8 }}
                className="text-3xl md:text-4xl font-display font-bold text-glow-soft"
                style={{ color: 'rgba(63, 163, 170, 0.9)' }}
              >
                ¡Hoy es el gran día!
              </motion.p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              <CountdownItem value={days} label="Días" />
              <CountdownItem value={hours} label="Horas" />
              <CountdownItem value={minutes} label="Minutos" />
              <CountdownItem value={seconds} label="Segundos" />
            </div>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 text-[rgba(255,255,255,0.12)] text-xs tracking-[0.2em] uppercase"
        >
          {eventConfig.event.date}
        </motion.p>
      </div>
    </section>
  )
}
