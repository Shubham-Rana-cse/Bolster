"use client"

import React, {useEffect} from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"
import Link from 'next/link'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useParams } from "next/navigation";
import PaymentPage from '../Components/PaymentPage'

const page = () => {

    const params = useParams();
        
    const { data: session, status } = useSession();
    const router = useRouter();

    const username = params.username;

    return (
        <>
            <PaymentPage username={username} />
        </>
    )
}

export default page
