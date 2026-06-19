'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export default function DynamicBackground() {
  const { scrollYProgress } = useScroll()

  const background = useTransform(
    scrollYProgress,
    [0, 0.35, 0.7, 1],
    ['#0b3b66', '#082f59', '#052343', '#03162f']
  )

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none"
      style={{ background }}
    />
  )
}
