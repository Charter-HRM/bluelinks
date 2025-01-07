'use client'

import { useAuth } from '../components/Auth'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Venue() {
  const { authState } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authState?.isAuthenticated) {
      router.push('/login')
    }
  }, [authState, router])

  if (!authState?.isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/dashboard" className="text-xl font-semibold">Bluelinx Conference</Link>
              </div>
            </div>
            <div className="flex items-center">
              <Link href="/logout" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Venue Layout</h1>
          <div className="mt-6">
            {/* Placeholder for venue layout */}
            <p className="text-gray-500">Interactive venue map will be displayed here.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
