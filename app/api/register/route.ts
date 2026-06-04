import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {

        const body = await req.json()

        //console.log(body)

        const { username, pass } = body

        // validate
        if (!username || !pass) {
            return NextResponse.json(
                { error: "กรุณากรอก username และ password" },
                { status: 400 }
            )
        }

        const findName = await prisma.admin.findUnique({
            where: {
                username: username,
            }
        })

        if (findName) {
            return NextResponse.json({
                message: "false",
                error: "Username นี้มีอยู่แล้ว"
            })
        }

        // create user
        const user = await prisma.admin.create({
            data: {
                username: username,
                pass: pass,
                createAt: new Date()
            }
        })

        //console.log(user)

        return NextResponse.json({
            message: "success",
            user
        })

    } catch (error) {

        console.log(error)

        return NextResponse.json(
            { error: "Update failed" },
            { status: 500 }
        )
    }
}
