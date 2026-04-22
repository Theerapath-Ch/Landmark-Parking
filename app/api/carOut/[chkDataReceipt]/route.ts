import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



export async function GET(_: NextRequest,
    { params }: { params: Promise<{ chkDataReceipt: string }> }) {
    try {
        const { chkDataReceipt } = await params
        //console.log(chkDataReceipt);
        

        const existing = await prisma.parking.findUnique({
            where: { id: chkDataReceipt }
        })
        //console.log(existing?.chkDataReceipt);

        if (!existing) {
            return NextResponse.json(
                { success: false, message: 'ไม่พบข้อมูลใน Barcode' },
                { status: 404 }
            )
        }   

        if (existing.out_at != null) {
            return NextResponse.json(
                { success: false, message: `ไอดี ${chkDataReceipt} นี้สแกนออกไปแล้ว !` },
                { status: 404 }
            )
        }

        

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