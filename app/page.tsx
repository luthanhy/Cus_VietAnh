'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import HeroSection from '@/components/HeroSection'
import ExploreSchool from '@/components/ExploreSchool'
import WhyAttend from '@/components/WhyAttend'
import TimelineSection from '@/components/TimelineSection'
import StudentExperience from '@/components/StudentExperience'
import SchoolFeatures from '@/components/SchoolFeatures'
import OffersSection from '@/components/OffersSection'
import CallToAction from '@/components/CallToAction'
import RegistrationModal from '@/components/RegistrationModal'

function HomeContent() {
  const searchParams = useSearchParams()
  const guestName = searchParams.get('guest')?.trim() || 'quý khách'

  const [showModal, setShowModal] = useState(false)

  // Mở modal khi hash #dang-ky
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#dang-ky') {
        setShowModal(true)
      }
    }
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  return (
    <main className="min-h-screen">
      <HeroSection quyKhach={guestName} onRegister={() => setShowModal(true)} />
      <ExploreSchool />
      <WhyAttend />
      <TimelineSection />
      <StudentExperience />
      <SchoolFeatures />
      <OffersSection />
      <CallToAction onRegister={() => setShowModal(true)} />
      
      <RegistrationModal 
        isOpen={showModal} 
        onClose={() => {
          setShowModal(false)
          window.location.hash = ''
        }} 
      />
    </main>
  )
}

export default function Home() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Đang tải...</p>
      </main>
    }>
      <HomeContent />
    </Suspense>
  )
}
