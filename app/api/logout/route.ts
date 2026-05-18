// app/api/logout/route.ts
import { NextResponse } from "next/server"

export async function POST() {
    const response = NextResponse.json({ message: "success" })

    // ล้าง cookie โดยตั้ง maxAge = 0
    response.cookies.set("auth_session", "", {
        httpOnly: true,
        secure:   process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge:   0,
        path:     "/",
    })

    return response
}