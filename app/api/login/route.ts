import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json()
        console.log(body);
        const { id, pass } = body

        const user = await prisma.admin.findUnique({
            where: { id } 
        })

        if (!user) {
            return Response.json(
                { error: "User not found" },
                { status: 404 }
            )
        }

        // เช็ค password
        if (user.pass !== pass) {
            return Response.json(
                { error: "Invalid password" },
                { status: 401 }
            )
        }

        return Response.json({
            message: "success",
            user
        })


    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: error },
            { status: 500 }
        )
    }
}
