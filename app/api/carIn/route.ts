import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    // const prisma = new PrismaClient()
    try {
        const body = await req.json()
        const { plate_number } = body
        console.log(body);

        const now = new Date()
        const id = now.toISOString().replace(/[-:.TZ]/g, "")
        // YYYYMMDDHHMMSSmmm
        console.log(id);

        const car = await prisma.modein.create({
            data: {
                id: id,
                plate_number: plate_number,
                created_at: now
            }
        })




        return NextResponse.json({
            message: "Success",
            data: car
        })


    } catch (error) {
        console.log(error);
        
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        )
    }
}