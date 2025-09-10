import {Inngest} from "inngest";

export const inngest = new Inngest({
    id: "AiHelperAgent",
    eventKey: process.env.INNGEST_EVENT_KEY,
});
