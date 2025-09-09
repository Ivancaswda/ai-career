import {inngest} from "@/inngest/client";
import {v4 as uuidv4} from 'uuid'
import axios from "axios";
import {NextRequest, NextResponse} from "next/server";
import getServerUser from "@/lib/auth-server";

export async function getRuns(runId: string) {
    const result = await axios.get(`${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`, {
        headers: { Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}` }
    });
    return result.data;
}

export async function POST(req: NextRequest) {
    const { messages, userInput, isFinal, coverLetterId  } = await req.json();
    const user = await getServerUser();



    const resultIds = await inngest.send({
        name: 'AICoverLetterAgent',
        data: { messages, userInput,  isFinal, userEmail: user?.email, coverLetterId}
    });

    const runId = resultIds?.ids[0];
    let runStatus;


    while (true) {
        runStatus = await getRuns(runId);
        if (runStatus?.data[0]?.status === 'Completed') break;
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    const aiOutput = runStatus?.data[0]?.output;


    if (isFinal  && aiOutput.content.data?.coverLetter) {
        return NextResponse.json(aiOutput);
    }


    return NextResponse.json({
        question: aiOutput?.content.resp ?? "Продолжайте ввод...",
        ui: aiOutput?.content.ui ?? null,
        isFinal: false
    });
}