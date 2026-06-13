'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EnvelopeScreen({ onOpen }) {
  const [state, setState] = useState('idle')

  const handleOpen = useCallback(() => {
    if (state !== 'idle') return
    setState('opening')
    setTimeout(() => {
      setState('done')
      setTimeout(() => onOpen(), 600)
    }, 2600)
  }, [state, onOpen])

  return (
    <AnimatePresence>
      {state !== 'done' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(4px)' }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{
            background: 'linear-gradient(170deg, #060e1a 0%, #0a1628 25%, #0d2345 45%, #0a1628 65%, #0f2a50 85%, #060e1a 100%)',
          }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{ opacity: [0.03, 0.05, 0.03] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(0,180,255,0.5), transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
            <motion.div
              animate={{ opacity: [0.02, 0.04, 0.02] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(0,120,200,0.5), transparent 70%)',
                filter: 'blur(80px)',
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ perspective: '1200px' }}
          >
            <div className="relative" style={{ width: 340 }}>
              <div
                style={{
                  width: 340,
                  height: 420,
                  position: 'relative',
                  borderRadius: '6px',
                  background: 'linear-gradient(175deg, #f7f2e8 0%, #efe8d8 30%, #e8dfcc 60%, #f0e8d8 100%)',
                  boxShadow: '0 12px 60px rgba(0,0,0,0.5), 0 2px 0 rgba(255,255,255,0.1) inset',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 12, left: 12, right: 12, bottom: 12,
                    border: '1px solid rgba(180, 160, 130, 0.15)',
                    borderRadius: '4px',
                    pointerEvents: 'none',
                    zIndex: 0,
                  }}
                />

                <motion.div
                  animate={state === 'opening' ? { rotateX: -180 } : { rotateX: 0 }}
                  transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '36%',
                    transformOrigin: 'bottom center',
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                    zIndex: 3,
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(170deg, #f0e8d8 0%, #e8dfcc 50%, #e0d6c0 100%)',
                      clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                      borderBottom: '1px solid rgba(180, 160, 130, 0.1)',
                    }}
                  />
                </motion.div>

                <div
                  style={{
                    position: 'absolute',
                    bottom: '25%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 35% 35%, #c0392b 0%, #96281b 40%, #7a1f14 80%, #5a120a 100%)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,200,150,0.3)',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', fontFamily: 'serif', fontStyle: 'italic' }}>H</span>
                </div>

                <motion.div
                  animate={state === 'opening' ? { y: '0%' } : { y: '105%' }}
                  transition={{ duration: 0.9, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  style={{
                    position: 'absolute',
                    top: '2%',
                    left: '4%',
                    right: '4%',
                    bottom: '2%',
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '4px',
                      background: 'linear-gradient(160deg, #fcf9f2 0%, #f5f0e6 30%, #f0e8d8 60%, #f5efe5 100%)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '28px 24px',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 12, left: 12, right: 12, bottom: 12,
                        border: '1px solid rgba(180, 160, 130, 0.1)',
                        borderRadius: '2px',
                        pointerEvents: 'none',
                      }}
                    />
                    <h3
                      className="font-display font-bold text-center"
                      style={{ fontSize: 24, color: '#2c1810', marginBottom: 6 }}
                    >
                      ¡Bienvenidos!
                    </h3>
                    <p
                      className="text-center leading-relaxed"
                      style={{ fontSize: 13, color: '#7a5a44', maxWidth: 260, fontWeight: 300, lineHeight: 1.7 }}
                    >
                      Los espero en mi Pool Party para celebrar juntos este día tan especial. Su presencia hará de este momento un recuerdo inolvidable.
                    </p>
                    <div style={{ width: 60, height: 1, background: 'rgba(180, 160, 130, 0.3)', margin: '16px 0' }} />
                    <p className="font-display font-bold" style={{ fontSize: 22, color: '#2c1810' }}>
                      Hallie Aes
                    </p>
                    <p className="font-script" style={{ fontSize: 16, color: '#7a5a44', marginTop: 2 }}>
                      XV Años
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {state === 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8"
            >
              <button
                onClick={handleOpen}
                className="px-10 py-3.5 rounded-full font-semibold text-sm uppercase tracking-[0.3em] transition-all duration-500 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(0,100,180,0.06))',
                  border: '1px solid rgba(0,212,255,0.15)',
                  color: 'rgba(0,212,255,0.8)',
                }}
              >
                Abrir Invitación
              </button>
            </motion.div>
          )}

          {state === 'idle' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 1 }}
              className="absolute bottom-8 text-[10px] tracking-[0.4em] uppercase"
              style={{ color: 'rgba(255,255,255,0.08)' }}
            >
              Presiona para abrir
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
