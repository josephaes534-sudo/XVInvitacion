'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { IoCheckmarkCircle, IoPersonOutline, IoPeopleOutline, IoChatbubbleOutline } from 'react-icons/io5'
import eventConfig from '../config/event'

export default function RSVP() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '1',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const confirmed = localStorage.getItem('hallie_rsvp_confirmed')
    if (confirmed) {
      setSubmitted(true)
    }
  }, [])

  useEffect(() => {
    const iframe = document.createElement("iframe")
    iframe.name = "hidden_iframe"
    iframe.style.display = "none"
    document.body.appendChild(iframe)
    return () => {
      document.body.removeChild(iframe)
    }
  }, [])

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const enviarConfirmacion = (e) => {
    e.preventDefault()
    setLoading(true)

    const form = document.createElement("form")
    form.method = "POST"
    form.action = "https://docs.google.com/forms/d/e/1FAIpQLScP4yLHK3HexMlGo4repFJmZfzTmn8PL1-zS2rkO_OM7ivZuQ/formResponse"
    form.target = "hidden_iframe"

    const data = {
      "entry.2001389412": formData.name,
      "entry.908209112": formData.phone,
      "entry.346994890": formData.guests,
      "entry.1050979229": formData.message,
    }

    Object.entries(data).forEach(([key, value]) => {
      const input = document.createElement("input")
      input.type = "hidden"
      input.name = key
      input.value = value
      form.appendChild(input)
    })

    document.body.appendChild(form)
    form.submit()

    localStorage.setItem("hallie_rsvp_confirmed", "true")

    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
    }, 1200)
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
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(41,141,148,0.02)] to-transparent pointer-events-none" />
            <div className="relative">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.6, delay: 0.2 }}
              >
                <IoCheckmarkCircle className="text-6xl mx-auto mb-6" style={{ color: 'rgba(41, 141, 148, 0.7)' }} />
              </motion.div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                ¡Gracias por confirmar!
              </h3>
              <p className="text-[rgba(255,255,255,0.3)] leading-relaxed font-light">
                Tu confirmación ha sido registrada correctamente ✨
                <br /><br />
                Gracias por acompañar a Hallie en este día tan especial.
                <br /><br />
                Si tienes alguna duda o problema con tu confirmación,
                puedes comunicarte directamente por WhatsApp:
                <br /><br />
                <a
                  href="https://wa.me/529384054474"
                  target="_blank"
                  className="text-white underline"
                >
                  +52 938 405 4474
                </a>
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
          <form onSubmit={enviarConfirmacion} className="glass-card p-8 md:p-10 space-y-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(41,141,148,0.01)] to-transparent pointer-events-none" />
            <div className="relative space-y-6">
              <div>
                <label className="form-label flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] mb-2.5">
                  <IoPersonOutline size={14} />
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
                <label className="form-label flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] mb-2.5">
                  📱 Número de celular
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Ej. +52 999 000 0000"
                  className="input-premium"
                />
              </div>

              <div>
                <label className="form-label flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] mb-2.5">
                  <IoPeopleOutline size={14} />
                  Número de Invitados
                </label>
                <div className="relative">
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="select-premium"
                  >
                   {[1].map((n) => (
                      <option key={n} value={n} className="bg-[#123B63]">
                        {n} {n === 1 ? 'Invitado' : 'Invitados'}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/60">
                    ▾
                  </div>
                </div>
              </div>

              <div>
                <label className="form-label flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] mb-2.5">
                  <IoChatbubbleOutline size={14} />
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
                <p className="text-white/50 text-xs text-right mt-1.5">
                  {formData.message.length}/500
                </p>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rsvp-btn w-full"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 rounded-full inline-block"
                      style={{
                        borderColor: 'rgba(255,255,255,0.6)',
                        borderTopColor: 'transparent',
                      }}
                    />
                    Enviando...
                  </span>
                ) : (
                  'Confirmar Asistencia'
                )}
              </motion.button>

              <p className="text-center text-white/60 text-xs">
                Tu confirmación se guardará directamente
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
