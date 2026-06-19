'use client'

import { motion } from 'framer-motion'
import { IoCalendarOutline, IoTimeOutline, IoLocationOutline } from 'react-icons/io5'
import eventConfig from '../config/event'

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

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.23, 1, 0.32, 1] },
  }),
}

export default function EventInfo() {
  return (
    <section id="evento" className="relative py-28 md:py-36 px-4">
      <div className="absolute inset-0 pointer-events-none" />
      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <div className="section-label mb-3">
            <span>El Evento</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white">
            Te esperamos
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {details.map((item, index) => (
            <motion.div
              key={item.label}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="glass-card p-7 md:p-9 text-center group cursor-default relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(41,141,148,0.015)] pointer-events-none" />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[rgba(41,141,148,0.06)] text-[rgba(41,141,148,0.7)] mb-5 group-hover:bg-[rgba(41,141,148,0.1)] group-hover:scale-110 group-hover:rounded-xl transition-all duration-500">
                  <item.icon size={24} />
                </div>
                <h3 className="text-white/75 text-[11px] uppercase tracking-[0.25em] mb-2 font-medium">
                  {item.label}
                </h3>
                <p className="text-white font-display text-lg md:text-xl font-semibold tracking-tight">
                  {item.value}
                </p>
                {item.sub && (
                  <p className="text-white/75 text-sm mt-1.5 font-light">
                    {item.sub}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="mt-10 text-center"
        >
          <a
            href="https://maps.app.goo.gl/F2UBnQ64oerwfiA66?g_st=aw"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary group inline-flex"
          >
            <IoLocationOutline size={16} className="group-hover:text-[rgba(41,141,148,0.6)] transition-colors" />
            <span>Ver Ubicación</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
