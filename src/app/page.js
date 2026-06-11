'use client'

import { useState, useCallback, useEffect } from 'react'
import dynamic from 'next/dynamic'
import ParticlesBackground from '@/components/ParticlesBackground'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import CountdownSection from '@/components/Countdown'
import EventInfo from '@/components/EventInfo'
import DressCode from '@/components/DressCode'
import SpecialMessage from '@/components/SpecialMessage'
import Trivia from '@/components/Trivia'
import Gallery from '@/components/Gallery'
import Music from '@/components/Music'
import RSVP from '@/components/RSVP'
import Footer from '@/components/Footer'

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

      <ParticlesBackground />

      <main
        className="relative min-h-screen"
        style={{
          opacity: showMain ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      >
        <Navbar />
        <Hero />
        <CountdownSection />
        <EventInfo />
        <DressCode />
        <SpecialMessage />
        <Trivia />
        <Gallery />
        <Music />
        <RSVP />
        <Footer />
      </main>
    </>
  )
}
