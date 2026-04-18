"use client"

import React, {useEffect} from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"
import Link from 'next/link'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useParams } from "next/navigation";

const page = () => {
    const params = useParams();
    
    const { data: session, status } = useSession();
    const router = useRouter();
    
    const username = session?session.user.email.split('@')[0]:"";
    
    useEffect(() => {
        if (status === "unauthenticated") {
        router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="text-center relative top-50">
                <div className="flex-col gap-4 w-full flex items-center justify-center">
                <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                    <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full" />
                </div>
                </div>
                <h2 className="text-zinc-900 dark:text-black mt-4">Loading...</h2>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    return (
        <>
            <div className='banner relative'>
                <img className='w-full' src="/banner1.jpg" alt="banner" />
            </div>

            <div className='profile justify-center items-center flex'>
                <Image width={300} height={300} className='z-10 cursor-pointer absolute top-78 border-2 border-white rounded-full w-30' src={"/documents/ppSizePhoto.jpeg"} alt="profile-picture" />
                <div className='pt-25 text-center'>
                    <div className='font-bold text-xl cursor-pointer'>@{username}</div>
                    <div className='text-sm text-zinc-600'>Solving problems and improving lives through tech!</div>
                    <div className='stats text-sm text-zinc-600'>
                        <span>9,178 bolsters | </span>
                        <span>82 posts</span>
                        <span></span>
                    </div>

                    <Link href={!session?"/login":"/services"} className='mt-5 flex gap-10 justify-center'>
                        <button className="cursor-pointer relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group">
                            <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                            <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                            </span>
                            <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4">
                            <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                            </span>
                            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0" />
                            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                                Become a bolsterer
                            </span>
                        </button>
                    </Link>

                    <div className="flex items-center gap-4 justify-center my-2 scale-80">

                        <a target='_blank' href="/documents/myresume6.1.pdf" className="social-button">
                          <button className="relative w-12 h-12 rounded-full group">
                            <div className="floater w-full h-full absolute top-0 left-0 bg-violet-400 rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl" />
                            <div className="cursor-pointer icon relative z-10 w-full h-full flex items-center justify-center border-2 border-violet-400 rounded-full">
                              <svg height={24} width={24} viewBox="2 2 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path className='fill-white' opacity="0.15" d="M5 21H19V9H15C13.8954 9 13 8.10457 13 7V3H5V21Z" fill="#000000"/>
                                <path className='fill-white' d="M8 13H14M8 17H16M13 3H5V21H19V9M13 3H14L19 8V9M13 3V7C13 8 14 9 15 9H19" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </button>
                        </a>

                        <a href="https://github.com/Shubham-Rana-cse" target='_blank' className="social-button">
                          <button className="relative w-12 h-12 rounded-full group">
                            <div className="floater w-full h-full absolute top-0 left-0 bg-black rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl" />
                            <div className="cursor-pointer icon relative z-10 w-full h-full flex items-center justify-center border-2 border-black rounded-full">
                              <svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path className="group-hover:fill-[#171543] fill-white duration-300" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.17 6.839 9.481.5.092.683-.217.683-.481 0-.237-.009-.866-.013-1.699-2.782.603-3.37-1.338-3.37-1.338-.454-1.15-1.11-1.458-1.11-1.458-.906-.619.069-.606.069-.606 1.002.071 1.527 1.03 1.527 1.03.89 1.529 2.34 1.087 2.911.831.091-.645.348-1.087.634-1.338-2.22-.252-4.555-1.11-4.555-4.94 0-1.09.39-1.986 1.028-2.682-.103-.252-.446-1.268.098-2.642 0 0 .837-.268 2.75 1.024a9.563 9.563 0 012.496-.335 9.58 9.58 0 012.496.335c1.913-1.292 2.75-1.024 2.75-1.024.544 1.374.202 2.39.1 2.642.64.696 1.027 1.592 1.027 2.682 0 3.839-2.338 4.685-4.567 4.933.358.309.678.916.678 1.847 0 1.334-.012 2.412-.012 2.74 0 .267.18.577.688.481A12.01 12.01 0 0022 12c0-5.523-4.477-10-10-10z" fill="#FFFFFF" />
                              </svg>
                            </div>
                          </button>
                        </a>

                        <a target='_blank' href="https://www.linkedin.com/in/shubham-rana45/" className="social-button">
                          <button className="relative w-12 h-12 rounded-full group">
                            <div className="floater w-full h-full absolute top-0 left-0 bg-blue-500 rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl" />
                            <div className="cursor-pointer icon relative z-10 w-full h-full flex items-center justify-center border-2 border-blue-500 rounded-full">
                              <svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path className="group-hover:fill-[#171543] fill-white duration-300" d="M20,2H4C2.9,2,2,2.9,2,4v16c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z M8.5,19H6V10h2.5V19z M7.3,9 h-0.1C6.4,9,6,8.6,6,8.1V7.9c0-0.5,0.4-0.9,0.9-0.9h0.1C7.6,7,8,7.4,8,7.9v0.1C8,8.6,7.6,9,7.3,9z M19,19h-2.5v-4.9 c0-1.2-0.4-2-1.4-2c-0.8,0-1.3,0.6-1.5,1.2h-0.1V19H10V10h2.3v1.3h0C12.7,10.7,14,9.9,15.5,9.9c2.1,0,3.5,1.4,3.5,3.8V19z" fill="#FFFFFF" />
                              </svg>
                            </div>
                          </button>
                        </a>

                        <a target='_blank' href="https://mail.google.com/mail/?view=cm&fs=1&to=shubhamrana181945@gmail.com&su=Let's%20Connect" className="social-button">
                          <button className="relative w-12 h-12 rounded-full group">
                            <div className="floater w-full h-full absolute top-0 left-0 bg-red-400 rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl" />
                            <div className="cursor-pointer icon relative z-10 w-full h-full flex items-center justify-center border-2 border-red-400 rounded-full">
                              <svg height={32} width={32} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                <path className="group-hover:fill-[#171543] fill-white duration-300" d="M28 5H4c-1.104 0-2 .896-2 2v18c0 1.104.896 2 2 2h24c1.104 0 2-.896 2-2V7c0-1.104-.896-2-2-2zm0 4.879L16 18 4 9.879V7l12 8 12-8v2.879zM4 23V11.885l11.446 7.63c.269.18.594.274.921.274s.652-.094.92-.274L28 11.885V23H4z" fill="#FFFFFF" />
                              </svg>
                            </div>
                          </button>
                        </a>

                      </div>
                </div>
            </div>

            <div className='grid grid-cols-2 gap-5'>
                <div className='bg-[#F0FFF7] rounded-2xl min-h-30 m-4 overflow-hidden'>
                    <header className='h-[10%] flex m-5 items-center'>
                        <h1 className='text-2xl font-bold' >See bolsterers live</h1>
                        <DotLottieReact
                            src="/animations/liveDot.lottie"
                            loop
                            autoplay
                            style={{ width: "100%", maxWidth: "60px", height: "auto", scale: "2" }}
                        />
                    </header>
                    <main className='mx-5'>
                        <div className='flex my-2 gap-2 items-center'>
                            <img src="/greenTick.svg" alt="ok" className='w-6' />
                            <p>$20 reveived from Rohit Sharma.</p>
                            <img src="/user.svg" alt="user" className='w-6' />

                        </div>
                        <div className='flex my-2 gap-2 items-center'>
                            <img src="/greenTick.svg" alt="ok" className='w-6' />
                            <p>$20 reveived from Rohit Sharma.</p>
                            <img src="/user.svg" alt="user" className='w-6' />

                        </div>
                        <div className='flex my-2 gap-2 items-center'>
                            <img src="/greenTick.svg" alt="ok" className='w-6' />
                            <p>$20 reveived from Rohit Sharma.</p>
                            <img src="/user.svg" alt="user" className='w-6' />

                        </div>
                        <div className='flex my-2 gap-2 items-center'>
                            <img src="/greenTick.svg" alt="ok" className='w-6' />
                            <p>$20 reveived from Rohit Sharma.</p>
                            <img src="/user.svg" alt="user" className='w-6' />

                        </div>
                        <div className='flex my-2 gap-2 items-center'>
                            <img src="/greenTick.svg" alt="ok" className='w-6' />
                            <p>$20 reveived from Rohit Sharma.</p>
                            <img src="/user.svg" alt="user" className='w-6' />

                        </div>
                        <div className='flex my-2 gap-2 items-center'>
                            <img src="/greenTick.svg" alt="ok" className='w-6' />
                            <p>$20 reveived from Rohit Sharma.</p>
                            <img src="/user.svg" alt="user" className='w-6' />

                        </div>
                        <div className='flex my-2 gap-2 items-center'>
                            <img src="/greenTick.svg" alt="ok" className='w-6' />
                            <p>$20 reveived from Rohit Sharma.</p>
                            <img src="/user.svg" alt="user" className='w-6' />

                        </div>
                        <div className='flex my-2 gap-2 items-center'>
                            <img src="/greenTick.svg" alt="ok" className='w-6' />
                            <p>$20 reveived from Rohit Sharma.</p>
                            <img src="/user.svg" alt="user" className='w-6' />

                        </div>
                        <div className='flex my-2 gap-2 items-center'>
                            <img src="/greenTick.svg" alt="ok" className='w-6' />
                            <p>$20 reveived from Rohit Sharma.</p>
                            <img src="/user.svg" alt="user" className='w-6' />

                        </div>
                        <div className='flex my-2 gap-2 items-center'>
                            <img src="/greenTick.svg" alt="ok" className='w-6' />
                            <p>$20 reveived from Rohit Sharma.</p>
                            <img src="/user.svg" alt="user" className='w-6' />

                        </div>
                        <div className='flex my-2 gap-2 items-center'>
                            <img src="/greenTick.svg" alt="ok" className='w-6' />
                            <p>$20 reveived from Rohit Sharma.</p>
                            <img src="/user.svg" alt="user" className='w-6' />

                        </div>
                    </main>
                </div>

                <div className='min-h-30 m-5 p-5'>
                    <div className="flex flex-col items-center justify-center my-10 dark">
                        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-gray-200 mb-4">Make a payment!</h2>
                            <form className="flex flex-col">
                                <input placeholder="Enter your name" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text" />

                                <input placeholder="Please enter a message for me..." className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="email" />
                                
                                <label className="text-zinc-400 cursor-pointer">Payment Credentials</label>
                                <input placeholder="Enter your amount in ₹" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text" />
                                <input placeholder="Enter your Razorpay Secret" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text" />

                                <div className='flex gap-5 mx-auto my-5'>
                                    <button className="cursor-pointer transition-all bg-gray-700 text-white px-6 py-2  rounded-lg border-white border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                                    ₹10
                                    </button>
                                    <button className="cursor-pointer transition-all bg-gray-700 text-white px-6 py-2 rounded-lg border-white border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                                    ₹20
                                    </button>
                                    <button className="cursor-pointer transition-all bg-gray-700 text-white px-6 py-2 rounded-lg border-white border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                                    ₹30
                                    </button>
                                </div>

                                <button
                                    className="bg-zinc-100 rounded-2xl h-14 relative text-black text-xl font-semibold group"
                                    type="submit"
                                    >
                                    <div className="hover:bg-gray-800 hover:to-gray-800 rounded-xl h-12 w-1/4 flex items-center justify-center absolute right-1 top-[4px] group-hover:w-[98%] z-10 duration-500">
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 1024 1024"
                                        height="25px"
                                        width="25px"
                                        >
                                        <path
                                            d="M800 480H160a32 32 0 1 0 0 64h640a32 32 0 1 0 0-64z"
                                            fill="green"
                                        />
                                        <path
                                            d="m786.752 512-265.408 265.344a32 32 0 0 0 45.312 45.312l288-288a32 32 0 0 0 0-45.312l-288-288a32 32 0 1 0-45.312 45.312L786.752 512z"
                                            fill="green"
                                        />
                                        </svg>
                                    </div>

                                    <p className='mr-9'>Pay now</p>
                                </button>
                            </form>
                        </div>
                        </div>
                </div>
            </div>
        </>
    )
}

export default page
