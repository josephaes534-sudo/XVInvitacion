'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { IoMailOutline, IoCheckmarkCircle, IoPersonOutline, IoPeopleOutline, IoChatbubbleOutline } from 'react-icons/io5'
import eventConfig from '@/config/event'

export default function RSVP() {
  const [formData, setFormData] = useState({
    name: '',
    guests: '1',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (eventConfig.rsvp.formspreeEndpoint) {
        const params = new URLSearchParams()
        params.append('name', formData.name)
        params.append('guests', formData.guests)
        params.append('message', formData.message)
        await fetch(eventConfig.rsvp.formspreeEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString(),
        })
      }

      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <section id="rsvp" className="relative py-24 md:py-32 px-4">
        <div className="absolute inset-0 pointer-events-none" />

        <div className="relative max-w-lg mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="glass p-12 text-center"
          >
            <IoCheckmarkCircle className="text-6xl text-green-400 mx-auto mb-6" />
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
              &iexcl;Gracias por confirmar!
            </h3>
            <p className="text-white/40 leading-relaxed font-light">
              Hallie est&aacute; muy emocionada de que la acompa&ntilde;es en este d&iacute;a tan especial.
              Te esperamos con mucho cari&ntilde;o.
            </p>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.5 }}
              className="w-16 h-[1px] bg-[#00d4ff]/50 mx-auto mt-6"
            />
          </motion.div>
        </div>
      </section>
    )
  }

  return (
      <section id="rsvp" className="relative py-24 md:py-32 px-4">
        <div className="absolute inset-0 pointer-events-none" />

        <div className="relative max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <IoMailOutline className="text-[#00d4ff] text-xl" />
            <span className="text-[#00d4ff]/80 text-sm tracking-[0.3em] uppercase font-light">
              RSVP
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Confirma tu Asistencia
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="glass p-8 md:p-10 space-y-6">
            <div>
              <label className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-[0.2em] mb-2">
                <IoPersonOutline className="text-[#00d4ff]" />
                Tu Nombre
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Escribe tu nombre completo"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 outline-none focus:border-[#00d4ff]/50 focus:bg-white/10 transition-all duration-300"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-[0.2em] mb-2">
                <IoPeopleOutline className="text-[#00d4ff]" />
                N&uacute;mero de Invitados
              </label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-[#00d4ff]/50 focus:bg-white/10 transition-all duration-300 appearance-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n} className="bg-[#0a1628]">
                    {n} {n === 1 ? 'Invitado' : 'Invitados'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-[0.2em] mb-2">
                <IoChatbubbleOutline className="text-[#00d4ff]" />
                Mensaje para Hallie
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Dedícale unas palabras..."
                maxLength={500}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 outline-none focus:border-[#00d4ff]/50 focus:bg-white/10 transition-all duration-300 resize-none"
              />
              <p className="text-white/15 text-xs text-right mt-1">
                {formData.message.length}/500
              </p>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00d4ff]/20 to-blue-500/20 border border-[#00d4ff]/30 text-[#00d4ff] font-semibold text-sm uppercase tracking-[0.2em] hover:bg-[#00d4ff]/30 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-[#00d4ff] border-t-transparent rounded-full inline-block"
                  />
                  Enviando...
                </span>
              ) : (
                'Confirmar Asistencia'
              )}
            </motion.button>

            {eventConfig.rsvp.phone && (
              <p className="text-center text-white/20 text-xs">
                O confirma v&iacute;a WhatsApp:{' '}
                <a
                  href={`https://wa.me/${eventConfig.rsvp.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00d4ff]/50 hover:text-[#00d4ff] transition-colors"
                >
                  {eventConfig.rsvp.phone}
                </a>
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  )
}
