'use client'
import React, {useEffect, useRef, useState} from 'react'
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {LoaderCircle, Send, AlertCircle} from "lucide-react";
import ReactMarkdown from 'react-markdown'
import EmptyState from "@/app/(routes)/ai-tools/ai-chat/_components/EmptyState";
import axios from "axios";
import {v4 as uuidv4} from 'uuid'
import {useParams, useRouter} from "next/navigation";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useAuth} from "@/context/useAuth";

type messages = {
    content: string,
    role: 'user' | 'assistant' | 'error',
    type: string
}

const Page = () => {
    const router = useRouter()
    const {chatid}: any = useParams()
    const scrollRef = useRef<HTMLDivElement>(null)
    const {user, loading: userLoading} = useAuth()
    const [userInput, setUserInput] = useState<string>()
    const [loading, setLoading] = useState(false)
    const [messageList, setMessageList] = useState<messages[]>([])

    useEffect(() => {
        chatid && GetMessageList()
    }, [])
    useEffect(() => {
        if (chatid && messageList.length > 0) {
            updateMessageList()
        }
    }, [messageList])
    useEffect(() => {
        // прокрутка вниз при новых сообщениях
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
        // сохраняем сообщения в БД

    }, [messageList])

    const GetMessageList = async () => {
        try {
            const result = await axios.get('/api/history?recordId=' + chatid)
            setMessageList(result?.data?.content || [])
        } catch (err) {
            console.error("Ошибка загрузки истории чата:", err)
        }
    }

    const updateMessageList = async () => {
        try {
            await axios.put('/api/history', {
                content: messageList,
                recordId: chatid
            })
        } catch (err) {
            console.error("Ошибка при обновлении истории:", err)
        }
    }

    const onSend = async () => {
        if (!userInput?.trim()) return;

        setLoading(true)
        const inputText = userInput
        setMessageList(prev => [
            ...(prev || []),
            { content: inputText!, role: 'user', type: 'text' }
        ])
        setUserInput('')

        try {
            const result = await axios.post('/api/ai-helper-chat-agent', { userInput: inputText })
            setMessageList(prev => [...prev, result.data])
            await updateMessageList()
        } catch (err: any) {
            console.error("Ошибка при отправке сообщения:", err)
            setMessageList(prev => [
                ...prev,
                {
                    content: "Произошла ошибка при работе ИИ. Попробуйте еще раз.",
                    role: 'error',
                    type: 'text'
                }
            ])
        }

        setLoading(false)
    }

    const onNewChat = async () => {
        const id = uuidv4()
        try {
            await axios.post('/api/history', { recordId: id, content: [] })
            router.replace('/ai-tools/ai-chat/' + id)
        } catch (err) {
            console.error("Ошибка при создании нового чата:", err)
            setMessageList(prev => [
                ...prev,
                {
                    content: "Не удалось создать новый чат. Попробуйте позже.",
                    role: 'error',
                    type: 'text'
                }
            ])
        }
    }
    if (userLoading && !user) {
        return  <div className='flex items-center justify-center w-full h-full'>
            <LoaderCircle className='animate-spin text-purple-600'/>
        </div>
    }
    console.log(messageList)
    return (
        <div className='px-6 md:px-12 lg:px-24 h-screen flex flex-col bg-gray-50 dark:bg-neutral-900'>
            <div className='flex flex-col items-center justify-center gap-3 py-6'>
                <h2 className='text-3xl font-bold text-gray-800 dark:text-white'>ИИ Карьерный чат</h2>
                <p className='text-gray-600 dark:text-gray-300 text-center max-w-lg'>
                    Спросите любой вопрос на тему вашей карьеры и получите идеальный ответ!
                </p>
                <Button variant="outline" onClick={onNewChat} className='mt-2'>+ Новый чат</Button>
            </div>

            <div  className='flex-1 h-[80vh] overflow-y-auto p-4 space-y-4 bg-white dark:bg-neutral-800 rounded-xl shadow-inner mb-12'>
                {messageList?.length <= 0 && <EmptyState onSelectOption={(v:string) => {
                    setUserInput(v)
                    onSend()
                }} />}

                {messageList?.map((message, index) => (
                    <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
                        {message.role === 'assistant' &&
                            <Avatar className='bg-purple-600 text-white'>
                                <AvatarFallback className='bg-purple-600'>AI</AvatarFallback>
                            </Avatar>
                        }
                        {message.role === 'error' &&
                            <Avatar className='bg-red-600 text-white'>
                                <AlertCircle />
                            </Avatar>
                        }
                        <div className={`
                            max-w-[70%] p-4 rounded-2xl
                            ${message.role === 'user'
                            ? 'bg-purple-200 text-black rounded-br-none'
                            : message.role === 'assistant'
                                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-bl-none'
                                : 'bg-red-200 text-red-800 rounded-bl-none'}
                        `}>
                            <ReactMarkdown >{message.content}</ReactMarkdown>
                        </div>
                        {message.role === 'user' &&
                            <Avatar className='bg-purple-600 text-white'>
                                <AvatarImage src={user?.avatarUrl}/>
                                <AvatarFallback className='bg-purple-600 text-white'>{user.userName.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        }
                    </div>
                ))}
                <div ref={scrollRef}/>

                {loading &&
                    <div className='flex items-center gap-3'>
                        <Avatar className='bg-purple-600 text-white'>
                            <AvatarFallback className='bg-purple-600'>AI</AvatarFallback>
                        </Avatar>
                        <LoaderCircle className='animate-spin' />
                        <span>Думаем...</span>
                    </div>
                }
            </div>

            <div  className='sticky w-full bottom-0 left-0  flex gap-4 bg-white dark:bg-neutral-900 rounded-md p-4 shadow-lg'>
                <Input
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder='Введите сообщение...'
                    className='flex-1 bg-gray-100 dark:bg-neutral-800 rounded-2xl px-4 py-2'
                    onKeyDown={(e) => e.key === 'Enter' && onSend()}
                />
                <Button
                    disabled={loading}
                    onClick={onSend}
                    className='bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3'
                >
                    <Send />
                </Button>
            </div>
        </div>
    )
}

export default Page