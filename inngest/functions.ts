import {createAgent} from "@inngest/agent-kit";
import {gemini} from "inngest";
import {inngest} from "@/inngest/client";
import ImageKit from "imagekit";
import {db} from "@/configs/db";
import {HistoryTable} from "@/configs/schema";


export const AiHelperChatAgent = createAgent({
    name: 'AiHelperAgent',
    description: 'Агент ИИ, который отвечает на вопросы о карьере, подготовке к интервью, улучшении резюме и развитии навыков',
    system: `Вы — профессиональный карьерный консультант на русском языке. 
Ваша задача — давать чёткие, полезные и мотивирующие советы по вопросам карьеры: поиск работы, подготовка к собеседованиям, улучшение резюме, развитие навыков, смена профессии и актуальные тренды на рынке. 
Если пользователь спрашивает о темах, не связанных с карьерой (например, здоровье, отношения, кодинг или общие факты), вежливо сообщите, что вы карьерный консультант, и предложите задать вопрос, связанный с карьерой.
Отвечайте строго только на вопросы пользователя, без приветствий и вводных фраз. 
Не начинайте ответ с "Здравствуйте", "Привет" или других приветственных формулировок.
`,
    model: gemini({
        model: 'gemini-2.5-flash',
        apiKey: process.env.GEMINI_API_KEY,
    })
})

export  const AiHelperAgent = inngest.createFunction(
    {id: 'AiHelperAgent'},
    {event: 'AiHelperAgent'},
    async ({event, step}) => {
        const {userInput} = await event?.data;
        const result = await AiHelperChatAgent.run(userInput)
        return result!
    }
)

let imagekit = new ImageKit({
    //@ts-ignore
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    //@ts-ignore
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    //@ts-ignore
    urlEndpoint: process.env.IMAGEKIT_ENDPOINT_URL,

})

export const AiResumeAnalyzerAgent = createAgent({
    name: 'AiResumeAnalyzerAgent',
    description: "Агент ИИ для анализа резюме. Возвращает структурированный JSON-отчет.",
    system: `
Вы — продвинутый агент ИИ для анализа резюме на русском языке.  
Ваша задача — оценить предоставленное резюме и вернуть детальный анализ в следующем JSON-формате.  
JSON должен содержать оценки и структурированные данные. Рассматривайте: общую оценку, оценку секций, краткий комментарий, рекомендации по улучшению, сильные и слабые стороны.
Не добавляйте комментарии, текст или символы вне JSON.  
Если предоставленный текст не является резюме, верните JSON с нулевыми оценками, но всё равно в указанной структуре.

Входные данные: текст резюме.

Выход: JSON с полями:
{
  "overall_score": 85,                  // Общая оценка 0–100
  "overall_feedback": "Отлично",        // Краткая оценка
  "summary_comment": "Ваше резюме сильное, но есть моменты для улучшения.", // 1–2 предложения
  "sections": {
    "contact_info": { "score": 95, "comment": "Все контакты указаны корректно." },
    "experience": { "score": 80, "comment": "Сильные пункты опыта, но можно добавить метрики." },
    "education": { "score": 75, "comment": "Рассмотрите добавление релевантных курсов." },
    "skills": { "score": 70, "comment": "Расширьте информацию о конкретных навыках." }
  },
  "tips_for_improvement": [
    "Добавьте больше метрик в раздел опыта.",
    "Выделите ключевые проекты.",
    "Начинайте пункты с сильных глаголов действия."
  ],
  "whats_good": [
    "Чёткое и профессиональное оформление",
    "Релевантный опыт работы",
    "Сбалансированный раздел навыков"
  ],
  "needs_improvement": [
    "Некоторые пункты опыта можно улучшить",
    "Отсутствует профессиональное резюме/цель"
  ],
  "title": "Короткое название резюме (например: 'Резюме – Иван Иванов')"
}
`,
    model: gemini({
        model: "gemini-2.5-flash",
        apiKey: process.env.GEMINI_API_KEY,
        output: "json"
    })
})

export const AiResumeAgent = inngest.createFunction(
    {id: 'AiResumeAgent'},
    {event: 'AiResumeAgent'},
    async ({event, step}) => {
        const {recordId, base64ResumeFile, pdfText, aiAgentType, userEmail} = await event.data;
        const uploadFileUrl = await step.run("uploadImage", async () => {
            const imageKitFile = await imagekit.upload({
                file: base64ResumeFile,
                fileName: `${Date.now()}.pdf`,
                isPublished: true
            })

            return imageKitFile.url
        })

        const AiResumeReport = await AiResumeAnalyzerAgent.run(pdfText)
        console.log('AI RESUME REPORT =====')
        console.log(AiResumeReport)
        let parsedJson;
        try {
            // Убираем ```json ... ``` и комментарии после JSON
            const cleaned = AiResumeReport.output[0]?.content
                .replace(/```json|```/g, "")      // удалить backticks
                .replace(/\/\/.*$/gm, "")          // удалить комментарии вида // ...
                .trim();

            parsedJson = JSON.parse(cleaned);
        } catch (e) {
            console.error("AI вернул не JSON:", AiResumeReport.output[0]?.content);
            // fallback: вернуть минимальный валидный JSON
            parsedJson = {
                overall_score: 0,
                overall_feedback: "AI не смог распарсить резюме",
                summary_comment: "",
                sections: {},
                tips_for_improvement: [],
                whats_good: [],
                needs_improvement: [],
                title: ''
            };
        }

        await step.run('SaveToDb', async () => {
            const result = await db.insert(HistoryTable).values({
                recordId: recordId,
                content: parsedJson,
                aiAgentType: aiAgentType,
                createdAt: (new Date()).toString(),
                userEmail: userEmail,
                metadata: uploadFileUrl
            })
            console.log(result)

        })
        return parsedJson
    }
)
export const AIRoadmapGeneratorAgent = createAgent({
    name: 'AIRoadmapGeneratorAgent',
    description: 'Generator details tree like flow roadmap for any specialization',
    system: `
Сгенерируй React Flow дерево-структурированную обучающую дорожную карту для пользователя на основе введённой позиции, специализации или навыков. Агент должен поддерживать любые профессии, не только программистов.

Правила генерации:
• Структура должна быть похожа на layout с roadmap.sh
• Шаги должны быть упорядочены от базовых к продвинутым
• Включи ветвления для разных специализаций или направлений, если применимо
• Каждый узел должен содержать title, короткое описание и ссылку на обучающий ресурс
• Используй уникальные ID для всех узлов и связей
• Сделай позиции узлов более просторными (чтобы было читаемо)
• Ответ верни строго в JSON формате, без лишнего текста

Формат JSON:

{
  roadmapTitle: "Название дорожной карты",
  description: "<3-5 строк описания, что покрывает карта>",
  duration: "Ориентировочная продолжительность",
  initialNodes: [
    {
      id: "1",
      type: "turbo",
      position: { x: 0, y: 0 },
      data: {
        title: "Название шага",
        description: "Короткое описание (1-2 строки), объясняющее что охватывает шаг.",
        link: "Полезная ссылка для изучения шага"
      }
    },
    ...
  ],
  initialEdges: [
    {
      id: "e1-2",
      source: "1",
      target: "2"
    },
    ...
  ]
}
`
    ,
    model: gemini({
        model: 'gemini-2.5-flash',
        apiKey: process.env.GEMINI_API_KEY
    })
})

export const AIRoadmapAgent = inngest.createFunction(
    {id: 'AIRoadMapAgent'},
    {event: 'AIRoadMapAgent'},
    async ({event, step}) => {
        const {roadmapId, userInput, userEmail} = await event.data;
        const roadmapResult = await AIRoadmapGeneratorAgent.run('UserInput' + userInput)

        console.log('ROADMAPRESULT ===')
        console.log(roadmapResult)
        let parsedJson
        try {
            // убрать лишние обёртки
            const cleaned = roadmapResult.output[0]?.content.replace(/```json|```/g, "").trim()
            parsedJson = JSON.parse(cleaned)
            console.log(parsedJson)

        } catch (e) {
            console.error("AI вернул не JSON:", roadmapResult)
            throw new Error("AI did not return valid JSON")
        }

        await step.run('SaveToDb', async () => {
            const result = await db.insert(HistoryTable).values({
                recordId: roadmapId,
                content: parsedJson,
                aiAgentType: '/ai-tools/ai-roadmap-agent',
                createdAt: (new Date()).toString(),
                userEmail: userEmail,
                metadata: userInput
            })
            console.log(result)
        })
        return parsedJson

    }
)

const AICoverLetterQuestionAgent = createAgent({
    name: "AICoverLetterQuestionAgent",
    description: "AI для пошагового опроса пользователя перед генерацией письма",
    system: `
Ты — точный AI-помощник для генерации сопроводительных писем. Задавай **один вопрос за раз** и жди ответа пользователя перед следующим вопросом.

Задавай вопросы строго в таком порядке:

1. Ваше полное имя — принимай любую непустую строку.
2. На какую позицию вы хотите претендовать — принимай любую непустую строку.
3. Ваши ключевые навыки — массив строк, например: ["JavaScript", "React", "Node.js"].
4. Название компании, куда хотите подать заявку — любая непустая строка.
5. Ваши главные достижения — массив строк, например: ["Разработал CRM-систему", "Увеличил продажи на 30%"].

**ТРЕБУЕТСЯ СТРОГО JSON-ОТВЕТ:**
Верни ровно один JSON-объект:

{
  "resp": "Твой ответ пользователю на русском",
  "ui": "fullName" | "position" | "skills" | "companyName" | "achievements" | "final"
}

**Важные правила:**
- Задавай только один вопрос за раз.
- Если ответ на текущий вопрос уже есть в истории сообщений — переходи к следующему.
- Не переспроси уже заполненные поля.
- Если все ответы собраны — возвращай ui: "final".
- Не добавляй лишний текст или markdown.
- Пользователь может отвечать на любом языке. 
- Но ты ВСЕГДА возвращаешь строго один JSON-объект.
`,
    model: gemini({
        model: 'gemini-2.5-flash',
        apiKey: process.env.GEMINI_API_KEY

    })
});

const AICoverLetterFinalAgent = createAgent({
    name: "AICoverLetterFinalAgent",
    description: "AI для генерации финального сопроводительного письма",
    system: `
Используя предоставленную информацию о пользователе (fullName, position, skills, companyName, achievements), сгенерируй финальное сопроводительное письмо.

Верни строго один JSON-объект:

{
  "question": null,
  "options": null,
  "isFinal": true,
  "data": {
    "fullName": "string",
    "position": "string",
    "skills": ["string"],
    "companyName": "string",
    "achievements": ["string"],
    "coverLetter": "string"
  }
}

**Важно:**
- Письмо должно быть на русском языке.
- Используй ровно предоставленные ответы из истории сообщений.
- Не добавляй никаких полей кроме указанных.
- Ответ строго в JSON, без markdown и пояснений.
`,
    model: gemini({
        model: 'gemini-2.5-flash',
        apiKey: process.env.GEMINI_API_KEY

    })
});

export const AICoverLetterAgent = inngest.createFunction(
    { id: "AICoverLetterAgent" },
    { event: "AICoverLetterAgent" },
    async ({ event, step }) => {
        const { messages, userInput, isFinal, userEmail, coverLetterId } = event.data;


        if (!userEmail) {
            throw new Error('Unauthrorized')
        }

        // Обновляем историю сообщений
        if (userInput) {
            messages.push({ role: "user", content: userInput });
        }

        let aiResult;
        if (isFinal) {
            aiResult = await AICoverLetterFinalAgent.run(JSON.stringify({ messages }));
        } else {
            aiResult = await AICoverLetterQuestionAgent.run(JSON.stringify({ messages }));
        }

        const cleaned = aiResult.output[0]?.content.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(cleaned);
        console.log(userInput)
        if (isFinal && parsed?.data?.coverLetter) {
            await step.run('SaveToDb', async () => {
                const result = await db.insert(HistoryTable).values({
                    recordId: coverLetterId,
                    content: parsed,
                    aiAgentType: '/my-cover-letters',
                    createdAt: (new Date()).toString(),
                    userEmail: userEmail,
                    metadata: userInput
                })
                console.log(result)
            })
        }




        return { coverLetterId, content: parsed }

    }
);