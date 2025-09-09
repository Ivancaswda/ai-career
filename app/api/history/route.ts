import {db} from '../../../configs/db'
import {HistoryTable} from "@/configs/schema";
import {NextResponse} from "next/server";
import {currentUser} from '@clerk/nextjs/server'
import {desc, eq} from "drizzle-orm";
import getServerUser from "@/lib/auth-server";

export async function POST(req:any) {
    const {content, recordId, aiAgentType} = await req.json()

    const user = await getServerUser()

    try {
        const result = await db.insert(HistoryTable).values({
            recordId:recordId,
            content: content,
            userEmail: user?.email,
            createdAt: (new Date()).toString(),
            aiAgentType: aiAgentType
        })

        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json(error)
    }
}

export async function PUT(req: any) {
    try {
        const { content, recordId } = await req.json();
        const user = await getServerUser();

        if (!recordId) {
            return NextResponse.json({ error: "recordId is required" }, { status: 400 });
        }

        const result = await db
            .update(HistoryTable)
            .set({
                content: content,
            })
            .where(eq(HistoryTable.recordId, recordId));

        return NextResponse.json({ success: true, updated: result });
    } catch (error) {
        console.error("PUT /api/history error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 }); //
    }
}

export async function GET(req:any) {
    const {searchParams} = new URL(req.url)
    const recordId = searchParams.get('recordId')
    const user = await getServerUser()
    try {



        if (recordId) {
            const result = await db.select()
                .from(HistoryTable)
                .where(eq(HistoryTable.recordId, recordId))
            return NextResponse.json(result[0])
        }else {
            const result = await db.select().from(HistoryTable).where(eq(HistoryTable.userEmail,
                    user?.email)

                ).orderBy(desc(HistoryTable.id))
            return NextResponse.json(result)
        }

        return NextResponse.json({})

    } catch (error) {

    }
}
















