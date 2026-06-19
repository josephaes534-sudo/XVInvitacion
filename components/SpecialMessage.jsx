'use client'

import { motion } from 'framer-motion'
import eventConfig from '../config/event'

export default function SpecialMessage() {
  return (
    <section className="relative py-28 md:py-36 px-4">
      <div className="absolute inset-0 pointer-events-none" />
      <div className="relative max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-12"
        >
          <div className="section-label mb-3">
            <span>Con Amor</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white">
            {eventConfig.specialMessage.title}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          className="glass-card p-9 md:p-14 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(41,141,148,0.02)] via-transparent to-transparent pointer-events-none" />

          <div className="absolute top-6 left-6 text-[rgba(228,199,107,0.08)] text-7xl font-serif leading-none select-none pointer-events-none">
            &ldquo;
          </div>

          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="text-white/80 text-lg md:text-xl lg:text-2xl leading-[1.8] font-light italic text-center px-4"
            >
              &ldquo;{eventConfig.specialMessage.content}&rdquo;
            </motion.p>

            {eventConfig.specialMessage.highlight && (
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-center mt-6 text-lg md:text-xl font-bold tracking-wide"
                style={{ color: 'rgba(228, 199, 107, 0.8)' }}
              >
                {eventConfig.specialMessage.highlight}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="section-divider"
            />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-center mt-6 font-display text-lg md:text-xl"
              style={{ color: 'rgba(228, 199, 107, 0.6)' }}
            >
              &mdash; {eventConfig.specialMessage.from}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
