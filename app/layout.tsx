import './globals.css'
import { Inter } from 'next/font/google'
import { Auth } from './components/Auth'
import Header from './components/Header'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Bluelinx Conference',
  description: 'Conference assistant for Bluelinx',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Auth>
          <div>
            <Header />{children}<Footer />
          </div></Auth>
      </body>
    </html>
  )
}
