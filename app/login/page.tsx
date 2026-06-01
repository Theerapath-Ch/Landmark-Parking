'use client'
import { useEffect, useRef, useState } from "react";
import logo from "../../public/logo.png";
import Image from "next/image";
import { useKeyboard } from "@/utils/useKeyboard"
import { useRouter } from "next/navigation"
import Day from "@/component/Day";
import Night from "@/component/Night";

import Swal from "sweetalert2";
import Admin from "@/component/Admin";

export default function LoginPage() {
    const router = useRouter()
    const { setAction } = useKeyboard()

    //const inputRef1 = useRef<HTMLInputElement>(null);
    //const inputRef2 = useRef<HTMLInputElement>(null)

    const usernameRef = useRef<string>("")
    const passwordRef = useRef<string>("")

    const [error, setError] = useState<string>("")
    const [shift, setShift] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setAction({
            "Enter": () => logIn(usernameRef.current, passwordRef.current),
            "/": () => setShift(""),
            // "1": () => setShift("Day"),
            // "2": () => setShift("Night"),
            // "3": () => router.push("/register"),
            //"ArrowDown": () => inputRef2.current?.focus()
        })
        //inputRef1.current?.focus()
    }, [shift])

    const logIn = async (username: string, password: string,) => {
        //console.log(shift);
        if (!username || !password) {
            setError("กรุณากรอก ID และ Password")
            return
        }
        setLoading(true)
        setError("")
        try {
            //console.log(shift);
            const result = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username,
                    pass: parseInt(password),
                    shift: shift,
                })
            })
            const data = await result.json()
            if (data.message === "success") {
                const checkTime = await fetch("/api/checktime", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: username,
                        shift: shift,
                    })
                })
                const res = await checkTime.json()
                if (res.message === "success") {
                    console.log(res.userId);

                    setShift("")
                    router.push("/")
                } else {
                    await Swal.fire({
                        title: "ไม่สามารถบันทึกการเข้างานได้ กรุณาลองใหม่อีกครั้ง"
                    })
                    setShift("")
                }


            } else {
                setError(data.error ?? "ID หรือ Password ไม่ถูกต้อง")
            }
        } catch {
            setError("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="relative flex items-center justify-center h-screen overflow-hidden">

            {/* Background */}
            <div className="absolute inset-0 bg-black">
                <Image
                    src={logo}
                    loading="eager"
                    alt="bg"
                    className="w-full h-full object-cover blur-md scale-110"
                />
            </div>
            <div className="absolute inset-0 bg-black/30" />

            {/* Card */}
            {!shift && (
                <div className="flex gap-8 justify-center items-center">
                    <div>
                        <div onClick={() => setShift("Day")}>
                            <Day />
                        </div>
                        <div onClick={() => setShift("Night")}>
                            <Night />
                        </div>
                    </div>
                    <div className="w-fit" onClick={() => setShift("Admin")}>
                        <Admin />
                    </div>
                </div>
            )}
            {shift && (
                <div className="relative p-8 rounded-2xl w-full max-w-sm
                bg-white/10 backdrop-blur-lg 
                shadow-2xl text-white ">
                    <div className="" >
                        <h2 className="text-3xl font-bold text-center mb-6">Login {shift}</h2>
                        <div className="space-y-5">
                            <input
                                //ref={inputRef1}
                                type="text"
                                placeholder="Username"
                                className="w-full p-3 rounded-lg
                            bg-white/80 text-black
                            outline-none focus:ring-2 focus:ring-orange-400"
                                onChange={(e) => {
                                    usernameRef.current = e.target.value

                                }}
                            />
                            <input
                                //ref={inputRef2}
                                type="password"
                                placeholder="Password"
                                className="w-full p-3 rounded-lg
                            bg-white/80 text-black
                            outline-none focus:ring-2 focus:ring-orange-400"
                                onChange={(e) => {
                                    passwordRef.current = e.target.value
                                }}
                            />
                            {/* Error message */}
                            {error && (
                                <p className="text-sm text-red-300 bg-red-500/20 
                            border border-red-400/40 rounded-lg px-3 py-2 text-center">
                                    {error}
                                </p>
                            )}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => logIn(usernameRef.current, passwordRef.current)}
                                    disabled={loading}
                                    className="w-full p-3 rounded-lg
                                bg-gradient-to-r from-orange-500 to-red-500
                                font-bold text-white
                                hover:scale-105 transition duration-300
                                shadow-lg hover:shadow-orange-500/50
                                disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                                >
                                    {loading ? "กำลังเข้าสู่ระบบ..." : "Sign In"}
                                </button>

                                <button
                                    onClick={() => router.push("/register")}
                                    className="w-full p-3 rounded-lg
                                bg-gradient-to-r from-blue-500 to-blue-800
                                font-bold text-white
                                hover:scale-105 transition duration-300
                                shadow-lg hover:shadow-blue-500/50"
                                >
                                    Register
                                </button> 
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}