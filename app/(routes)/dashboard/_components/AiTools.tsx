import React from 'react'
import AiToolCard from "@/app/(routes)/dashboard/_components/AiToolCard";
import {FaHatWizard, FaMagic, FaMapMarked, FaPaperclip} from "react-icons/fa";
export const aiToolsList = [
    {
        name: 'ИИ Карьерный чат-бот',
        desc: 'Пообщайтесь с карьерном ии ботом',
        icon: '/first-image-chat.png',
        button: 'Спросить',
        path: '/ai-tools/ai-chat',
        type: '/ai-tools/ai-chat'
    },
    {
        name: 'ИИ Оценщик резюме',
        desc: 'Дай нам возможность оценить твоё резюме за секунды',
        icon: '/third-image-agent.png',
        button: 'Оценить сейчас',
        path: '/ai-tools/ai-resume-analyzer',
        type: '/ai-tools/ai-resume-analyzer'
    },
    {
        name: 'ИИ Генератор плана',
        desc: 'Сгенерируй план для достижения цели',
        icon: '/second-image-analyzer.png',
        button: 'Сгенерировать',
        path: '/ai-tools/ai-roadmap-agent',
        type: '/ai-tools/ai-roadmap-agent'
    },
    {
        name: 'ИИ Генератор проводимого письма',
        desc: 'Сгенерируйте своё собственное письмо',
        icon: '/forth-image-letter.png',
        button: 'Использовать',
        path: '/ai-tools/ai-cover-letter',
        type: '/my-cover-letters'
    }

]

const AiTools = () => {



    return (
        <div className='mt-7 p-5 bg-white border rounded-xl'>
            <h2 className='font-semibold text-lg'>Ai Tools</h2>
            <p className='py-2'>Попробуйте наши ии инструменты абсолютно бесплатно</p>
            <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'}>
                {aiToolsList.map((tool:any, index) => (
                    <AiToolCard key={index} tool={tool}/>
                ))}
            </div>
        </div>
    )
}
export default AiTools
