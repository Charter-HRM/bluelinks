'use client'

import Link from 'next/link'
import { signOut } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Image from 'next/image';
import { useEffect, useState } from 'react'

export default function Header() {
  //const [user, setUser] = useState<unknown>(null);
  const router = useRouter();
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Safely access sessionStorage on the client
    if (typeof window !== 'undefined') {
      const profileData = sessionStorage.getItem('profileData');
      if (profileData) {
        const parsedData = JSON.parse(profileData);
        const firstName = parsedData.profile.firstName;
        const lastName = parsedData.profile.lastName;
        const userId = parsedData.id;
        setUserFirstName(firstName);
        setUserLastName(lastName);
        setUserId(userId);
      }
    }
  }, []);


  // if (user) {
  //   const parsedData = user.profile.firstName;
  //   firstName = parsedData.profile.firstName;
  //   lastName = parsedData.profile.lastName;
  //   // userId = parsedData.id;
  //   console.log("The data is : ", parsedData);
  // }

  const handleSignOut = async () => {
    //sessionStorage.removeItem("profileData");
    // console.log("The session data is : ", sessionStorage.getItem("profileData"));
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('profileData');
      console.log('Session data cleared:', sessionStorage.getItem('profileData'));
    }
    await signOut()
    router.push('/')
  }

  return (
    <header className="p-4">
      <nav className="flex flex-wrap justify-between items-center">
        <Image src="/bluelinx.jpg" alt="Bluelinx Conference Logo" className="h-8 w-auto" width={150} height={40} />

        {userId && (
          <>
            <div className="flex flex-wrap gap-4 font-bold" id='bluelinxHeader'>
              <Link href="/agenda">Agenda</Link>
              <Link href="/venue-layout">Venue Layout</Link>
              <Link href="/feedback">Feedback</Link>
              {/* <Link href="/booth-checkin">Booth Checkin</Link> */}
              {/* <Link href="/resources">Resources</Link> */}
              {/* <Link href="/qr-scanner">QR Scanner</Link> */}
            </div>
            <div className="flex items-center gap-4" id='logoutHeader'>
              <span>Welcome, {userLastName} {userFirstName}</span>
              <Button onClick={handleSignOut} variant="outline">Logout</Button>
            </div>

          </>
        )}
      </nav>
    </header>
  )
}



