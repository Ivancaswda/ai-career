import React from 'react'

import "@xyflow/react/dist/style.css"
import {Background, Controls, MiniMap, ReactFlow} from "@xyflow/react";
import TurboNode from "@/app/(routes)/ai-tools/ai-roadmap-agent/_components/TurboNode";
const RoadMapCanvas = ({initialNodes, initialEdges}: any) => {



    const nodeTypes = {
        turbo: TurboNode
    }

    return (
        <div  style={{width: '100%', height: '100%'}}>
            <ReactFlow nodes={initialNodes} edges={initialEdges} nodeTypes={nodeTypes}>

                <Controls className='mt-4'/>

                <Background variant='dots' gap={12} size={1}/>
            </ReactFlow>
        </div>
    )
}
export default RoadMapCanvas
