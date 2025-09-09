import React, {useState} from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {FileIcon, Loader2Icon, Sparkles} from "lucide-react";
import {Button} from "@/components/ui/button";
import  {v4 as uuidv4} from 'uuid'
import axios from "axios";
import {FileUpload} from "@/components/ui/file-upload";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

const ResumeUploadDialog = ({openResumeDialog, setOpenResumeDialog}: any) => {
    const router = useRouter()
    const [file, setFile] = useState()
    const [loading, setLoading] = useState(false)


    const onFileChange = (event:any) => {
        const file = event.target.files?.[0]
        if (file) {
            console.log(file.name)
            setFile(file)
        }
    }

    const onUploadAndAnalyze = async () => {
      try {


        setLoading(true)
        const recordId = uuidv4()
        const formData = new FormData()
        formData.append('recordId', recordId)
        formData.append('resumeFile', file)
        formData.append('aiAgentType', '/ai-tools/ai-resume-analyzer')

        const result = await axios.post('/api/ai-resume-agent', formData)
        console.log(result.data)

          router.push(`/ai-tools/ai-resume-analyzer/${recordId}`)

      } catch (error) {
        toast.error('Не удалось анализировать резюме!')
          console.log(error)
      } finally {
          setOpenResumeDialog(false)
          setLoading(false)

      }
    }

    return (
        <Dialog open={openResumeDialog} onOpenChange={setOpenResumeDialog}>

            {loading ? <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Идет генерация ИИ оценки вашего резюме...
                    </DialogTitle>
                    <DialogDescription>
                        <div className='flex items-center justify-center w-full h-full'>
                            <Loader2Icon className='animate-spin size-14 text-purple-600'/>
                        </div></DialogDescription>
                </DialogHeader>


            </DialogContent> : <DialogContent>
                <DialogHeader>

                    <DialogTitle>Загрузите pdf файл вашего резюме</DialogTitle>
                    <DialogDescription>

                        <div className='flex flex-col items-center justify-center cursor-pointer p-7 border border-dashed rounded-xl hover:bg-slate-200'>

                            <FileUpload onChange={onFileChange} />
                            {file && <h2 className='text-blue-600 mt-3 text-center'>{file.name}</h2>
                            }

                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant='outline'>Отменить</Button>
                    <Button disabled={!file || loading} onClick={onUploadAndAnalyze}>{loading ? <Loader2Icon className='animate-spin'/> : <Sparkles/>} Загрузить и анализировать</Button>
                </DialogFooter>
            </DialogContent> }

        </Dialog>
    )
}
export default ResumeUploadDialog
