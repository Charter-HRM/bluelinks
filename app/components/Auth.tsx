'use client'

import React from 'react'
import { useOktaAuth } from '@okta/okta-react'
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js'
import { Security } from '@okta/okta-react'

const oktaAuth = new OktaAuth({
  issuer: `https://${process.env.NEXT_PUBLIC_OKTA_DOMAIN}/oauth2/default`,
  clientId: process.env.NEXT_PUBLIC_OKTA_CLIENT_ID,
  redirectUri: typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : '',
})

export function Auth({ children }: { children: React.ReactNode }) {
  const restoreOriginalUri = async (_oktaAuth: unknown, originalUri: string) => {
    window.location.href = toRelativeUrl(originalUri || '/', window.location.origin)
  }

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      {children}
    </Security>
  )
}

export function useAuth() {
  return useOktaAuth()
}

export async function loginWithCredentials(username: string, password: string) {
  try {
    const transaction = await oktaAuth.signInWithCredentials({ username, password })
    console.log("The transaction is : ", transaction);

    if (transaction.status === 'SUCCESS') {
      await oktaAuth.token.getWithRedirect({
        sessionToken: transaction.sessionToken,
      })

      const userData = {
        id: transaction.user?.id,
        profile: {
          login: transaction.user?.profile?.login,
          firstName: transaction.user?.profile?.firstName,
          lastName: transaction.user?.profile?.lastName
        }
      }

      sessionStorage.setItem('profileData', JSON.stringify(userData));
      return { success: true }
    } else {
      return { success: false, error: 'Authentication failed' }
    }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, error: 'An error occurred during login' }
  }
}