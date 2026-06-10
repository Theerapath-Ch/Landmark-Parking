import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json()

        //console.log(body)

        const { username, pass } = body

        // เช็กข้อมูลก่อน
        if (!username || !pass) {
            return NextResponse.json(
                { error: "กรุณากรอก username และ password" },
                { status: 400 }
            )
        }

        // ค้นหา user
        const user = await prisma.admin.findUnique({
            where: {
                username: username
            }
        })

        //console.log(user)

        // เช็ก user
        if (!user || user.pass !== pass) {
            return NextResponse.json(
                { error: "Username หรือ Password ไม่ถูกต้อง" },
                { status: 401 }
            )
        }

        // response
        const response = NextResponse.json({
            message: "success",
            user
        })

        // set cookie
        response.cookies.set("auth_session", "authenticated", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24,
            path: "/",
        })

        return response

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: error },
            { status: 500 }
        )
    }
}
