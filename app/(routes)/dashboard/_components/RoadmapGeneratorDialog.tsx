'use client'
import React, {useState} from 'react'
import axios from 'axios'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
    DialogTitle,
    DialogDescription, DialogFooter
} from "@/components/ui/dialog";
import {v4 as uuidv4} from 'uuid'
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Loader2Icon, SparklesIcon} from "lucide-react";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

const RoadmapGeneratorDialog = ({openRoadmapDialog, setOpenRoadmapDialog}) => {
    const [userInput, setUserInput] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const generateRoadmap = async () => {
        const roadmapId = uuidv4()
        setLoading(true)
        try {
            const result = await axios.post('/api/ai-roadmap-agent', {
                roadmapId,
                userInput
            })

            router.push(`/ai-tools/ai-roadmap-agent/${roadmapId}`)

            console.log(result)
        } catch (error) {
            toast.error('Не удалось сгенерировать дорожную карту!')
        }
        setLoading(false)
    }

    return (
        <Dialog open={openRoadmapDialog} onOpenChange={setOpenRoadmapDialog}>
            {loading ?
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Идет генерация ИИ вашего плана ...
                        </DialogTitle>
                        <DialogDescription>
                            <div className='flex items-center flex-col justify-center w-full h-full'>
                                <Loader2Icon className='animate-spin size-14 text-purple-600'/>
                                <p className='font-semibold text-purple-500 mt-3'>Это может занять 1-2 минуты</p>
                            </div></DialogDescription>
                    </DialogHeader>


                </DialogContent> :      <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Введите вашу специальность чтобы сгенерировать план</DialogTitle>
                        <DialogDescription>
                            <div className='mt-2'>
                                <Input value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder='Например: Сантехник'/>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant='outline' >Отменить</Button>
                        <Button onClick={generateRoadmap} disabled={loading || !userInput} >
                            {loading ? <Loader2Icon className='animate-spin text-purple-600'/> : <SparklesIcon/>}
                            Сгенерировать</Button>
                    </DialogFooter>
                </DialogContent>}

        </Dialog>
    )
}
export default RoadmapGeneratorDialog
