'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoGameControllerOutline, IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5'
import { HiSparkles } from 'react-icons/hi2'

const questions = [
  {
    question: '¿Cuál es la caricatura favorita de Hallie?',
    options: ['Snoopy', 'Mickey Mouse', 'Hello Kitty', 'Pokémon'],
    correct: 0,
  },
  {
    question: '¿Cuál es su color favorito?',
    options: ['Azul', 'Morado', 'Rosa', 'Verde'],
    correct: 1,
  },
  {
    question: '¿Cuál es el país que sueña visitar?',
    options: ['Italia', 'Francia', 'Japón', 'Grecia'],
    correct: 1,
  },
  {
    question: '¿Quién es su celebrity crush?',
    options: ['Timothée Chalamet', 'Jacob Elordi', 'Tom Holland', 'Harry Styles'],
    correct: 1,
  },
  {
    question: '¿Qué describe mejor a Hallie?',
    options: ['Deportista', 'Creativa', 'Tímida', 'Sería'],
    correct: 1,
  },
]

export default function Trivia() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [wrongAnswers, setWrongAnswers] = useState(0)

  const handleSelect = useCallback(
    (index) => {
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
          setShowResult(true)
          setTimeout(() => setFinished(true), 2000)
        }
      }, 1500)
    },
    [current, selected]
  )

  const restart = () => {
    setCurrent(0)
    setSelected(null)
    setShowResult(false)
    setScore(0)
    setFinished(false)
    setWrongAnswers(0)
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
      <section id="trivia" className="relative py-24 md:py-32 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/0 via-electric-500/5 to-navy-900/0" />

        <div className="relative max-w-2xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="glass p-8 md:p-12 text-center"
          >
            <HiSparkles className="text-6xl text-electric-500 mx-auto mb-6" />
            <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              ¡Trivia Completada!
            </h3>
            <div className="text-6xl font-display font-bold text-electric-500 mb-4">
              {score}/{questions.length}
            </div>
            <p className="text-white/60 text-lg mb-8">{message}</p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="glass px-6 py-3 text-center">
                <p className="text-electric-500 text-2xl font-bold">{score}</p>
                <p className="text-white/40 text-xs uppercase tracking-wider">Correctas</p>
              </div>
              <div className="glass px-6 py-3 text-center">
                <p className="text-red-400 text-2xl font-bold">{wrongAnswers}</p>
                <p className="text-white/40 text-xs uppercase tracking-wider">Incorrectas</p>
              </div>
            </div>

            <button
              onClick={restart}
              className="glass px-8 py-3 text-electric-500 hover:bg-electric-500/10 transition-all duration-300"
            >
              Volver a Intentar
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="trivia" className="relative py-24 md:py-32 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/0 via-electric-500/5 to-navy-900/0" />

      <div className="relative max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <IoGameControllerOutline className="text-electric-500 text-xl" />
            <span className="text-electric-500/80 text-sm tracking-[0.3em] uppercase font-light">
              Trivia
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            ¿Qué tanto conoces a Hallie?
          </h2>
          <p className="text-white/40 text-sm">
            Pregunta {current + 1} de {questions.length}
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-white/10 rounded-full mb-12 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-electric-500 to-electric-300"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <div className="glass p-8 md:p-10 mb-6">
              <h3 className="text-xl md:text-2xl font-display font-semibold text-white mb-8 text-center">
                {questions[current].question}
              </h3>

              <div className="space-y-3">
                {questions[current].options.map((option, index) => {
                  let optionStyle = 'glass hover:bg-white/10 cursor-pointer'

                  if (selected !== null) {
                    if (index === questions[current].correct) {
                      optionStyle = 'bg-green-500/20 border-green-500/50 cursor-default'
                    } else if (index === selected) {
                      optionStyle = 'bg-red-500/20 border-red-500/50 cursor-default'
                    } else {
                      optionStyle = 'opacity-40 cursor-default'
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleSelect(index)}
                      disabled={selected !== null}
                      className={`w-full text-left px-6 py-4 rounded-xl border border-white/10 transition-all duration-300 flex items-center justify-between group ${optionStyle}`}
                    >
                      <span className="text-white/90 font-medium">{option}</span>
                      {selected !== null && index === questions[current].correct && (
                        <IoCheckmarkCircle className="text-green-400 text-xl" />
                      )}
                      {selected !== null && index === selected && index !== questions[current].correct && (
                        <IoCloseCircle className="text-red-400 text-xl" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {selected !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-center ${
                  selected === questions[current].correct
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}
              >
                {selected === questions[current].correct
                  ? '¡Correcto! 🎉'
                  : `Incorrecto. La respuesta era: ${questions[current].options[questions[current].correct]}`}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mt-8"
        >
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === current
                  ? 'bg-electric-500 scale-125'
                  : index < current
                    ? 'bg-electric-500/50'
                    : 'bg-white/20'
              }`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
