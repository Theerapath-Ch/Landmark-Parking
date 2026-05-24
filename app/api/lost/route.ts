import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



export async function PUT(req: NextRequest) {
    try {

        const body = await req.json()
        const { idParking, fine } = body
        //console.log(idParking);


        const now = new Date(Date.now() + 7 * 60 * 60 * 1000)
        //console.log("time : ", now);

        const updatedTimeOut = await prisma.parking.update({
            where: {
                id: idParking
            },
            data: {
                out_at: now
            }
        })

        if (updatedTimeOut) {
            const getMaxId = await prisma.checktime.aggregate({
                _max: {
                    id: true,
                },
            })
            await prisma.receipt.update({
                where: {
                    parkingId: idParking
                },
                data: {
                    status: true,
                    price: fine,
                    remark: "lost",
                    discount: "No-Discount",
                    checktimeID:getMaxId._max.id
                }
            })
        }


        //console.log(updatedTimeOut);


        return NextResponse.json(
            {
                success: true,
                status: 200
            }
        )

    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { success: false, message: error },
            { status: 500 }
        )
    }
}