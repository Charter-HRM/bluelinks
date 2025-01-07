'use client'

import { useAuth, loginWithCredentials } from '../components/Auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { getSessionItem } from '@/lib/sessionStorageUtil'

export default function Login() {
  const { authState } = useAuth()
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (authState?.isAuthenticated) {
      router.push('/dashboard')
    }
  }, [authState, router])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const headerDocument = document.getElementById('bluelinxHeader')
      if (getSessionItem('profileData') == null && headerDocument) {
        headerDocument.style.display = 'none'
        const logoutDocument = document.getElementById('logoutHeader')
        if (logoutDocument) {
          logoutDocument.style.display = 'none'
        }
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const result = await loginWithCredentials(username, password)
    if (!result.success) {
      setError(result.error || 'Login failed')
    }
  }

  if (authState?.isAuthenticated) {
    return null
  }

  return (
    <div className="flex items-center justify-center shadow-inner">
      <div className="p-6 max-w-sm w-full shadow-md rounded-md">
        <div className="flex justify-center mb-6">
          <Image
            src="/okta.png"
            alt="Okta Logo"
            width={100}
            height={40}
          />
        </div>
        <hr /><br />
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">Sign In</h1>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Username'
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 rounded-md"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  )
}

