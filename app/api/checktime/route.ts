import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const body = await req.json()
        //console.log(body)
        const { username, shift } = body

         const now = new Date(Date.now() + 7 * 60 * 60 * 1000)

        await prisma.checktime.create({
            data: {
                username: username,
                shift: shift,
                chkIn: now
            }
        })
        //console.log(user);


        const response = NextResponse.json({
            message: "success",
        })

        return response

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: error },
            { status: 500 }
        )
    }
}
