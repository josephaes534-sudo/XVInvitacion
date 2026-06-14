'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { IoCheckmarkCircle, IoPersonOutline, IoPeopleOutline, IoChatbubbleOutline } from 'react-icons/io5'
import eventConfig from '../config/event'

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
      <section id="rsvp" className="relative py-28 md:py-36 px-4">
        <div className="absolute inset-0 pointer-events-none" />
        <div className="relative max-w-lg mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="glass-card p-12 md:p-14 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(63,163,170,0.02)] to-transparent pointer-events-none" />
            <div className="relative">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.6, delay: 0.2 }}
              >
                <IoCheckmarkCircle className="text-6xl mx-auto mb-6" style={{ color: 'rgba(63, 163, 170, 0.7)' }} />
              </motion.div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                ¡Gracias por confirmar!
              </h3>
              <p className="text-[rgba(255,255,255,0.3)] leading-relaxed font-light">
                Hallie está muy emocionada de que la acompañes en este día tan especial.
                Te esperamos con mucho cariño.
              </p>
              <div className="section-divider mt-6" />
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="relative py-28 md:py-36 px-4">
      <div className="absolute inset-0 pointer-events-none" />
      <div className="relative max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-12"
        >
          <div className="section-label mb-3">
            <span>RSVP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white">
            Confirma tu Asistencia
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
        >
          <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10 space-y-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(63,163,170,0.01)] to-transparent pointer-events-none" />
            <div className="relative space-y-6">
              <div>
                <label className="flex items-center gap-2 text-[rgba(255,255,255,0.2)] text-[11px] uppercase tracking-[0.25em] mb-2.5 font-medium">
                  <IoPersonOutline size={14} style={{ color: 'rgba(63, 163, 170, 0.5)' }} />
                  Tu Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Escribe tu nombre completo"
                  className="input-premium"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-[rgba(255,255,255,0.2)] text-[11px] uppercase tracking-[0.25em] mb-2.5 font-medium">
                  <IoPeopleOutline size={14} style={{ color: 'rgba(63, 163, 170, 0.5)' }} />
                  Número de Invitados
                </label>
                <div className="relative">
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="select-premium"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n} className="bg-[#0a1628]">
                        {n} {n === 1 ? 'Invitado' : 'Invitados'}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[rgba(255,255,255,0.15)]">
                    ▾
                  </div>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-[rgba(255,255,255,0.2)] text-[11px] uppercase tracking-[0.25em] mb-2.5 font-medium">
                  <IoChatbubbleOutline size={14} style={{ color: 'rgba(63, 163, 170, 0.5)' }} />
                  Mensaje para Hallie
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Dedícale unas palabras..."
                  maxLength={500}
                  className="input-premium resize-none"
                />
                <p className="text-[rgba(255,255,255,0.08)] text-xs text-right mt-1.5">
                  {formData.message.length}/500
                </p>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 rounded-full inline-block"
                      style={{
                        borderColor: 'rgba(63,163,170,0.6)',
                        borderTopColor: 'transparent',
                      }}
                    />
                    Enviando...
                  </span>
                ) : (
                  'Confirmar Asistencia'
                )}
              </motion.button>

              {eventConfig.rsvp.phone && (
                <p className="text-center text-[rgba(255,255,255,0.12)] text-xs">
                  O confirma vía WhatsApp:{' '}
                  <a
                    href={`https://wa.me/${eventConfig.rsvp.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[rgba(63,163,170,0.4)] hover:text-[rgba(63,163,170,0.7)] transition-colors"
                  >
                    {eventConfig.rsvp.phone}
                  </a>
                </p>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
