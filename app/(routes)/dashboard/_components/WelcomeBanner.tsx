import React from 'react'
import {Button} from "@/components/ui/button";
import {ArrowBigDown} from "lucide-react";
import Image from "next/image";
const WelcomeBanner = () => {
    return (
       <div className='p-5 bg-gradient-r from-[#BE575F] via-[#A33BE3] to-[#AC7606] rounded-xl'>
           <Image src='/banner-ai-career.png' className='w-full h-[200px] rounded-xl object-cover' width={800} height={200} alt='banner'/>

           <Button variant={'outline'} className='mt-3'>Попробовать сейчас <ArrowBigDown/></Button>
       </div>
    )
}
export default WelcomeBanner
