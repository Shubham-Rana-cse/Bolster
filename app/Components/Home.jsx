"use client"

import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';


const Home = () => {

  const { data: session } = useSession();
  const userDisplayName = session?session.user.email:"";

  return (
    <>
      <div className='flex flex-col justify-center items-center mt-10 w-4xl mx-auto'>
        <div> Tired off large platform cuts or platform limits? </div>
        <h1 className='text-9xl'>Bolster</h1>
        <div className='text-center text-lg'>
          <span>A crowdfunding platform for creators to get funds and support from your audience directly.</span>
          <div>Unlike platform memberships, Bolster lets you connect with supporters directly and keep your community truly yours.</div>
        </div>

        <Link href={!session?"/login":"/dashboard"}className='get-started-button mt-5 flex gap-10'>
          <button className="cursor-pointer relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group">
            <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4">
              <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
            </span>
            <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4">
              <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
            </span>
            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0" />
            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
              Get Started
            </span>
          </button>
        </Link>

        <DotLottieReact
          key="home-animation1"
          src="/animations/group.lottie"
          loop
          autoplay
          style={{ width: "100%", maxWidth: "200px", height: "auto" }}
          className='my-10'
        />
      </div>

      <div className='h-1 bg-gray-400'></div>

      <div className='text-center my-10'>
        <h1 className='my-10 text-2xl'>Your supporters will bolster you for work</h1>

        <div className='grid grid-cols-3 gap-10'>

          <div className='flex flex-col justify-center items-center'>
            <div className="relative w-60 h-60 bg-gray-200 rounded-full overflow-hidden">
              <DotLottieReact
              key="home-animation2"
                src="/animations/contentCreation.lottie"
                loop
                autoplay
                className="absolute w-full h-full scale-100"
                />
            </div>
            
            <div className='mt-2 text-center'>
              <p className='font-bold'>Make content</p>
              <p className='mt-2'>Create content for your bolsterers</p>
            </div>
          </div>

          <div className='flex flex-col justify-center items-center'>
            <div className='bg-gray-200 rounded-full w-60 h-60 relative overflow-hidden'>
              <DotLottieReact
              key="home-animation3"
                src="/animations/money.lottie"
                loop
                autoplay
                className='absolute w-full h-full scale-150'
                />
            </div>

            <div className='mt-2 text-center'>
              <p className='font-bold'>Get fundings</p>
              <p className='mt-2'>Get financial support from your bolsterers</p>
            </div>
          </div>


          <div className='flex flex-col justify-center items-center'>
            <div className="relative w-60 h-60 bg-gray-200 rounded-full overflow-hidden">
              <DotLottieReact
              key="home-animation4"
                src="/animations/interaction.lottie"
                loop
                autoplay
                className="absolute inset-0 ml-3 w-full h-full scale-140"
                />
            </div>

            <div className='mt-2 text-center'>
              <p className='font-bold'>Connect direclty</p>
              <p className='mt-2'>Get direclty connected with your bolsterers</p>
            </div>
          </div>
        </div>

      </div>

      <div className='h-1 bg-gray-400'></div>
    
    </>
  )
}

export default Home;
