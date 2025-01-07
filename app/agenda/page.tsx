'use client'

// import { useAuth } from '../components/Auth'
// import { useEffect } from 'react'
// import { useRouter } from 'next/navigation'
import AgendaDisplay from '../components/AgendaDisplay'

export default function Agenda() {
  // const { authState } = useAuth()
  // const router = useRouter()

  // useEffect(() => {
  //   if (!authState?.isAuthenticated) {
  //     router.push('/login')
  //   }
  // }, [authState, router])

  // if (!authState?.isAuthenticated) {
  //   return null
  // }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <AgendaDisplay />
    </div>
  )
}
