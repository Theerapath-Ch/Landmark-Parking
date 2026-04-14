
export const useKeyDown = () => {
    const handleKey = (e: KeyboardEvent , 
        action: Record<string , () => void> 
    ) => {
        let key = e.key
        action?.[key]?.()
    };
    return handleKey
}