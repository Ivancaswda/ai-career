'use client'
import React, {useState} from 'react'
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {v4 as uuidv4} from 'uuid'
import Link from "next/link";

import {useRouter} from "next/navigation";
import axios from "axios";
import ResumeUploadDialog from "@/app/(routes)/dashboard/_components/ResumeUploadDialog";
import {useAuth} from "@/context/useAuth";
import RoadmapGeneratorDialog from "@/app/(routes)/dashboard/_components/RoadmapGeneratorDialog";

interface Tool {
    name: string,
    desc: string,
    icon: string,
    button:string,
    path: string,
    type: string
}

type AIToolProps={
    tool: Tool
}

 const AiToolCard = ({tool}: AIToolProps) => {
     const id = uuidv4()
     const {user} = useAuth()
     const router = useRouter()
     const [openResumeDialog, setOpenResumeDialog] = useState(false)
     const [openRoadmapDialog, setOpenRoadmapDialog] = useState(false)

     const onClickButton = async () => {
         console.log(tool.name)
         if (tool.name === 'ИИ Оценщик резюме') {
             setOpenResumeDialog(true)
             return;
         }
         if (tool.name === 'ИИ Генератор плана') {
             setOpenRoadmapDialog(true)
             return
         }



        if (tool.name !== 'ИИ Генератор проводимого письма') {
             await axios.post('/api/history', {
                recordId: id,
                content: [],
                aiAgentType: tool.type
            })
        }



        router.push(tool.path + '/' + id)
     }

    return (
        <div className='p-3 border rounded-2xl
        '>

            <Image src={tool.icon} alt={tool.name}
                   className='w-full rounded-xl object-cover h-[200px]'
                   width={60} height={60}/>
            <h2 className='font-semibold'>{tool.name}</h2>
            <p className='text-gray-400'>{tool.desc}</p>

            <Link href={tool.path + "/" + id}>  </Link>
                <Button onClick={onClickButton}>{tool.button}</Button>
            <ResumeUploadDialog openResumeDialog={openResumeDialog} setOpenResumeDialog={setOpenResumeDialog}/>
            <RoadmapGeneratorDialog openRoadmapDialog={openRoadmapDialog}
                                    setOpenRoadmapDialog={setOpenRoadmapDialog}/>
        </div>
    )
}
export default  AiToolCard