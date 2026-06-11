'use client'

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

export default function Home() {
  return (
    <main className="relative min-h-screen">
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
  )
}
