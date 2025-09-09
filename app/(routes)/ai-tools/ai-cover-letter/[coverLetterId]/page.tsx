'use client'
import {v4 as uuidv4} from 'uuid'
import React, {useEffect, useRef, useState} from 'react'
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {LoaderCircle, Send} from "lucide-react";
import axios from "axios";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import EmptyState from "@/app/(routes)/ai-tools/ai-cover-letter/_components/EmptyState";
import {useAuth} from "@/context/useAuth";
import {useRouter} from "next/navigation";
import {FaPaperclip} from "react-icons/fa";
import {toast} from "sonner";

type Message = {
    role: "user" | "assistant",
    content: string,
    ui?: string | null
}

type AiResponse = {
    question: string | null,
    ui: string | null,
    isFinal: boolean,
    data?: {
        fullName: string,
        position: string,
        skills: string[],
        companyName: string,
        achievements: string[],
        coverLetter: string
    }
}

const Page = () => {
    const [sentFinal, setSentFinal] = useState(false);
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [userInput, setUserInput] = useState("")
    const [isFinal, setIsFinal] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const {user} = useAuth()
    const [isFinalLoading, setIsFinalLoading] = useState<boolean>(false)


    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const onSend = async (input?: string) => {
       try {


        setLoading(true)
           const msg = input || userInput;
           if (!msg.trim()) return;
        const coverLetterId = uuidv4()
        setMessages(prev => [...prev, { role: "user", content: msg }]);
        setUserInput("");

        const res = await axios.post("/api/ai-cover-letter-chat-agent", {
            messages,
            userInput: msg,
            isFinal,
            coverLetterId
        });

        const ai = res.data;

        if (ai?.content?.data?.coverLetter) {

            setIsFinalLoading(false);
            setMessages(prev => [
                ...prev,
                { role: "assistant", content: ai.content.data.coverLetter, ui: ai?.content?.ui }
            ]);
            router.push(`/my-cover-letters/${ai.coverLetterId}`);
        } else if (ai?.ui === "final") {
            setMessages(prev => [...prev, { role: "assistant", content: ai.question, ui: ai.ui }]);
            setIsFinalLoading(true);
            setIsFinal(true);


        } else {
            // обычный вопрос
            setMessages(prev => [...prev, { role: "assistant", content: ai.question, ui: ai.ui }]);
        }
       } catch (error) {
           toast.error('Ошибка при генерации письма! ')
           console.log(error)
       } finally {
           setLoading(false)
       }


    };




    return (
        <div className="px-6 md:px-12 lg:px-24 xl:px-40 relative h-screen flex flex-col bg-gray-50 dark:bg-neutral-900">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white pt-4">ИИ Генератор  <span className='text-purple-600 font-semibold'>сопроводительных писем</span></h2>

            {messages.length === 0 && <EmptyState onInput={(v:string) => { setUserInput(v); onSend(v) }} />}

            <div className="flex-1 overflow-y-auto mb-28 p-4 space-y-4 bg-white dark:bg-neutral-800 rounded-xl shadow-inner">
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} gap-3`}>
                        {m.role === 'assistant' && (
                            <Avatar className='bg-purple-600'>
                                <AvatarFallback className='text-white bg-violet-700'>AI</AvatarFallback>
                            </Avatar>
                        )}
                        <div className={`
                            max-w-[65%] p-4 rounded-2xl shadow-md
                            ${m.role === "user"
                            ? " border border-gray-300 text-black rounded-br-none"
                            : "bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-bl-none"
                        }
                        `}>
                            {m.content}
                        </div>
                        {m.role === 'user' && (
                            user?.avatarUrl ?
                                <Avatar className='bg-violet-700'>
                                    <AvatarImage src={user?.avatarUrl} className='object-cover'/>
                                </Avatar> :
                            <Avatar className='bg-violet-700'>
                                <AvatarFallback className='text-white bg-violet-700'>{user?.userName?.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                ))}

                {loading && !isFinalLoading && (
                    <div className="flex items-center gap-2 text-gray-500">
                        <LoaderCircle className="animate-spin"/> Думаю...
                    </div>
                )}

                {loading && isFinalLoading && (
                    <div className='flex flex-col items-center justify-center mt-6 p-6 bg-white dark:bg-neutral-700 rounded-xl shadow-md'>
                        <FaPaperclip className='text-purple-600 text-4xl animate-bounce'/>
                        <h2 className='mt-3 text-lg font-semibold text-gray-800 dark:text-white'>
                            Планируем ваше письмо...
                        </h2>
                        <p className='text-gray-500 text-sm text-center my-1'>
                            Подождите пока ИИ завершит работу и наслаждайтесь результатом
                        </p>
                        <Button disabled className='mt-2 bg-purple-600 text-white hover:bg-purple-700 rounded-lg'>Посмотреть письмо</Button>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <div className="sticky w-full bottom-0 left-0  flex gap-4 bg-white dark:bg-neutral-900 rounded-md p-4 shadow-lg">
                <Input
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                    placeholder="Введите сообщение..."
                    className='flex-1 bg-gray-100 dark:bg-neutral-800 rounded-2xl px-4 py-2'
                    onKeyDown={e => e.key === 'Enter' && onSend()}
                />
                <Button onClick={() => onSend()} disabled={loading} className='bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3'>
                    <Send />
                </Button>
            </div>
        </div>
    )
}

export default Page
