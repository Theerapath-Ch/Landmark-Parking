// app/api/logout/route.ts
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST() {

    // const chkCarOut = await prisma.parking.findFirst({
    //     where: {
    //         out_at: null
    //     }
    // })
    // // console.log(!chkCarOut);
    // if (chkCarOut) {
    //     return NextResponse.json({
    //         message: "false"
    //     })
    // }

    const getMaxId = await prisma.checktime.aggregate({
        _max: {
            id: true,
        },
    })

    // const now = new Date(Date.now() + 7 * 60 * 60 * 1000)
    // await prisma.checktime.update({
    //     where: {
    //         id: getMaxId._max.id!
    //     },
    //     data: {
    //         chkOut: now
    //     }
    // })
    

    const nextShift = await prisma.receipt.findMany({
        where: {
            checktimeID: getMaxId._max.id
        },
        include: {
            checktime:{
                select:{
                    chkIn:true,
                    chkOut:true,
                    shift:true
                }
            }
        }
    })

    console.log(nextShift);
    
    const response = NextResponse.json({ message: "success" , nextShift : nextShift })

    // ล้าง cookie โดยตั้ง maxAge = 0
    // response.cookies.set("auth_session", "", {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     sameSite: "lax",
    //     maxAge: 0,
    //     path: "/",
    // })

    return response
}