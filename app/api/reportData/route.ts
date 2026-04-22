import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



export async function GET(_: NextRequest) {
    try {
        
        //console.log(chkDataReceipt);
        

        const data = await prisma.parking.findMany()
        console.log(data);

        
        

        return NextResponse.json(
            {
                success: true,
                data:data,
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