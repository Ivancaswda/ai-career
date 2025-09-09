import React from 'react'
import Link from "next/link";
import {Handle, Position} from "@xyflow/react";

const TurboNode = ({data}: any) => {
    return (
        <div className='rounded-lg p-5 border border-gray-300 bg-violet-100 shadow-md w-64   '>
            <div className='font-bold text-lg text-gray-800'>
                {data.title}
            </div>
            <p className='line-clamp-2 mt-1 text-gray-600'>{data.description}</p>
            <Link href={data.link} className='text-violet-600 underline text-sm mt-2 inline-block' target='_blank' >
                 Узнать подробнее
            </Link>
            <Handle type='target' position={Position.Top}/>
            <Handle type='source' position={Position.Bottom}/>
        </div>
    )
}
export default TurboNode
