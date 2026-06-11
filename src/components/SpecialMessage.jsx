'use client'

import { motion } from 'framer-motion'
import { IoHeartOutline } from 'react-icons/io5'
import { FaQuoteLeft } from 'react-icons/fa'
import eventConfig from '@/config/event'

export default function SpecialMessage() {
  return (
    <section className="relative py-24 md:py-32 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/0 via-electric-500/5 to-navy-900/0" />

      <div className="relative max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <IoHeartOutline className="text-electric-500 text-xl" />
            <span className="text-electric-500/80 text-sm tracking-[0.3em] uppercase font-light">
              Con Amor
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            {eventConfig.specialMessage.title}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass p-8 md:p-12 relative"
        >
          <FaQuoteLeft className="absolute top-4 left-4 text-electric-500/20 text-6xl" />

          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white/80 text-lg md:text-xl leading-relaxed font-light italic text-center"
            >
              &ldquo;{eventConfig.specialMessage.content}&rdquo;
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-16 h-[1px] bg-electric-500/50 mx-auto mt-8"
            />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mt-6 text-electric-500 font-display text-lg"
            >
              — Hallie Aes
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
