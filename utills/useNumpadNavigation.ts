'use client'
    import { useRouter } from "next/navigation"


    export const useNumpadNavigation = ()  => {
        const router = useRouter();

        const action: Record<string, () => void> = {
            "1": () => router.push("/modeIn"),
            "2": () => router.push("/modeOut"),
            "/": () => router.push("/")
        }
        return action
    }

