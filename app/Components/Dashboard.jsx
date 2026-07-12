"use client"

import React, {useEffect, useState} from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from "next-auth/react"
import Link from 'next/link'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Script from 'next/script'
import { fetchUser, fetchPayments, initiate } from '@/actions/useractions'
import { ToastContainer, toast, Bounce  } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const Dashboard = ({username}) => {
    
    const { data: session, status } = useSession();
    const router = useRouter();
        
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    const [paymentForm, setPaymentForm] = useState({name: "", message: "", amount: ""});

    const handleChange = (e)=>{
        setPaymentForm({...paymentForm, [e.target.name]: e.target.value})
        console.log(paymentForm);
    }

    const pay = async (amount) =>{
        //console.log(paymentForm);

        let order = await initiate(amount, session?.user.name, username, paymentForm)
        const orderId = order.id;
        //console.log(orderId);

        var options = {
            //"key": process.env.RAZORPAY_ID,
            /* key: process.env.NEXT_PUBLIC_RAZORPAY_ID, */
            key: currentUser.razorpayid,
            /* 
                In Next.js:
                -> process.env.RAZORPAY_SECRET and process.env.RAZORPAY_ID are only available on the server
                -> Any env variable used in the browser must start with NEXT_PUBLIC_
            */
            "amount": amount,
            "currency": "INR",
            "name": "Bolster",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId,
            "callback_url": "https://get-bolster.vercel.app/api/razorpay",
            "prefill": {
                "name": "Shubham Rana",
                "email": "shubhamrana181945@gmai.com",
                "contact": "+918218388093"
            },
            "notes": {
                "address": "Dehradun, UK, India"
            },
            "theme": {
                "color": "#3399cc"
            }
        }
        /*
        In a server component or server action you would use the Razorpay npm package:

        because server code runs in Node.js, where the razorpay package works and where your secret key is safe.
        does not exist on the server.

        window.Razorpay only exists in the browser after this <Script src="https://checkout.razorpay.com/v1/checkout.js" /> loads
        */
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    const [currentUser, setCurrentUser] = useState({});
    const [recentPayments, setRecentPayments] = useState([])

    let profilepic = currentUser.profilepic?.url || "/documents/defaultProfilePic.png", bannerpic=currentUser.bannerpic?.url|| "/banner1.jpg", document=currentUser.document?.url || "";

    const getData = async () => {
        let user = await fetchUser(username);   //defined in useractions.js
        
        if (!user) {
            router.replace("/404"); //use router.replace instead of router.push so the invalid profile page is not left in browser history
            return;
        }
    
        setCurrentUser(user);
        console.log(user);


        let payments = await fetchPayments(username);
        setRecentPayments(payments || []);
        console.log(payments);
    }

    useEffect(() => {
        if (status === "authenticated" && username) {
            getData();
        }
    }, [status, username]);

    const searchParams = useSearchParams();

    useEffect(() => {
      if (session && searchParams.get("paymentDone") === 'true') {
        toast.success('Payment successful', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        });

        // remove query param to prevent repeat
        setTimeout(() => {  //beacuse page immediatley re-freshes
          router.replace(`/${username}`, { scroll: false });
        }, 1000);
        
      }
    }, [session, searchParams]);
    

    let noOfPayments = recentPayments.length * 100;
    let noOfBolsterers = new Set(
      recentPayments.map((payment) => payment.from_user)
    ).size * 100;

    if (status === "loading") {
        return (
            <div className="text-center relative top-50">
                <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

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
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
            />

            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='banner relative'>
                <img className='w-full h-60 object-cover' src={bannerpic?bannerpic:"/banner1.jpg"} /* src="/banner1.jpg" */ alt="banner" />
            </div>

            <div className='profile justify-center items-center flex'>
                <img width={300} height={300} className='z-10 cursor-pointer absolute top-[19%] border-2 border-white rounded-full w-30' src={profilepic?profilepic:"/documents/defaultProfilePic.png"} /* src={"/documents/ppSizePhoto.jpeg"} */ alt="profile-picture" />
                <div className='pt-25 text-center'>
                    <div className='font-bold text-xl cursor-pointer'>@{username}</div>
                    <div className='text-sm text-zinc-600'>Solving problems and improving lives through tech!</div>
                    <div className='stats text-sm text-zinc-600'>
                        <span>{noOfBolsterers} bolsters | </span>
                        <span>{noOfPayments} payments</span>
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

                        <a target='_blank' href={document} /* href="/documents/myresume6.1.pdf" */ className="social-button">
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

                        <a href="https://x.com/shubh_rana01" target='_blank' className="social-button">
                          <button className="relative w-12 h-12 rounded-full group">
                            <div className="floater w-full h-full absolute top-0 left-0 bg-black rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl" />
                            <div className="cursor-pointer icon relative z-10 w-full h-full flex items-center justify-center border-2 border-black rounded-full">
                              <svg
                                viewBox="0 0 24 24"
                                width="22"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.633 7.584H.479l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932Zm-1.291 19.492h2.039L6.486 3.24H4.298l13.312 17.405Z"
                                  className="fill-white group-hover:fill-black duration-300"
                                />
                              </svg>
                            </div>
                          </button>
                        </a>
                
                        <a href="https://www.instagram.com/shubh_rana01/" target='_blank' className="social-button">
                          <button className="relative w-12 h-12 rounded-full group">
                            <div className="floater w-full h-full absolute top-0 left-0 bg-gradient-to-br from-[#f9ce34] via-[#e91e72] to-[#6228d7] rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl" />
                            <div className="cursor-pointer icon relative z-10 w-full h-full flex items-center justify-center border-2 border-[#eb3b8485] rounded-full">
                              <svg
                                viewBox="0 0 24 24"
                                className="btn-svg"
                                width="22px"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                                    fill="#fff"
                                    className='group-hover:fill-black'
                                  ></path>
                                  <path
                                    d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                                    fill="#fff"
                                    className='group-hover:fill-black'
                                  ></path>
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
                                    fill="#fff"
                                    className='group-hover:fill-black'
                                  ></path>
                                </g>
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
                <div className='bg-[#F0FFF7] rounded-2xl min-h-30 max-h-200 m-4 overflow-y-auto relative'>
                    <header className='sticky top-0 z-10 bg-[#F0FFF7] h-[10%] flex m-5 items-center'>
                        <h1 className='text-2xl font-bold' >See bolsterers live</h1>
                        <DotLottieReact
                            src="/animations/liveDot.lottie"
                            loop
                            autoplay
                            style={{ width: "100%", maxWidth: "60px", height: "auto", scale: "2" }}
                            />
                    </header>
                    <main className='mx-5'>
                          {recentPayments.length == 0 && <p className='text-gray-600 text-lg'>No bolsterers yet !</p>}

                          {  recentPayments.map((payment) => {
                                return <div key={payment.order_id} className='flex my-2 gap-2 items-center justify-between'>
                                    <div className='flex gap-2'>
                                        <img src="/user.svg" alt="user" className='w-6' />
                                        <p className='break-all'><b>₹{payment.amount/100}</b> received from <b>{payment.name}</b>, with a message "<i className='text-zinc-600'>{payment.message}</i>" </p>
                                    </div>
                                    <img src="/greenTick.svg" alt="ok" className='w-6' />
                                </div>
                            })
                        }
                        
                    </main>
                </div>

                <div className='min-h-30 m-5 p-5'>
                    <div className="flex flex-col items-center justify-center my-10 dark">
                        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-gray-200 mb-4">Make a payment!</h2>
                            <form className="flex flex-col">
                                <input onChange={handleChange} name='name' value={paymentForm.name} placeholder="Enter your name" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text" />

                                <input onChange={handleChange} name='message' value={paymentForm.message} placeholder="Please enter a message for me..." className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="message" />
                                
                                <input onChange={handleChange} name='amount' value={paymentForm.amount} placeholder="Enter your amount in ₹" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="number" />

                                <label className="text-zinc-400 cursor-pointer">Or select amount from below </label>
                                <div className='flex gap-5 mx-auto my-5'>
                                    {/* Inside a <form>, a <button> without an explicit type defaults to type="submit" */}
                                    <button type='button' disabled={!paymentForm.name.length} onClick={()=>{pay(1000)}} className="cursor-pointer transition-all bg-gray-700 text-white px-6 py-2  rounded-lg disabled:border-gray-500 border-white border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                                    ₹10
                                    </button>
                                    <button type='button' disabled={!paymentForm.name.length} onClick={()=>{pay(2000)}} className="cursor-pointer transition-all bg-gray-700 text-white px-6 py-2 rounded-lg disabled:border-gray-500 border-white border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                                    ₹20
                                    </button>
                                    <button type='button' disabled={!paymentForm.name.length} onClick={()=>{pay(3000)}} className="cursor-pointer transition-all bg-gray-700 text-white px-6 py-2 rounded-lg disabled:border-gray-500 border-white border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                                    ₹30
                                    </button>
                                </div>

                                <button
                                    onClick={()=>{pay(Number.parseInt(paymentForm.amount)*100)}}
                                    className="disabled:bg-slate-300 disabled:pointer-events-none bg-zinc-100 rounded-2xl h-14 relative text-black text-xl font-semibold group"
                                    type="button"
                                    disabled={!paymentForm.name.length || !paymentForm.amount.length}
                                    >
                                    <div className="hover:bg-blue-600 hover:to-gray-800 rounded-xl h-12 w-1/4 flex items-center justify-center absolute right-1 top-[4px] group-hover:w-[98%] z-10 duration-500">
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

export default Dashboard;