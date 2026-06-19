'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { IoChevronDown } from 'react-icons/io5'
import eventConfig from '../config/event'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.23, 1, 0.32, 1] },
  },
}

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: [0.23, 1, 0.32, 1] },
  },
}

export default function Hero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  const scrollToCountdown = () => {
    document.getElementById('countdown')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.section
      ref={sectionRef}
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity: heroOpacity }}
    >
      <motion.div className="absolute inset-0 pointer-events-none" style={{ scale }}>
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(41,141,148,0.06) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(41,141,148,0.05) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
        <div
          className="absolute top-1/3 right-1/3 w-[300px] h-[300px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(228,199,107,0.04) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />
      </motion.div>

      <motion.div
        className="absolute top-[15%] left-[10%] w-16 h-16 opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(200,230,255,0.8), transparent 70%)',
          borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
          animation: 'float-slow 8s ease-in-out infinite',
        }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[15%] w-24 h-24 opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle at 40% 30%, rgba(180,220,255,0.6), transparent 70%)',
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          animation: 'float-slow 12s ease-in-out infinite reverse',
        }}
      />

      <motion.div className="relative z-10 text-center px-4" style={{ y: heroY }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div variants={childVariants} className="mb-8">
            <div className="flex items-center justify-center gap-3">
              <motion.div
                className="w-6 h-[1px]"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(41,141,148,0.4))',
                }}
              />
              <span className="text-white/75 text-[11px] tracking-[0.4em] uppercase font-light">
                XV Años
              </span>
              <motion.div
                className="w-6 h-[1px]"
                style={{
                  background: 'linear-gradient(90deg, rgba(41,141,148,0.4), transparent)',
                }}
              />
            </div>
          </motion.div>

          <motion.h1
            variants={scaleVariants}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[140px] font-display font-bold mb-2 tracking-tight leading-[0.9]"
            style={{
              color: "#ffffff",
              textShadow: "0 0 15px rgba(255,255,255,.9), 0 0 30px rgba(248,216,106,.3), 0 0 50px rgba(248,216,106,.2)",
            }}
          >
            {eventConfig.heroName}
          </motion.h1>

          <motion.div variants={childVariants} className="mb-4 mt-2">
            <span className="hero-subtitle font-script text-4xl sm:text-5xl md:text-6xl">
              {eventConfig.heroSubtitle}
            </span>
          </motion.div>

          <motion.div
            variants={childVariants}
            className="w-[120px] h-[1px] my-6"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(41,141,148,0.3), transparent)',
            }}
          />

          <motion.p
            variants={childVariants}
            className="section-small-text text-sm uppercase font-light"
          >
            Te invito a celebrar conmigo
          </motion.p>
        </motion.div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        onClick={scrollToCountdown}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group cursor-pointer"
      >
        <span className="text-white/60 text-[10px] tracking-[0.35em] uppercase group-hover:text-white transition-all duration-500">
          Descubre más
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <IoChevronDown className="text-lg text-white/60 group-hover:text-white transition-all duration-500" />
        </motion.div>
      </motion.button>
    </motion.section>
  )
}
