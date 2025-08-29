import {inngest} from "@/inngest/client";

import axios from "axios";
import {NextResponse, NextRequest} from "next/server";
import getServerUser from "@/lib/auth-server";

export async function POST(req: NextRequest) {
    const {userInput, roadmapId} = await req.json()
    const user = await getServerUser()
    const resultIds = await inngest.send({
        name: 'AIRoadMapAgent',
        data: {
            userInput: userInput,
            roadmapId: roadmapId,
            userEmail: user?.email
        }
    })
    const runId = resultIds?.ids[0];
    console.log(runId)
    let runStatus
    while (true){
        runStatus = await getRuns(runId)
        if (runStatus?.data[0]?.status === 'Completed')
            break
        await new Promise(resolve =>  setTimeout(resolve, 500))
    }
    return NextResponse.json(runStatus.data?.[0].output)

}

export async function getRuns(runId: string) {
    const result = await axios.get( `${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`, {
        headers: {
            Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`
        }
    })
    return result.data
}

