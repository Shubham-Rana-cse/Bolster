"use client"

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchUser, updateProfile } from '@/actions/useractions';
import Script from 'next/script';

const Page = () => {

  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    phonenumber: "",
    x: "",
    instagram: "",
    linkedin: "",
    profilepicture: null,
    profilebanner: null,
    document: null,
    razorpayid: "",
    razorpaysecret: "",
  });

  const getData = async ()=>{

    let user = await fetchUser(session.user.name);
    console.log(session)
    console.log(user)
    
    if(!user)   return;

    setProfile({
      username: user.username || "",
      email: user.email || "",
      phonenumber: user.phonenumber || "",
      x: user.x || "",
      instagram: user.instagram || "",
      linkedin: user.linkedin || "",
      profilepicture: user.profilepicture || null,
      profilebanner: user.profilebanner || null,
      document: user.document || null,
      razorpayid: user.razorpayid || "",
      razorpaysecret: user.razorpaysecret || "",
    });
  }

  useEffect(() => {

    if (status === "loading")
      return;

    if(!session || status === "unauthenticated"){
      router.push('/login');
      return;
    }
    
    getData();
  }, [router, status, session]);

  const handleProfileFormChange = (e)=>{
    setProfile({...profile, [e.target.name]: e.target.value})
    console.log(profile);
  }

  const handleSubmit = async (e)=>{
    const username = session?.user?.name;
    if (!username) return;

    let updatedProfile = await updateProfile(profile,session.user.name);
  
    await update({
      ...session,
      user: {
        ...session.user,
        name: updatedProfile.username,
      },
    });

    router.push(`/${updatedProfile.username}`);

    session.user.name = updatedProfile.username; //also change the session things
    alert("Profile updated!");
  }

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

  return (
    <div className="flex flex-col items-center justify-center my-10 dark">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-200 mb-4">Set your profile</h2>
        <form className="flex flex-col" onSubmit={handleSubmit} > {/* do not write onSubmit rather write action, bcz onSubmit would be an event listener */}
          <input name="username" placeholder="Username" onChange={handleProfileFormChange} value={profile.username} className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text" />

          <input name="email" placeholder="Email" onChange={handleProfileFormChange} value={profile.email} className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="email" />
 
          <input name="phonenumber" placeholder="Phone Number" onChange={handleProfileFormChange} value={profile.phonenumber} className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text" />
 
          <input name="x" placeholder="Paste your X link" onChange={handleProfileFormChange} value={profile.x} className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text" />

          <input name="instagram" placeholder="Paste your Instagram link" onChange={handleProfileFormChange} value={profile.instagram} className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text" />
 
          <input name="linkedin" placeholder="Paste your Linkedin link" onChange={handleProfileFormChange} value={profile.linkedin} className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text" />
 
          {/* <label htmlFor="profilepic" className='text-zinc-400 cursor-pointer'>Set your profile picture</label>
          <input name="profilepicture" placeholder="Set your profile picture" onChange={handleProfileFormChange} value={profile.profilepicture} id='profilepic' className="bg-gray-700 cursor-pointer text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="file" />
 
          <label htmlFor="profilebanner" className='text-zinc-400 cursor-pointer'>Set your profile banner</label>
          <input name="profilebanner" placeholder="Set your profile banner" onChange={handleProfileFormChange} value={profile.profilebanner} id='profilebanner' className="bg-gray-700 cursor-pointer text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="file" />
 
          <label htmlFor="document" className='text-zinc-400 cursor-pointer'>Attach a document</label>
          <input name="document" placeholder="Attach a document" onChange={handleProfileFormChange} value={profile.document} id='document' className="bg-gray-700 cursor-pointer text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="file" />
 */}
          <div className='flex flex-col border border-zinc-500 rounded-2xl p-2'>
            <label className="text-zinc-400 cursor-pointer">Payment Credentials</label>
            <input name="razorpayid" placeholder="Enter your Razorpay Id" onChange={handleProfileFormChange} value={profile.razorpayid} className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text" />
            <input name="razorpaysecret" placeholder="Enter your Razorpay Secret" onChange={handleProfileFormChange} value={profile.razorpaysecret} className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text" />
          </div>

          <button className="bg-gradient-to-r from-indigo-500 cursor-pointer to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150" type="submit">Update changes</button>
        </form>
      </div>
    </div>
  );
}

export default Page;
