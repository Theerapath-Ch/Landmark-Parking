// app/api/logout/route.ts
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST() {

    const getMaxId = await prisma.checktime.aggregate({
        _max: {
            id: true,
        },
    })

    const now = new Date(Date.now() + 7 * 60 * 60 * 1000)
    await prisma.checktime.update({
        where: {
            id: getMaxId._max.id!
        },
        data: {
            chkOut: now
        }
    })

    const nextShift = await prisma.receipt.findMany({
        where: {
            checktimeID: getMaxId._max.id
        },
    })

    const chkTime = await prisma.checktime.findUnique({
        where: {
            id: getMaxId._max.id!
        },
    })

    //console.log(chkTime);

    const response = NextResponse.json(
        {
            message: "success",
            nextShift: nextShift,
            chkTime: chkTime
        }
    )

    //ล้าง cookie โดยตั้ง maxAge = 0
    response.cookies.set("auth_session", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0,
        path: "/",
    })

    return response
}