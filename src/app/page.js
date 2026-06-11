'use client'

import { useState, useCallback, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Gallery from '@/components/Gallery'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ParticlesBackground from '@/components/ParticlesBackground'

const EnvelopeScreen = dynamic(
  () => import('@/components/EnvelopeScreen'),
  { ssr: false }
)

export default function Home() {
  const [showMain, setShowMain] = useState(false)

  const handleEnvelopeOpen = useCallback(() => {
    setShowMain(true)
  }, [])

  useEffect(() => {
    document.body.style.overflow = showMain ? '' : 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [showMain])

  return (
    <>
      {!showMain && <EnvelopeScreen onOpen={handleEnvelopeOpen} />}

      <main
        className="relative min-h-screen marine-caustics"
        style={{
          opacity: showMain ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      >
        <ParticlesBackground variant="ocean" />
        <Navbar />
        <Hero />
        <About />
        <Gallery />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
