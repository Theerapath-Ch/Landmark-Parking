import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



export async function PUT(req: NextRequest) {
    try {
    
        const body = await req.json()
        const { idParking } = body
        console.log(idParking);
        
    
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
            await prisma.receipt.update({
                where: {
                    parkingId: idParking
                },
                data: {
                    status: true,
                    price: 1000,
                    remark: "lost",
                    discount: "No-Discount"
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