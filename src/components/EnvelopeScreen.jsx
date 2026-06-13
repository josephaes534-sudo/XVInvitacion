'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'

export default function EnvelopeScreen({ onOpen }) {
  const [state, setState] = useState('idle')
  const envelopeRef = useRef(null)
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
      duration: 1,
      ease: 'power3.inOut',
    })
      .to(letterRef.current, {
        y: '0%',
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.4')
      .to(containerRef.current, {
        opacity: 0,
        scale: 1.03,
        duration: 0.7,
        ease: 'power2.inOut',
      }, '+=0.8')
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
          <div
            ref={envelopeRef}
            className="relative"
            style={{ perspective: '1000px' }}
          >
            <div className="relative" style={{ width: 320 }}>
              {/* Envelope body */}
              <div
                style={{
                  width: 320,
                  height: 400,
                  position: 'relative',
                  borderRadius: '4px',
                  background: 'linear-gradient(175deg, #0f2a50 0%, #1a3f72 30%, #0d2a55 60%, #0a1a32 100%)',
                  border: '1.5px solid rgba(74, 143, 212, 0.25)',
                  boxShadow: '0 8px 40px rgba(0, 20, 60, 0.5), inset 0 0 40px rgba(0, 212, 255, 0.02)',
                  overflow: 'hidden',
                }}
              >
                {/* Flap */}
                <div
                  ref={flapRef}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '35%',
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
                      background: 'linear-gradient(170deg, #1a3f72 0%, #0f2a50 50%, #0d2345 100%)',
                      clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                    }}
                  />
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
                      borderRadius: '6px',
                      background: 'linear-gradient(160deg, #e8f0f8 0%, #d0dce8 30%, #c8d8e8 60%, #e0e8f0 100%)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '24px',
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,100,180,0.1))',
                        border: '1px solid rgba(0,212,255,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 12,
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#00d4ff" opacity="0.6"/>
                      </svg>
                    </div>
                    <h3 className="font-display font-bold text-center" style={{ fontSize: 22, color: '#0a1628', marginBottom: 8 }}>
                      &iexcl;Bienvenidos!
                    </h3>
                    <p className="text-center leading-relaxed" style={{ fontSize: 13, color: '#4a6a8a', maxWidth: 260, fontWeight: 300 }}>
                      Los espero en mi Pool Party para celebrar juntos este d&iacute;a tan especial.
                    </p>
                    <div style={{ width: 50, height: 1, background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.3), transparent)', margin: '14px 0' }} />
                    <p className="font-display font-bold" style={{ fontSize: 20, color: '#0a1628' }}>
                      Hallie Aes
                    </p>
                    <p className="font-script" style={{ fontSize: 16, color: '#0f2a50', marginTop: 2 }}>
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
                  boxShadow: '0 0 20px rgba(0,212,255,0.05)',
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
