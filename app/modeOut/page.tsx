'use client'
import { useEffect } from "react"
import { useKeyboard } from "@/utills/useKeyboard"
import { useRouter } from "next/navigation"

const page = () => {
    const router = useRouter()
    const { setAction } = useKeyboard()

    useEffect(() => {
        setAction({
            "/": () => router.push("/")
        })

    }, [router, setAction])

    return (
        <div>
            mode OUT
        </div>
    )
}

export default page
