'use client'
import { useKeyboard } from "@/utils/useKeyboard"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import Swal from "sweetalert2"



const page = () => {
    const router = useRouter()
    const { setAction } = useKeyboard()

    const inputRef = useRef<HTMLInputElement>(null);

    const [value, setValue] = useState<string>("");

    useEffect(() => {
        setAction({
            "Enter": () => lostReceipt(value),
            "/": () => router.push("/")
        })
        //console.log(value);  
        inputRef.current?.focus() 

    }, [value])

    const lostReceipt = async (idParking: string) => {
        
        const lostReceipt = await fetch("/api/lost", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idParking: idParking })
        })

        const result = await lostReceipt.json()
        console.log(result);
        const { success } = result
        if (success) {
        const result = await Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            showCloseButton: false,
            title: "คุณต้องการบันทึก ใบเสร็จหาย ใช่ไหม ",
            icon: 'warning',
            text: `ID : ${idParking}`,
            confirmButtonText: 'ตกลง',
            //showCancelButton: true,
        })
        console.log(result);
        
        
        // .then((result) => {
        //     if (result.isConfirmed) {
        //         Swal.fire({
        //             icon: "success",
        //             title: "บันทึกข้อมูลแล้ว",
        //         })
        //         router.push("/")
        //     } else {
        //         Swal.fire({
        //             icon: "error",
        //             title: "ยกเลิก",
        //         })
                router.push("/")
        //     }
        // })
        }
    }
    return (
        <div className="w-full mt-7  flex justify-center items-center">
            <div className=" w-5xl h-full text-8xl p-5 flex  flex-col justify-center items-center  ">
                BARCODE
                <div>
                    <input ref={inputRef} className="w-full h-45 text-center  text-8xl font-bold border-4 border-orange-500 rounded-2xl focus:outline-none  transition" type="text"
                        onChange={(e) => {
                            const val = e.target.value
                            setValue(val)
                        }}
                    />
                </div>
                {value && (
                    <div>
                        <button className="flex-1 p-5 bg-green-300 text-5xl font-bold rounded-3xl shadow-lg">Enter</button>
                    </div>
                )}

            </div>
        </div>
    )
}

export default page

