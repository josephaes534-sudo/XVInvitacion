'use client'

import { motion } from 'framer-motion'
import { IoCalendarOutline, IoTimeOutline, IoLocationOutline } from 'react-icons/io5'
import eventConfig from '@/config/event'

const details = [
  {
    icon: IoCalendarOutline,
    label: 'Fecha',
    value: eventConfig.event.date,
  },
  {
    icon: IoTimeOutline,
    label: 'Hora',
    value: eventConfig.event.time,
  },
  {
    icon: IoLocationOutline,
    label: 'Lugar',
    value: eventConfig.event.venue,
    sub: eventConfig.event.address,
  },
]

export default function EventInfo() {
  return (
    <section id="evento" className="relative py-24 md:py-32 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/0 via-navy-800/30 to-navy-900/0" />

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-electric-500/80 text-sm tracking-[0.3em] uppercase font-light">
            El Evento
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-4">
            Te esperamos
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {details.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -5 }}
              className="glass p-6 md:p-8 text-center group cursor-default glow-blue"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-electric-500/10 text-electric-500 mb-4 group-hover:bg-electric-500/20 transition-all duration-300 group-hover:scale-110">
                <item.icon size={24} />
              </div>
              <h3 className="text-white/50 text-xs uppercase tracking-[0.2em] mb-2">
                {item.label}
              </h3>
              <p className="text-white font-display text-lg md:text-xl font-semibold">
                {item.value}
              </p>
              {item.sub && (
                <p className="text-white/40 text-sm mt-1">{item.sub}</p>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="glass inline-block px-8 py-4">
            <p className="text-white/50 text-xs uppercase tracking-[0.2em]">
              Código de vestimenta
            </p>
            <p className="text-electric-500 font-display text-lg">
              Formal / Gala
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
