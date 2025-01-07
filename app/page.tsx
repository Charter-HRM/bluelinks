// import Link from 'next/link'
import Login from './login/page'

export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <main className="flex flex-col items-center justify-center w-full px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to the Conference
        </h1>

        <p className="mt-3 text-2xl">
          January 27 - 30, 2025
        </p>

        {/* <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full"> */}
        {/* <Link
            href="/login"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Login &rarr;</h3>
            <p className="mt-4 text-xl">
              Access the conference portal
            </p> 
          </Link>*/}
        <Login />
        {/* </div> */}
      </main>
    </div>
  )
}
