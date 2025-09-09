'use client'
import React, {useEffect, useState} from 'react'
import {useParams} from "next/navigation";
import axios from "axios";
import {Button} from "@/components/ui/button";
import RoadMapCanvas from "@/app/(routes)/ai-tools/ai-roadmap-agent/_components/RoadMapCanvas";
import {Loader2Icon} from "lucide-react";
import RoadmapGeneratorDialog from "@/app/(routes)/dashboard/_components/RoadmapGeneratorDialog";

const RoadmapGeneratorAgent = () => {
    const {roadmapId} = useParams()
    const [roadMapDetail, setRoadMapDetail] = useState()
    const [openRoadmapDialog, setOpenRoadmapDialog] = useState(false)

    useEffect(() => {
        roadmapId && getRoadmapDetails()
    },[roadmapId])
    const getRoadmapDetails = async () => {
        const result = await axios.get('/api/history?recordId=' + roadmapId)
        console.log(result.data)
        setRoadMapDetail(result.data.content)
    }

    if (!roadMapDetail) {
        return  <div className='flex items-center justify-center w-full h-full'>
            <Loader2Icon className='animate-spin text-violet-700'/>
        </div>
    }


    return (
        <div className='grid grid-cols-1  lg:grid-cols-3 gap-5 '>
            <div>
                <h2 className='text-2xl font-semibold'>{roadMapDetail?.roadmapTitle}
                </h2>
                <p className='text-gray-500 mt-3'>
                    <span className='font-semibold'>Описание: </span>
                    <br/>
                    {roadMapDetail?.description}
                </p>
                <h2 className='mt-5 font-medium '>
                  <span className='text-blue-600 font-semibold'>Длительность: </span>
                    {roadMapDetail?.duration}
                </h2>
                <Button onClick={() => setOpenRoadmapDialog(true)} className='mt-5 w-full bg-violet-700'>+ Создать другой роадмэп</Button>
            </div>
            <div className='lg:col-span-2 w-full h-[80vh]'>
                <RoadMapCanvas initialNodes={roadMapDetail?.initialNodes} initialEdges={roadMapDetail?.initialEdges}/>
            </div>
            <RoadmapGeneratorDialog openRoadmapDialog={openRoadmapDialog}
                                    setOpenRoadmapDialog={setOpenRoadmapDialog}/>
        </div>
    )
}
export default RoadmapGeneratorAgent
