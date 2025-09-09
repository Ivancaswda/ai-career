import {Inngest} from "inngest";

export const inngest = new Inngest({
    id: "AiHelperAgent", // 🔹 любое имя приложения
    eventKey: process.env.INNGEST_SIGNING_KEY, // ✅ нужен для отправки событий
})

