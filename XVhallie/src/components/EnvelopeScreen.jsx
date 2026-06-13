'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'

export default function EnvelopeScreen({ onOpen }) {
  const [state, setState] = useState('idle')
  const flapRef = useRef(null)
  const letterRef = useRef(null)
  const containerRef = useRef(null)
  const openingRef = useRef(false)

  const handleOpen = useCallback(() => {
    if (openingRef.current) return
    openingRef.current = true
    setState('opening')

    const tl = gsap.timeline({
      onComplete: () => {
        setState('done')
        setTimeout(() => onOpen(), 500)
      },
    })

    tl.to(flapRef.current, {
      rotateX: -180,
      duration: 1.2,
      ease: 'power3.inOut',
    })
      .to(letterRef.current, {
        y: '0%',
        duration: 0.9,
        ease: 'power3.out',
      }, '-=0.5')
      .to(containerRef.current, {
        opacity: 0,
        scale: 1.02,
        duration: 0.8,
        ease: 'power2.inOut',
      }, '+=0.6')
  }, [onOpen])

  return (
    <AnimatePresence>
      {state !== 'done' && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{
            background: 'linear-gradient(170deg, #060e1a 0%, #0a1628 25%, #0d2345 45%, #0a1628 65%, #0f2a50 85%, #060e1a 100%)',
          }}
        >
          <div className="relative" style={{ perspective: '1200px' }}>
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
                {/* Border lines for carta feel */}
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

                {/* Flap */}
                <div
                  ref={flapRef}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '36%',
                    transformOrigin: 'bottom center',
                    backfaceVisibility: 'hidden',
                    zIndex: 3,
                    willChange: 'transform',
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
                </div>

                {/* Wax seal */}
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

                {/* Letter inside */}
                <div
                  ref={letterRef}
                  style={{
                    position: 'absolute',
                    top: '2%',
                    left: '4%',
                    right: '4%',
                    bottom: '2%',
                    transform: 'translateY(105%)',
                    willChange: 'transform',
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
                      &iexcl;Bienvenidos!
                    </h3>
                    <p
                      className="text-center leading-relaxed"
                      style={{ fontSize: 13, color: '#7a5a44', maxWidth: 260, fontWeight: 300, lineHeight: 1.7 }}
                    >
                      Los espero en mi Pool Party para celebrar juntos este d&iacute;a tan especial. Su presencia har&aacute; de este momento un recuerdo inolvidable.
                    </p>
                    <div style={{ width: 60, height: 1, background: 'rgba(180, 160, 130, 0.3)', margin: '16px 0' }} />
                    <p className="font-display font-bold" style={{ fontSize: 22, color: '#2c1810' }}>
                      Hallie Aes
                    </p>
                    <p className="font-script" style={{ fontSize: 16, color: '#7a5a44', marginTop: 2 }}>
                      XV A&ntilde;os
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {state === 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8"
            >
              <button
                onClick={handleOpen}
                className="px-10 py-3 rounded-full font-semibold text-sm uppercase tracking-[0.3em] transition-all duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,212,255,0.1), rgba(0,100,180,0.1))',
                  border: '1px solid rgba(0,212,255,0.2)',
                  color: 'rgba(0,212,255,0.85)',
                }}
              >
                Abrir Invitaci&oacute;n
              </button>
            </motion.div>
          )}

          {state === 'idle' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="absolute bottom-8 text-[10px] tracking-[0.3em] uppercase"
              style={{ color: 'rgba(255,255,255,0.1)' }}
            >
              Presiona para abrir
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
