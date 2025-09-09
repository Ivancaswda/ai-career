'use client'
import React, {useEffect, useState} from 'react'
import {useParams} from "next/navigation";
import axios from "axios";
import Report from "@/app/(routes)/ai-tools/ai-resume-analyzer/_components/Report";
import {Loader2Icon} from "lucide-react";

const RecordIdPage = () => {
    const {recordId} = useParams()
    const [pdfUrl, setPdfUrl] = useState()
    const [aiReport, setAiReport] = useState()

    useEffect(() => {
        recordId && GetResumeAnalyzerRecord()
    }, [recordId])
    const GetResumeAnalyzerRecord = async () => {

        const result =await axios.get('/api/history?recordId=' + recordId)
        console.log(result?.data)
        setPdfUrl(result?.data.metadata)
        setAiReport(result?.data.content)
    }

    if (!aiReport) {
        return <div className='flex items-center justify-center w-full h-full'>
            <Loader2Icon className='animate-spin text-violet-700'/>
        </div>
    }

    console.log(aiReport)

    return (
        <div className='grid lg:grid-cols-5 grid-cols-1 bg-gray-50 shadow-xl'>
            <div className='col-span-2  p-8'>
                <Report data={aiReport}/>
            </div>
            <div className='col-span-3  p-8'>
                <h2 className='my-2 font-semibold text-2xl text-purple-600'>Ваше резюме</h2>
                <iframe src={pdfUrl + '#toolbar=0&navpanes=0&scrollbar=0'} height={1200} width={800} style={{
                    border: 'none'
                }}
                className='min-w-lg w-[100%]'
                />
            </div>
        </div>
    )
}
export default RecordIdPage
