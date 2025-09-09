'use client'
import React from 'react'
import {useAuth} from "@/context/useAuth"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Button} from "@/components/ui/button"
import {useRouter} from "next/navigation";
import Image from "next/image";
import {LogOut} from "lucide-react";
const ProfilePage = () => {
    const {user, logout} = useAuth()
    const router = useRouter()

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="text-gray-600">Пользователь не авторизован</p>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-md">

            <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20 bg-purple-600">
                    {user.avatarUrl
                        ?  <Image src={user.avatarUrl} className='rounded-full w-full h-full' width={60} height={60} alt="aagsgas"/>
                        : <AvatarFallback className='bg-purple-600 text-white text-4xl'>{user.userName?.charAt(0).toUpperCase()}</AvatarFallback>
                    }
                </Avatar>
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{user.userName}</h2>
                    <p className="text-gray-500 dark:text-gray-300">{user.email}</p>
                </div>
            </div>

            <div className="mt-6 space-y-4">
                <p><span className="font-semibold text-purple-600">Дата регистрации:</span> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Не указано'}</p>
                <p><span className="font-semibold text-purple-600">Роль:</span> {user.role || 'Пользователь'}</p>
                {/* Можно добавить любые другие данные профиля */}

            </div>


            <div className="mt-6">
                <Button variant="outline" onClick={() => {
                    logout()
                    router('/sign-up')
                }}>
                    <LogOut/>
                    Выйти </Button>
            </div>
        </div>
    )
}

export default ProfilePage