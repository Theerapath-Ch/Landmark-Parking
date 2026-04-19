import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function PUT(req: NextRequest,
    { params }: { params: { putParkingId: string } }) {
    try {
        const { putParkingId } = await params
        //console.log(putParkingId);

        const existing = await prisma.parking.findUnique({
            where: { id: putParkingId }
        })
        //console.log(existing);

        if (!existing) {
            return NextResponse.json(
                { success: false, message: 'Not found' },
                { status: 404 }
            )
        }

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
        await prisma.receipt.update({
            where: {
                parkingId: putParkingId
            },
            data: {
                status: true
            }
        })


        //console.log(updated);


        return NextResponse.json(
            { success: true, data: updatedTimeOut },
            { status: 200 }
        )

    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' },
            { status: 500 }
        )
    }
}