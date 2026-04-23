"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation";
import Dashboard from '../Components/Dashboard'

const page = () => {

    const params = useParams();
        
    const { data: session, status } = useSession();
    const router = useRouter();

    const username = params.username.replaceAll('%20',' ');

    return (
        <>
            <Dashboard username={username} />
        </>
    )
}

export default page
