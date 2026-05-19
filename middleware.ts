import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    const session  = request.cookies.get("auth_session")?.value
    const pathname = request.nextUrl.pathname

    const isLoggedIn      = session === "authenticated"
    const isLoginPage     = pathname === "/login"
    const isRegisterPage  = pathname === "/register"   

    // ยกเว้นหน้า login และ register — ไม่ต้องเช็ค session
    if (isLoginPage || isRegisterPage) {
        // ถ้า login แล้ว ไม่ให้กลับไปหน้า login/register
        if (isLoggedIn) {
            return NextResponse.redirect(new URL("/", request.url))
        }
        return NextResponse.next()
    }

    // ทุกหน้าอื่น — ต้อง login ก่อน
    if (!isLoggedIn) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
}