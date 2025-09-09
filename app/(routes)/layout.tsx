'use client'
import React, { useEffect } from 'react'
import DashboardProvider from './provider'
import { useAuth } from '@/context/useAuth'
import { useRouter } from 'next/navigation'
import {Loader2Icon} from "lucide-react";

function DashboardLayout({
                             children,
                         }: Readonly<{
    children: React.ReactNode
}>) {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/sign-up')
        }
    }, [user, loading, router])

    // Пока грузится auth — не рендерим layout
    if (loading) {
        return <div className="flex items-center font-semibold text-purple-600 text-sm flex-col gap-2 justify-center h-screen">
            <Loader2Icon className='animate-spin text-purple-600'/>
            Загрузка...
        </div>
    }

    // Если юзера нет — layout не рендерим, сразу редирект
    if (!user) return null

    return (
        <DashboardProvider>
            {children}
        </DashboardProvider>
    )
}

export default DashboardLayout
