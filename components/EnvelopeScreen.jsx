'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EnvelopeScreen({ onOpen }) {
  const [phase, setPhase] = useState('idle')

  const handleOpen = useCallback(() => {
    if (phase !== 'idle') return
    setPhase('opening')
    setTimeout(() => setPhase('done'), 2800)
    setTimeout(() => onOpen(), 3400)
  }, [phase, onOpen])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(3px)' }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{
            background: 'linear-gradient(170deg, #16383B 0%, #1C4B4F 25%, #236166 45%, #1C4B4F 65%, #16383B 85%, #16383B 100%)',
          }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{ opacity: [0.04, 0.09, 0.04] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(63,163,170,0.25), transparent 70%)', filter: 'blur(60px)' }}
            />
            <motion.div
              animate={{ opacity: [0.03, 0.07, 0.03] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(41,141,148,0.2), transparent 70%)', filter: 'blur(80px)' }}
            />
            <motion.div
              animate={{ opacity: [0.02, 0.06, 0.02] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute top-1/2 left-1/2 w-[200px] h-[200px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(240,218,147,0.1), transparent 60%)', filter: 'blur(50px)' }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ perspective: '1000px' }}
          >
            <div className="relative" style={{ width: 'min(82vw, 380px)', aspectRatio: '1.35', maxWidth: 380 }}>
              <div
                className="absolute -inset-[3px] rounded-[10px] pointer-events-none"
                style={{
                  background: 'linear-gradient(155deg, rgba(240,218,147,0.2), rgba(240,218,147,0.06), rgba(240,218,147,0.15))',
                  boxShadow: '0 0 20px rgba(240,218,147,0.08), inset 0 0 20px rgba(240,218,147,0.04)',
                }}
              />
              <div
                className="absolute -inset-[1px] rounded-[9px] pointer-events-none"
                style={{
                  border: '1px solid rgba(240,218,147,0.35)',
                  boxShadow: '0 0 30px rgba(240,218,147,0.12)',
                }}
              />

              <div
                style={{
                  width: '100%', height: '100%', position: 'relative',
                  borderRadius: '8px',
                  background: 'linear-gradient(155deg, rgba(220,240,242,0.94) 0%, rgba(200,230,232,0.9) 30%, rgba(185,222,225,0.84) 60%, rgba(210,235,237,0.9) 100%)',
                  boxShadow: '0 12px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(255,255,255,0.1)',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute', top: 8, left: 8, right: 8, bottom: 8,
                  border: '1px solid rgba(162,224,226,0.25)', borderRadius: '5px', pointerEvents: 'none', zIndex: 0,
                }} />

                <div
                  className="absolute top-8 left-10 right-10 h-[1px] pointer-events-none"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(240,218,147,0.12), transparent)', zIndex: 1 }}
                />
                <div
                  className="absolute bottom-8 left-10 right-10 h-[1px] pointer-events-none"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(240,218,147,0.12), transparent)', zIndex: 1 }}
                />
                <div
                  className="absolute top-10 bottom-10 left-8 w-[1px] pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, transparent, rgba(240,218,147,0.1), transparent)', zIndex: 1 }}
                />
                <div
                  className="absolute top-10 bottom-10 right-8 w-[1px] pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, transparent, rgba(240,218,147,0.1), transparent)', zIndex: 1 }}
                />

                <motion.div
                  animate={phase === 'opening' ? { rotateX: -180 } : { rotateX: 0 }}
                  transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                  style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '40%',
                    transformOrigin: 'bottom center', transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden', zIndex: 3,
                  }}
                >
                  <div style={{
                    width: '100%', height: '100%',
                    background: 'linear-gradient(155deg, rgba(210,235,237,0.95) 0%, rgba(195,225,228,0.9) 50%, rgba(185,215,218,0.85) 100%)',
                    clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                    borderBottom: '1px solid rgba(162,224,226,0.12)',
                  }}>
                    <div
                      className="absolute top-[38%] left-[28%] right-[28%] h-[1px]"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(240,218,147,0.18), transparent)' }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: phase === 'opening' ? ['105%', '105%', '2%'] : '105%' }}
                  transition={{ duration: 0.8, delay: 0.9, ease: [0.23, 1, 0.32, 1] }}
                  style={{
                    position: 'absolute', top: '2%', left: '4%', right: '4%', bottom: '2%', zIndex: 1,
                  }}
                >
                  <div style={{
                    width: '100%', height: '100%', borderRadius: '3px',
                    background: 'linear-gradient(160deg, #fcf9f2 0%, #f5f0e6 30%, #f0e8d8 60%, #f5efe5 100%)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    padding: 'clamp(14px, 4vw, 28px)',
                  }}>
                    <div style={{
                      position: 'absolute', top: 10, left: 10, right: 10, bottom: 10,
                      border: '1px solid rgba(180, 160, 130, 0.1)', borderRadius: '2px', pointerEvents: 'none',
                    }} />
                    <h3 className="font-display font-bold text-center"
                      style={{ fontSize: 'clamp(16px, 5vw, 24px)', color: '#2c1810', marginBottom: 'clamp(3px, 1.5vw, 6px)' }}>
                      ¡Bienvenidos!
                    </h3>
                    <p className="text-center leading-relaxed"
                      style={{ fontSize: 'clamp(10px, 3vw, 13px)', color: '#7a5a44', maxWidth: '92%', fontWeight: 300, lineHeight: 1.6 }}>
                      Los espero en mi Pool Party para celebrar juntos este día tan especial. Su presencia hará de este momento un recuerdo inolvidable.
                    </p>
                    <div style={{ width: '30%', height: 1, background: 'rgba(180, 160, 130, 0.3)', margin: 'clamp(8px, 3vw, 16px) 0' }} />
                    <p className="font-display font-bold" style={{ fontSize: 'clamp(14px, 4.5vw, 20px)', color: '#2c1810' }}>
                      Hallie Aes
                    </p>
                    <p className="font-script" style={{ fontSize: 'clamp(12px, 3.5vw, 16px)', color: '#7a5a44', marginTop: 1 }}>
                      XV Años
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {phase === 'idle' && (
            <>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleOpen}
                className="mt-8 px-10 py-3.5 rounded-full font-semibold text-sm uppercase tracking-[0.3em] transition-all duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(63,163,170,0.12), rgba(228,199,107,0.06))',
                  border: '1px solid rgba(63,163,170,0.2)',
                  color: 'rgba(200,235,237,0.9)',
                }}
              >
                Abrir Invitación
              </motion.button>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
                className="absolute bottom-8 text-[10px] tracking-[0.4em] uppercase"
                style={{ color: 'rgba(255,255,255,0.08)' }}
              >
                Presiona para abrir
              </motion.p>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
