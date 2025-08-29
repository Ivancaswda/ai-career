'use client'
import React, {useEffect} from 'react'
import WelcomeBanner from "@/app/(routes)/dashboard/_components/WelcomeBanner";
import AiTools from "@/app/(routes)/dashboard/_components/AiTools";
import History from "@/app/(routes)/dashboard/_components/History";

import {useAuth} from "@/context/useAuth";
import {useRouter} from "next/navigation";


function Dashboard() {
    const {user, loading} = useAuth()
    const router  =useRouter()
    useEffect(() => {
        if (!user && !loading) {
            router.push('/sign-in')
        }
    }, [user, loading])

    return (
        <>
            <WelcomeBanner/>
            <AiTools/>
            <History/>

        </>
    )
}

export default Dashboard