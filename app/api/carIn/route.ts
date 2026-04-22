import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json()
        //console.log(body);
        const { plate_number } = body

        if (plate_number == "" || undefined) {
            return NextResponse.json({
                message: "no-plate"
            })
        }

        const now = new Date(Date.now() + 7 * 60 * 60 * 1000)
        const id = now.toISOString().replace(/[-:.TZ]/g, "") // YYYYMMDDHHMMSSmmm
        console.log(id);

        const car = await prisma.parking.create({
            data: {
                id: id,
                plate_number: plate_number,
                in_at: now
            }
        })

        if (car) {
            const receipt = await prisma.receipt.create({
                data: {
                    parkingId: id
                }
            })
            return NextResponse.json({
                message: "Success",
                infoCar: car,
                infoReceipt : receipt
            })
        }

    } catch (error) {
        //console.log(error);
        return NextResponse.json(
            { message: error },
            { status: 500 }
        )
    }
}