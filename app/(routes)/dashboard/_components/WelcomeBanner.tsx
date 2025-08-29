import React from 'react'
import {Button} from "@/components/ui/button";
import {ArrowBigDown} from "lucide-react";

const WelcomeBanner = () => {
    return (
       <div className='p-5 bg-gradient-r from-[#BE575F] via-[#A33BE3] to-[#AC7606] rounded-xl'>
           <h2 className='font-semibold text-2xl'>ИИ карьерные инструменты</h2>
           <p className='text-white'>Ваша карьерная лестница успешных и правильный решений начнется здесь!</p>
           <Button variant={'outline'} className='mt-3'>Попробовать сейчас <ArrowBigDown/></Button>
       </div>
    )
}
export default WelcomeBanner
