"use client"

import React, { useState } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react"

const Navbar = () => {

  //moved it at top 
  const [isOpen, setIsOpen] = useState(false)   //for mobile view

  const { data: session } = useSession()
/*   const userDisplayName = session?session.user.email:"";  //make a check else code will crash
 */
  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/60 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <a href='/' className="cursor-pointer text-xl font-bold tracking-tight text-gray-900 sm:text-2xl flex items-center">
          <DotLottieReact
            src="/animations/group.lottie"
            loop
            autoplay
            style={{ width: "50%", maxWidth: "100px", height: "auto" }}
          />
          Bolster
        </a>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 text-sm font-medium text-gray-700 md:flex">
          <Link href="/" className="transition hover:text-violet-600">
            Home
          </Link>
          <Link href="/about" className="transition hover:text-violet-600">
            About
          </Link>
          <Link href="/services" className="transition hover:text-violet-600">
            Services
          </Link>
          <Link href="/contact" className="transition hover:text-violet-600">
            Contact
          </Link>
          
          <div className='flex gap-3'>

            {!session &&
            <Link href={"/login"}>
              <button className="cursor-pointer transition-all bg-indigo-500 text-white px-6 py-2 rounded-lg border-indigo-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                Login
              </button>           
            </Link>
            }

            {/* {session &&
            <Link href={"/dashboard"}>
              <button className="cursor-pointer transition-all bg-indigo-500 text-white px-6 py-2 rounded-lg border-indigo-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                Dashboard
              </button>
            </Link>
            } */}

            {session &&
              <div className="flex text-[16px] text-black">
                <div className="relative group">
                  <Link
                    href={`/${session.user.name}`}
                    className="relative flex items-center justify-center gap-3 overflow-hidden rounded-2xl px-5 py-3 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rounded-b-none group-hover:text-white"
                  >
                    {/* Background Animation */}
                    <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-indigo-700 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:origin-right group-hover:scale-x-100" />

                    <span><span className='text-lg'>Welcome</span> <span className='text-xs'>{session?session.user.email:""}</span></span>

                    <svg
                      viewBox="0 0 360 360"
                      className="h-[14px] w-[14px] fill-black transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-rotate-180 group-hover:fill-white"
                    >
                      <path d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z" />
                    </svg>
                  </Link>

                  {/* Submenu */}
                  <div className="pointer-events-none absolute left-0 top-full z-10 w-full translate-y-[-12px] overflow-hidden rounded-b-2xl border border-gray-300 bg-white opacity-0 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:border-indigo-700 group-hover:opacity-100">
                    {["Dashboard", "Manage Profile"].map((item) => (
                      <Link
                        key={item}
                        href={
                          item==="Dashboard"
                          ? `/${session.user.name}`
                          : item === "Manage Profile"
                          ? '/profile'
                          :""
                        }
                        className="relative block overflow-hidden px-6 py-3 text-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-indigo-600 before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-white hover:before:origin-right hover:before:scale-x-100"
                      >
                        {item}
                      </Link>
                    ))}
                    <div onClick={()=>{signOut()}}
                        className="relative block cursor-pointer overflow-hidden px-6 py-3 text-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-indigo-600 before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-white hover:before:origin-right hover:before:scale-x-100"
                      >
                        Logout
                      </div>
                  </div>
                </div>
              </div>
            }


            {!session && 
            <Link href={"/login"}>
              <button className="cursor-pointer transition-all bg-indigo-500 text-white px-6 py-2 rounded-lg border-indigo-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                Sign Up
              </button>
            </Link>
            }

            {/* {session &&
            <div onClick={()=>{signOut()}}>
              <button className="cursor-pointer transition-all bg-indigo-500 text-white px-6 py-2 rounded-lg border-indigo-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                Logout
              </button>           
            </div>
            } */}

          </div>
          
        </div>

        {/* Mobile Hamburger */}
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md p-2 text-gray-700 transition hover:bg-white/40 md:hidden"
            >
            <span className="text-2xl">
                {isOpen ? '✕' : '☰'}
            </span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-white/20 bg-white/80 px-4 py-4 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-4 text-sm font-medium text-gray-700">

            {session &&
              <span className='text-center flex items-center font-bold'>Welcome, Shubham Rana</span>
            }


            <Link href={"/"} className="transition hover:text-violet-600">
              Home
            </Link>
            <Link href="/about" className="transition hover:text-violet-600">
              About
            </Link>
            <Link href="/services" className="transition hover:text-violet-600">
              Services
            </Link>
            <Link href="/contact" className="transition hover:text-violet-600">
              Contact
            </Link>
            
            {!session &&
            <Link href="/login" className="transition hover:text-violet-600">
              Login
            </Link>
            }


            {!session && 
            <Link href="/login" className="transition hover:text-violet-600">
              Sign Up
            </Link>
            }

            {session &&
            <div onClick={()=>{signOut()}} className="transition hover:text-violet-600">
              Logout      
            </div>
            }

          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar;