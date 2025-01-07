'use client'

import Link from 'next/link'
import { useAuth } from './Auth'
import { signOut } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Image from 'next/Image';
// import { useAuth } from './Auth'

export default function Header() {
  const { authState } = useAuth()
  //const { 'abc' } = useAuth();
  const router = useRouter()
  // console.log("The session token is :", TokenParams.sessionToken);

  // if (authState?.isAuthenticated) {
  console.log("The authentication is : ", authState?.isAuthenticated);
  // }


  const user = sessionStorage.getItem('profileData');
  console.log("The session is : ", user);
  let firstName;
  let lastName;
  // let userId;

  if (user) {
    const parsedData = JSON.parse(user);
    firstName = parsedData.profile.firstName;
    lastName = parsedData.profile.lastName;
    // userId = parsedData.id;
    console.log("The data is : ", parsedData);
  }

  const handleSignOut = async () => {
    sessionStorage.removeItem("profileData");
    console.log("The session data is : ", sessionStorage.getItem("profileData"));
    await signOut()
    router.push('/')
  }

  return (
    <header className="p-4" id="bluelinxHeader">
      <nav className="flex flex-wrap justify-between items-center">
        {/* <Link href="/" className="text-2xl font-bold mb-2 sm:mb-0"> */}
        <Image src="/bluelinx.jpg" alt="Bluelinx Conference Logo" className="h-8 w-auto" width={150} height={40} />
        {/* </Link> */}

        {sessionStorage.getItem('profileData') && (
          <>
            <div className="flex flex-wrap gap-4 font-bold">
              <Link href="/agenda">Agenda</Link>
              <Link href="/venue-layout">Venue Layout</Link>
              <Link href="/feedback">Feedback</Link>
              {/* <Link href="/booth-checkin">Booth Checkin</Link> */}
              {/* <Link href="/resources">Resources</Link> */}
              {/* <Link href="/qr-scanner">QR Scanner</Link> */}
            </div>
            <div className="flex items-center gap-4">
              <span>Welcome, {lastName} {firstName}</span>
              <Button onClick={handleSignOut} variant="outline">Logout</Button>
            </div>
          </>
        )}
      </nav>
    </header>
  )
}



