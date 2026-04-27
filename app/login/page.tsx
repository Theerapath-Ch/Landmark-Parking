'use client'
import { useEffect, useRef } from "react";
import logo from "../../public/logo.png";
import Image from "next/image";
import { useKeyboard } from "@/utils/useKeyboard"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const router = useRouter()
    const { setAction } = useKeyboard()

    const inputRef1 = useRef<HTMLInputElement>(null);
    const inputRef2 = useRef<HTMLInputElement>(null)
    
    const adminIdRef = useRef<string>("")
    const adminPassRef = useRef<string>("")

    useEffect(() => {
        setAction({
            "Enter": () => logIn(adminIdRef.current, adminPassRef.current),
            "/": () => router.push("/"),
            "ArrowDown": () => inputRef2.current?.focus()
        })
        inputRef1.current?.focus()
    }, [])

    const logIn = async (adminId: string, adminPass: string) => {
        // console.log("adminId", adminId);
        // console.log("adminPass", adminPass);
        const result = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: parseInt(adminId),
                pass: parseInt(adminPass)
            })
        })
        const data = await result.json()
        console.log(data);
        
        if(data.message == "success"){
            router.push("/");
        }
    
    }

    return (
        <div className="relative flex items-center justify-center h-screen overflow-hidden">

            <div className="absolute inset-0 bg-black">
                <Image
                    src={logo}
                    alt="bg"
                    className="w-full h-full object-cover blur-md scale-110"
                />
            </div>

            <div className="absolute inset-0 bg-black/30"></div>

            <div className="relative p-8 rounded-2xl 
                bg-white/10 backdrop-blur-lg 
                shadow-2xl text-white">

                <h2 className="text-3xl font-bold text-center mb-6">
                    Login
                </h2>

                <div className="space-y-5">
                    <input
                        ref={inputRef1}
                        type="text"
                        placeholder="ID"
                        className="w-full p-3 rounded-lg 
                            bg-white/80 text-black 
                            outline-none focus:ring-2 focus:ring-orange-400"
                        onChange={(e) => {
                            adminIdRef.current = e.target.value 
                        }}
                    />

                    <input
                        ref={inputRef2}
                        type="text"
                        placeholder="Password"
                        className="w-full p-3 rounded-lg 
                            bg-white/80 text-black 
                            outline-none focus:ring-2 focus:ring-orange-400"
                        onChange={(e) => {
                            adminPassRef.current = e.target.value
                        }}
                    />

                    <button
                        onClick={() => logIn(adminIdRef.current, adminPassRef.current)} 
                        className="w-full p-3 rounded-lg 
                            bg-gradient-to-r from-orange-500 to-red-500 
                            font-bold text-white
                            hover:scale-105 transition duration-300
                            shadow-lg hover:shadow-orange-500/50"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
}