"use client"

import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'

const page = () => {

  const { data: session } = useSession()

  if(session) {
      const router = useRouter();
      router.push(`/${session.user.name}`);
    }

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-8">

        <div className="border-black border rounded-2xl xl:mx-auto xl:w-full shadow-md p-4 xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center" />
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account? Create a free account
          </p>
          <form className="mt-8" method="POST" action="#">
            <div className="space-y-5">
              <div>
                <label className="text-base font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input placeholder="Email" type="email" className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-base font-medium text-gray-900">
                    Password
                  </label>
                  <a className="text-sm font-semibold text-black hover:underline" href="#">
                    Forgot password?
                  </a>
                </div>
                <div className="mt-2">
                  <input placeholder="Password" type="password" className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" />
                </div>
              </div>
              <div>
                <button className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80" type="button">
                  Get started
                </button>
              </div>
            </div>
          </form>
          <div className="mt-3 space-y-3">

            {/* Google */}
            <button onClick={()=>{signIn("google")}} className="w-full justify-center cursor-pointer text-black flex gap-2 items-center bg-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-all ease-in duration-200">
            <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-6">
                <path d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" fill="#FFC107" />
                <path d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" fill="#FF3D00" />
                <path d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" fill="#4CAF50" />
                <path d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" fill="#1976D2" />
            </svg>
            Continue with Google
            </button>

            {/* Facebook */}
            <button className="w-full justify-center cursor-pointer text-white flex gap-2 items-center bg-blue-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition-all ease-in duration-200">
            <svg className="w-6 fill-zinc-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z" />
            </svg>
            Login with Facebook
            </button>

            {/* LinkedIn */}
            <button className="w-full justify-center cursor-pointer text-white flex gap-3 items-center bg-[#0A66C2] px-4 py-2 rounded-lg font-medium text-sm hover:bg-[#004182] transition-all duration-200 shadow-sm">
                <div className="bg-white rounded p-1 flex items-center justify-center">
                <svg
                    className="w-5 h-5 fill-[#0A66C2]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0H12v2.3h.1c.6-1.1 2.1-2.3 4.4-2.3 4.7 0 5.5 3.1 5.5 7.1V24h-5v-7.4c0-1.8 0-4.1-2.5-4.1s-2.9 1.9-2.9 4V24h-5V8z" />
                </svg>
                </div>
                Continue with Linkedin
            </button>

            {/* Instagram */}
            <button className="w-full justify-center cursor-pointer text-white flex gap-2 items-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 px-4 py-2 rounded-lg font-medium text-sm hover:opacity-90 transition-all duration-200">
                <svg
                className="w-6 h-6 fill-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                >
                <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm0 2h8.5C18.33 4 20 5.67 20 7.75v8.5c0 2.08-1.67 3.75-3.75 3.75h-8.5C5.67 20 4 18.33 4 16.25v-8.5C4 5.67 5.67 4 7.75 4zm8.75 1a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
                </svg>
                Continue with Instagram
            </button>

            {/* GitHub */}
            <button onClick={()=>{signIn("github")}} className="w-full justify-center cursor-pointer text-white flex gap-2 items-center bg-zinc-900 px-4 py-2 rounded-lg font-medium text-sm hover:bg-black transition-all duration-200">
                <svg
                className="w-6 h-6 fill-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                >
                <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 008 10.95c.58.1.79-.25.79-.56v-2.15c-3.25.7-3.93-1.56-3.93-1.56-.53-1.34-1.3-1.7-1.3-1.7-1.07-.73.08-.71.08-.71 1.18.08 1.8 1.22 1.8 1.22 1.05 1.8 2.76 1.28 3.43.98.1-.77.41-1.28.74-1.58-2.6-.3-5.33-1.3-5.33-5.77 0-1.27.45-2.3 1.2-3.12-.12-.3-.52-1.52.12-3.18 0 0 .98-.31 3.2 1.19a11.2 11.2 0 015.82 0c2.22-1.5 3.2-1.19 3.2-1.19.64 1.66.24 2.88.12 3.18.75.82 1.2 1.85 1.2 3.12 0 4.48-2.73 5.46-5.34 5.76.42.37.8 1.1.8 2.23v3.3c0 .31.21.67.8.56A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
                </svg>
                Continue with GitHub
            </button>

          </div>
        </div>
      </div>
    </section>
  )
}

export default page
