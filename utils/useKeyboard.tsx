"use client";

import { useContext, createContext, useRef, useEffect } from "react";

type ActionMap = Record<string, () => void>

const KeyboardContext = createContext<{ setAction: (_: ActionMap) => void }>({
    setAction: () => { }
})

export const KeyboardProvider = ({ children }: { children: React.ReactNode }) => {
    const actionRef = useRef<ActionMap>({})
    // console.log(actionRef);
    useEffect(() => {
        const handelKey = (e: KeyboardEvent) => {
            console.log(e);
            if (e.repeat) return
            const key = e.key
            const action = actionRef.current
            if(key in action){   //ตรวจสอบว่า key มีอยู่ใน action ไหม 
                action[key]?.()
            }
        }
        window.addEventListener("keydown" , handelKey)
        return () => window.removeEventListener("keydown" , handelKey)
    }, [])

    const setAction = (action: ActionMap) => {
        actionRef.current = action
    }

    return (
        <KeyboardContext.Provider value={{setAction}} >
            {children}
        </KeyboardContext.Provider>
    )
}

export const useKeyboard = () => useContext(KeyboardContext);



