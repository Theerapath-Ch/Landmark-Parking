import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



export async function POST(req: NextRequest) {
    try {

        const body = await req.json()
        //console.log(body)
        const { startDate, endDate } = body

        const start = startDate
            ? new Date(`${startDate}T00:00:00.000Z`)
            : new Date(Date.now() + 7 * 60 * 60 * 1000);
        //console.log(start);

        const end = endDate
            ? new Date(`${endDate}T23:59:59.999Z`)
            : new Date(Date.now() + 7 * 60 * 60 * 1000);
        //console.log(end);

        const dataCar = await prisma.parking.findMany({
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
        //console.log(dataCar);

        const dataShift = await prisma.checktime.findMany({
            where: {
                chkIn: {
                    gte: start,
                    lte: end,
                },
                shift: {
                    in: ["Day", "Night"],
                }
            },
            include:{
                receipts: {
                    select: {
                        price:true,
                        discount:true,
                        remark:true
                    }
                }
            }
        })
        //console.log(dataShift);
        

        return NextResponse.json(
            {
                success: true,
                dataCar: dataCar,
                dataShift: dataShift,
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