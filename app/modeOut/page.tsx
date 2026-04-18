'use client'
import { useEffect , useRef } from "react"
import { useKeyboard } from "@/utills/useKeyboard"
import { useRouter } from "next/navigation"

const page = () => {
    const router = useRouter()
    const { setAction } = useKeyboard()

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setAction({
            "/": () => router.push("/")
        })
        inputRef.current?.focus()

    }, [router, setAction])

    return (
        <div className="w-full mt-7  flex justify-center items-center ">
            <div className=" w-5xl h-full text-8xl p-5  flex flex-col justify-center items-center">
                BARCODE
                <div>
                    <input ref={inputRef} className="w-full h-45 text-center  text-8xl font-bold border-4 border-amber-300 rounded-2xl focus:outline-none  transition" type="text" />
                </div>
            </div>
        </div>
    )
}

export default page
