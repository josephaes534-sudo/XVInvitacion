'use client'

import { motion } from 'framer-motion'

const items = [
  { label: 'Amanecer en el mar', gradient: 'from-[#0d2345] to-[#1a3f72]' },
  { label: 'Olas cristalinas', gradient: 'from-[#0a1a32] via-[#0d2a55] to-[#1a4a7a]' },
  { label: 'Horizonte infinito', gradient: 'from-[#0d2a55] via-[#1a3f72] to-[#0d2345]' },
  { label: 'Luz bioluminiscente', gradient: 'from-[#0a1a32] via-[#0d2a55] to-[#0f2a50]' },
]

export default function Gallery() {
  return (
    <section id="galeria" className="relative py-24 md:py-32 px-6">
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-16 md:mb-20">
          <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-cyan-400/40">
            &bull; Galer&iacute;a
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-light mt-3 leading-tight">
            Capturando la esencia<br />
            <span className="text-white/80">del océano</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: 'easeOut' }}
              className={`relative h-56 md:h-72 rounded-xl overflow-hidden bg-gradient-to-br ${item.gradient} border border-white/5 hover:border-cyan-400/20 transition-all duration-500 group`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,14,26,0.6)] via-transparent to-transparent" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-cyan-500/5 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <span className="font-script text-base md:text-lg text-white/60">
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
