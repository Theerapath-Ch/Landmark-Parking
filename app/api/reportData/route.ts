import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



export async function GET(_: NextRequest) {
    try {

        //console.log(chkDataReceipt);

        const today = new Date();

        const start = new Date(Date.UTC(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            0, 0, 0
        ));

        const end = new Date(Date.UTC(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            23, 59, 59
        ));

        // const data = await prisma.parking.findMany({
        //     where: {
        //         in_at: {
        //             gte: start,
        //             lte: end
        //         }
        //     }
        // });
        const data = await prisma.parking.findMany({
            where: {
                in_at: {
                    gte: start,
                    lte: end
                },
                out_at: null 
            },

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