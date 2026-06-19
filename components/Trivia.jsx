'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const questions = [
  {
    question: '¿Cuál es la caricatura favorita de Hallie?',
    options: ['Snoopy', 'Minion', 'Olaf', 'Peabody'],
    correct: 0,
  },
  {
    question: '¿Cuál es su color favorito?',
    options: ['Azul', 'Morado', 'Rosa', 'Verde'],
    correct: 0,
  },
  {
    question: '¿Cuál es el país que sueña visitar?',
    options: ['Italia', 'Francia', 'Japón', 'Grecia'],
    correct: 1,
  },
  {
    question: '¿Quién es su celebrity crush?',
    options: ['Henry Cavill', 'Zac Efron', 'Jacob Elordi', 'Tom Holland'],
    correct: 0,
  },
  {
    question: '¿Qué describe mejor a Hallie?',
    options: ['Sería', 'Enojona', 'Alegre', 'Traviesa'],
    correct: 3,
  },
]

export default function Trivia() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [wrongAnswers, setWrongAnswers] = useState(0)

  const handleSelect = useCallback((index) => {
    if (selected !== null) return
    setSelected(index)
    if (index === questions[current].correct) {
      setScore((s) => s + 1)
    } else {
      setWrongAnswers((w) => w + 1)
    }
    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent((c) => c + 1)
        setSelected(null)
      } else {
        setTimeout(() => setFinished(true), 1500)
      }
    }, 1500)
  }, [current, selected])

  const restart = () => {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setWrongAnswers(0)
    setFinished(false)
  }

  const progress = ((current + (selected !== null ? 1 : 0)) / questions.length) * 100

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100)
    const message =
      percentage === 100
        ? '¡Perfecto! Conoces a Hallie mejor que nadie'
        : percentage >= 60
          ? '¡Muy bien! Eres un buen amigo de Hallie'
          : 'Sigue conociendo a Hallie, ¡ella es increíble!'

    return (
      <section id="trivia" className="relative py-28 md:py-36 px-4">
        <div className="absolute inset-0 pointer-events-none" />
        <div className="relative max-w-2xl mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="glass-card p-10 md:p-14 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(41,141,148,0.02)] to-transparent pointer-events-none" />
            <div className="relative">
              <div className="text-5xl mb-6">✨</div>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                ¡Trivia Completada!
              </h3>
              <div
                className="text-7xl md:text-8xl font-display font-bold mb-4 text-glow-soft"
                style={{ color: 'rgba(41, 141, 148, 0.9)' }}
              >
                {score}/{questions.length}
              </div>
              <p className="text-[rgba(255,255,255,0.4)] text-lg mb-8 font-light">
                {message}
              </p>
              <div className="flex justify-center gap-4 mb-8">
                <div className="glass-card px-7 py-4 text-center min-w-[120px]">
                  <p className="text-2xl font-bold" style={{ color: 'rgba(41, 141, 148, 0.9)' }}>
                    {score}
                  </p>
                  <p className="text-white/75 text-[10px] uppercase tracking-[0.2em] mt-1">Correctas</p>
                </div>
                <div className="glass-card px-7 py-4 text-center min-w-[120px]">
                  <p className="text-2xl font-bold" style={{ color: 'rgba(255, 100, 100, 0.8)' }}>
                    {wrongAnswers}
                  </p>
                  <p className="text-white/75 text-[10px] uppercase tracking-[0.2em] mt-1">Incorrectas</p>
                </div>
              </div>
              <button onClick={restart} className="btn-secondary">
                Volver a Intentar
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="trivia" className="relative py-28 md:py-36 px-4">
      <div className="absolute inset-0 pointer-events-none" />
      <div className="relative max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-12"
        >
          <div className="section-label mb-3">
            <span>Trivia</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-3">
            ¿Qué tanto conoces a Hallie?
          </h2>
          <p className="text-white/75 text-sm">
            Pregunta {current + 1} de {questions.length}
          </p>
        </motion.div>

        <div className="w-full h-[2px] bg-[rgba(255,255,255,0.04)] rounded-full mb-12 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, rgba(41,141,148,0.4), rgba(41,141,148,0.8))',
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="p-8 md:p-10 mb-6 relative overflow-hidden bg-[#0d3b66]/70 backdrop-blur-xl border border-white/15 shadow-2xl rounded-2xl">
              <div className="relative">
                <h3 className="text-xl md:text-2xl font-display font-semibold text-white mb-8 text-center leading-relaxed">
                  {questions[current].question}
                </h3>
                <div className="space-y-3">
                  {questions[current].options.map((option, index) => {
                    let optionStyle = 'bg-[#1b5f97]/70 hover:bg-[#2874b6]/90 border border-white/10 text-white cursor-pointer'

                    if (selected !== null) {
                      if (index === questions[current].correct) {
                        optionStyle = 'bg-[rgba(0,200,100,0.08)] border-[rgba(0,200,100,0.25)] cursor-default'
                      } else if (index === selected) {
                        optionStyle = 'bg-[rgba(255,80,80,0.08)] border-[rgba(255,80,80,0.25)] cursor-default'
                      } else {
                        optionStyle = 'bg-[rgba(255,255,255,0.01)] border-[rgba(255,255,255,0.03)] opacity-30 cursor-default'
                      }
                    }

                    return (
                      <motion.button
                        key={index}
                        onClick={() => handleSelect(index)}
                        disabled={selected !== null}
                        whileHover={selected !== null ? {} : { scale: 1.01, x: 4 }}
                        whileTap={selected !== null ? {} : { scale: 0.99 }}
                        className={`w-full text-left px-6 py-4 rounded-2xl border transition-all duration-400 flex items-center justify-between group ${optionStyle}`}
                      >
                        <span className="text-white/70 font-medium text-sm md:text-base">{option}</span>
                        <span className={`text-lg transition-opacity duration-300 ${
                          selected !== null ? 'opacity-100' : 'opacity-0 group-hover:opacity-30'
                        }`}>
                          {selected !== null && index === questions[current].correct ? '✓' : selected !== null && index === selected ? '✕' : '→'}
                        </span>
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            </div>

            {selected !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-center text-sm font-medium ${
                  selected === questions[current].correct
                    ? 'text-[rgba(0,200,100,0.8)]'
                    : 'text-[rgba(255,80,80,0.8)]'
                }`}
              >
                {selected === questions[current].correct
                  ? '¡Correcto!'
                  : `Incorrecto. La respuesta era: ${questions[current].options[questions[current].correct]}`}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-3 mt-8"
        >
          {questions.map((_, index) => (
            <motion.div
              key={index}
              className="rounded-full transition-all duration-300"
              style={{
                width: index === current ? 24 : 8,
                height: 8,
                background: index === current
                  ? 'rgba(41,141,148,0.6)'
                  : index < current
                    ? 'rgba(41,141,148,0.2)'
                    : 'rgba(255,255,255,0.08)',
              }}
              layout
              transition={{ type: 'spring', duration: 0.5 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
