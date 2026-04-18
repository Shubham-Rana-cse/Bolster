"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation";
import PaymentPage from '../Components/PaymentPage'

const page = () => {

    const params = useParams();
        
    const { data: session, status } = useSession();
    const router = useRouter();

    const username = params.username.replaceAll('%20',' ');

    return (
        <>
            <PaymentPage username={username} />
        </>
    )
}

export default page
