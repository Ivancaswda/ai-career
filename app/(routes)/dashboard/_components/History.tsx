'use client'
import React, {useEffect, useState} from 'react'
import Image from "next/image";
import axios from "axios";
import {aiToolsList} from "@/app/(routes)/dashboard/_components/AiTools";
import Link from "next/link";
import {format} from "date-fns";
import {ru} from "date-fns/locale";
import {Skeleton} from "@/components/ui/skeleton";
import {XOctagonIcon} from "lucide-react";
import {FaMagic} from "react-icons/fa";

const History = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [userHistory, setUserHistory] = useState([])

    useEffect(() => {
       userHistory && getHistory()
    }, [])

    const getHistory = async () => {
        setLoading(true)
        const result = await axios.get('/api/history')
        setUserHistory(result.data)
        setLoading(false)
    }

    const getAgentName = (path: string) => {
        const agent = aiToolsList.find((item) => item.path === path)
        return agent!
    }
    const getAgentIcon = (type: string) => {
        const agent = aiToolsList.find(a => a.path.includes(type));
        return agent?.icon || <FaMagic />;
    };
    console.log(userHistory)
    return (
        <div className='mt-5 p-5 rounded-xl'>
            <h2 className='font-semibold text-lg'>
                Ваша история запросов
            </h2>


            {userHistory.length === 0 ? (
                <div className='flex flex-col items-center justify-center'>
                    <XOctagonIcon className='text-purple-600'  width={50} height={50}/>
                    <h2 className='text-2xl text-purple-800 font-semibold mb-2'>У вас нету истории запросов</h2>
                    <p className='text-center text-sm text-gray-500'>Возьмите и воспользуйте функцией нашей платформы прямо сейчас и абсолютно бесплатно</p>
                </div>
            ) : (
                <div className='flex flex-col space-y-6 border p-3 rounded-lg my-3'>

                    {loading && (
                        <div>
                            {[1,2,3,4,5].map((item, index) => (
                                <Skeleton key={index} className='h-[50px] mt-4 w-full rounded-md'/>
                            ))}
                        </div>
                    )}
                    {userHistory.map((history) => {
                        const agent = getAgentName(history.aiAgentType);
                        console.log(agent)
                        let metaContent;
                        if (history.aiAgentType === '/ai-tools/ai-resume-analyzer') {
                            // для резюме показываем кнопку/ссылку "Посмотреть файл"
                            metaContent = (
                                <div className='flex items-center  gap-4'>
                                    {history?.content?.title}

                                </div>

                            );
                        } else if (history.aiAgentType === '/ai-tools/ai-chat') {
                            // находим первое сообщение пользователя
                            const firstUserMessage = history.content?.find((msg: any) => msg.role === 'user');
                            console.log(history.content)
                            console.log(firstUserMessage)
                            metaContent = <div className='truncate'>{firstUserMessage?.content}</div>;
                        } else if (history.aiAgentType === '/my-cover-letters') {
                            // находим первое сообщение пользователя
                          metaContent = <h2>{history.content.data.position} - Проводительно письмо - {history.recordId.slice(0, 10)}...</h2>
                        } else {
                            metaContent = <h2>
                                План для - {history.metadata} - {history.recordId.slice(0, 10)}...</h2>;
                        }
                        console.log(history)
                        return (
                            <Link key={history.recordId} href={history.aiAgentType + '/' + history.recordId} className='flex justify-between items-center gap-5'>
                                <div className='flex gap-5 items-center hover:bg-gray-50 transition'>
                                    <Image src={agent?.icon} width={70} className='rounded-xl' height={70} alt='agent-icon' />
                                    <h2>{metaContent}</h2>
                                </div>
                                <h2 className='text-gray-500 font-semibold text-sm'>{format(new Date(history.createdAt), 'dd.MM.yyyy', {locale: ru})}</h2>
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
export default History
