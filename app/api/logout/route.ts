// app/api/logout/route.ts
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const body = await req.json()
        const { idReceipt } = body
        console.log("idReceipt :", idReceipt);

        const getMaxId = await prisma.checktime.aggregate({
            _max: {
                id: true,
            },
        })
        // chk id
        const id = idReceipt == null ? getMaxId._max.id : idReceipt

        const now = new Date(Date.now() + 7 * 60 * 60 * 1000)
        await prisma.checktime.update({
            where: {
                id: id
            },
            data: {
                chkOut: now
            }
        })

        const nextShift = await prisma.receipt.findMany({
            where: {
                checktimeID: id
            },
        })

        const chkTime = await prisma.checktime.findUnique({
            where: {
                id: id
            },
        })

        console.log(chkTime);

        const response = NextResponse.json(
            {
                message: "success",
                nextShift: nextShift,
                chkTime: chkTime
            }
        )

        //ล้าง cookie โดยตั้ง maxAge = 0
        if (idReceipt == null) {
            response.cookies.set("auth_session", "", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 0,
                path: "/",
            });
        }

        return response

    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' },
            { status: 500 }
        )
    }
}