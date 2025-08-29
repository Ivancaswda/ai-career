import {serve} from "inngest/next";
import {inngest} from "@/inngest/client";
import {AICoverLetterAgent, AiHelperAgent, AiResumeAgent, AIRoadmapAgent} from "@/inngest/functions";

export const {GET, POST, PUT} = serve({
    client: inngest,
    functions: [
        AiHelperAgent,
        AiResumeAgent,
        AIRoadmapAgent,
        AICoverLetterAgent
    ]
})
