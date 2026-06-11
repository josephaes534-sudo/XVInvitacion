'use client'

import { motion } from 'framer-motion'
import Countdown from 'react-countdown'
import { IoTimeOutline } from 'react-icons/io5'
import eventConfig from '@/config/event'

function CountdownItem({ value, label }) {
  const formatted = String(value).padStart(2, '0')

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="glass p-4 sm:p-6 md:p-8 text-center min-w-[80px] sm:min-w-[100px] md:min-w-[120px] glow-blue"
    >
      <motion.span
        key={value}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold"
        style={{ color: '#00d4ff' }}
      >
        {formatted}
      </motion.span>
      <span className="text-white/50 text-xs sm:text-sm uppercase tracking-[0.2em] mt-2 block">
        {label}
      </span>
    </motion.div>
  )
}

function renderer({ days, hours, minutes, seconds, completed }) {
  if (completed) {
    return (
      <div className="text-center">
        <motion.p
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-3xl md:text-4xl font-display"
          style={{ color: '#00d4ff' }}
        >
          &iexcl;Hoy es el gran d&iacute;a!
        </motion.p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      <CountdownItem value={days} label="D&iacute;as" />
      <CountdownItem value={hours} label="Horas" />
      <CountdownItem value={minutes} label="Minutos" />
      <CountdownItem value={seconds} label="Segundos" />
    </div>
  )
}

export default function CountdownSection() {
  return (
    <section id="countdown" className="relative py-24 md:py-32 px-4">
      <div className="absolute inset-0 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <IoTimeOutline className="text-[#00d4ff] text-xl" />
            <span className="text-[#00d4ff]/80 text-sm tracking-[0.3em] uppercase font-light">
              Cuenta Regresiva
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Faltan
          </h2>

          <p className="text-white/40 text-sm md:text-base mb-12 max-w-md mx-auto font-light">
            Cada segundo me acerca m&aacute;s a este d&iacute;a especial
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Countdown
            date={new Date(eventConfig.countdownDate)}
            renderer={renderer}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 text-white/20 text-sm"
        >
          {eventConfig.event.date}
        </motion.p>
      </div>
    </section>
  )
}
