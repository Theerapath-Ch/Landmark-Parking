import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



export async function POST(req: NextRequest) {
    try {

        const body = await req.json()
        console.log(body)
        const { startDate, endDate } = body

        const start = new Date(`${startDate}T00:00:00.000Z`)
        //console.log(start);

        const end = new Date(`${endDate}T23:59:59.999Z`)
        //console.log(end);

        const data = await prisma.parking.findMany({
            where: {
                in_at: {
                    gte: start,
                    lte: end,
                }
            },
            include: {
                receipt: {
                    select: {
                        price: true,
                        discount: true,
                        remark: true
                    }
                }
            }
        })
        console.log(data);

        return NextResponse.json(
            {
                success: true,
                data: data,
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