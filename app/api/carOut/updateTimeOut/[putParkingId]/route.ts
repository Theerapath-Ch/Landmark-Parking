import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculatePrice } from "@/utils/calculatePrice";


export async function PUT(req: NextRequest,
    { params }: { params: Promise<{ putParkingId: string }> }) {
    try {
        const { putParkingId } = await params
        //console.log(putParkingId);
        const body = await req.json()
        const { discount } = body
        // console.log(discount);

        const now = new Date(Date.now() + 7 * 60 * 60 * 1000)
        //console.log("time : ", now);

        const updatedTimeOut = await prisma.parking.update({
            where: {
                id: putParkingId
            },
            data: {
                out_at: now
            }
        })



        let price: number = 0

        if (updatedTimeOut.out_at == null) {
            return NextResponse.json(
                { success: false, message: 'ติดต่อผู้ให้บริการ' },
                { status: 404 }
            )
        } else {
            const in_at: string = updatedTimeOut.in_at.toISOString().split("T")[1].split(".")[0]
            const out_at: string = updatedTimeOut.out_at?.toISOString().split("T")[1].split(".")[0]
            // console.log(in_at);
            // console.log(out_at);
            price = calculatePrice(in_at, out_at, discount)
        }

        await prisma.receipt.update({
            where: {
                parkingId: putParkingId
            },
            data: {
                status: true,
                price: price,
                discount: discount
            }
        })


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
            { success: false, message: 'Internal Server Error' },
            { status: 500 }
        )
    }
}