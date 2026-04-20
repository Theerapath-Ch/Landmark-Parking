'use client'
import { useEffect, useRef, useState } from "react"
import { useKeyboard } from "@/utills/useKeyboard"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import Receipt_Out from "@/component/ReceiptOut"
import { createRoot } from 'react-dom/client'
import { useReactToPrint } from "react-to-print"

interface PrintDataOut {
    idParking: string
    plate_number: string
    date: string
    time_In: string
    time_Out: string
    idReceipt: string
    price: number,
    discount: string
}

interface ResGet {
    success: boolean
    data: {
        id: string
        plate_number: string
        in_at: string
        out_at: string
        receipt: {
            id: string,
            price:number,
            discount:string
        }
    }
}

const page = () => {
    const router = useRouter()
    const { setAction } = useKeyboard()
    const inputRef = useRef<HTMLInputElement>(null);
    const receiptRefOut = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState<string>("");
    const [display, setDisplay] = useState<boolean>(false);
    const handlePrint = useReactToPrint({
        contentRef: receiptRefOut,
    });

    useEffect(() => {
        setAction({
            "Enter": () => setDisplay(true),
            "1": () => updateTimeOut(value, "Landmark"),
            "0": () => updateTimeOut(value, "No-Discount"),
            "/": () => router.push("/")
        })
        inputRef.current?.focus()
        console.log(value);

    }, [value])


    const updateTimeOut = async (patkingId: string, discount: string | null) => {

        const timeOutUpdate = await fetch(`/api/carOut/updateTimeOut/${patkingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ discount: discount })
        })
        const resUpdate = await timeOutUpdate.json()
        console.log(resUpdate);

        const { success, message } = resUpdate
        if (!success) {
            await Swal.fire({
                icon: 'error',
                title: message,
            })
            router.push("/")
        }


        //console.log("timeOutUpdate :",timeOutUpdate);
        let resGet = {} as ResGet
        if (timeOutUpdate) {
            const getTimeOut = await fetch(`/api/carOut/${patkingId}`)
            resGet = await getTimeOut.json()
        }
        //console.log(resGet);
        const { data } = resGet
        console.log(data);
        

        if (success) {
            console.log(data.plate_number);
            const dateIn = data.in_at.split('T')[0]
            const timeIn = data.in_at.split('T')[1].split('.')[0]
            const dateOut = data.out_at.split('T')[1].split('.')[0]
            const timeOut = data.out_at.split('T')[1].split('.')[0]
            // console.log(timeIn);
            // console.log(timeOut);

            const printDataOut: PrintDataOut = {
                idParking: data.id,
                plate_number: data.plate_number,
                date: dateIn,
                time_In: timeIn,
                time_Out: timeOut,
                idReceipt: data.receipt.id,
                price: data.receipt.price,
                discount: data.receipt.discount
            }
            await Swal.fire({
                allowOutsideClick: false,
                allowEscapeKey: false,
                showCloseButton: false,
                html: '<div id="receipt-root" style="display:flex; justify-content:center;  width:100%;"></div>',
                confirmButtonText: 'ปริ้นใบเสร็จ',
                didOpen: () => {
                    const el = document.getElementById('receipt-root')
                    if (el) {
                        createRoot(el).render(<Receipt_Out
                            ref={receiptRefOut}
                            idParking={printDataOut.idParking}
                            plate_number={printDataOut.plate_number}
                            date={printDataOut.date}
                            time_In={printDataOut.time_In}
                            time_Out={printDataOut.time_Out}
                            idReceipt={printDataOut.idReceipt}
                            price={printDataOut.price}
                            discount={printDataOut.discount}
                        />)
                    }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    handlePrint()
                    router.push("/")
                }
            })
        }
    }


    return (
        <div className="w-full mt-7  flex justify-center items-center ">
            {!display && (
                <div className=" w-5xl h-full text-8xl p-5 flex  flex-col justify-center items-center  ">
                    BARCODE
                    <div>
                        <input ref={inputRef} className="w-full h-45 text-center  text-8xl font-bold border-4 border-amber-300 rounded-2xl focus:outline-none  transition" type="text"
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
            )}
            {display && (
                <div className="w-full  flex justify-center items-center mt-7">
                    <div className="w-full max-w-xl ">

                        {/* Card */}
                        <div className=" rounded-3xl shadow-2xl p-8 text-center ">

                            {/* Header */}
                            <h1 className="text-4xl font-extrabold tracking-wide mb-6">
                                🎟 Discount
                            </h1>

                            {/* Brand */}
                            <div className="relative bg-gradient-to-r from-green-400 to-emerald-600 text-white text-4xl font-bold py-6 px-8 rounded-2xl mb-6 shadow-[0_20px_40px_rgba(0,0,0,0.25)]">

                                {/* Paper texture overlay */}
                                <div className="absolute inset-0 bg-white/10 rounded-2xl mix-blend-overlay pointer-events-none"></div>

                                {/* Content */}
                                <span className="relative z-10 tracking-wide">LANMARK</span>

                                {/* Fold effect (เหมือนกระดาษงอเล็กน้อย) */}
                                <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/20 rounded-tl-3xl"></div>

                                {/* Badge */}
                                <div className="absolute bottom-3 right-2  text-white text-lg font-extrabold w-10 h-10 flex items-center justify-center rounded-full shadow-xl border border-emerald-300">
                                    1
                                </div>

                            </div>

                            {/* VIP Badge */}
                            <div className="flex flex-col ">

                                <div className="bg-gradient-to-r from-gray-400 to-gray-600 text-white text-4xl font-bold py-4 px-6 rounded-2xl shadow-lg mb-6">
                                    VIP
                                </div>

                                <div className="bg-gradient-to-r from-gray-400 to-gray-600 text-white text-4xl font-bold py-4 px-6 rounded-2xl shadow-lg mb-6">
                                    VIP
                                </div>

                                {/* No Discount */}
                                <div className="relative bg-gradient-to-r from-red-800 to-red-600 text-white text-xl font-bold py-6 px-8 rounded-2xl mb-6 shadow-[0_20px_40px_rgba(0,0,0,0.25)]">

                                    {/* Paper texture overlay */}
                                    <div className="absolute inset-0 bg-white/10 rounded-2xl mix-blend-overlay pointer-events-none"></div>

                                    {/* Content */}
                                    <span className="relative z-10 tracking-wide"> ❌ ไม่มีส่วนลด</span>

                                    {/* Fold effect (เหมือนกระดาษงอเล็กน้อย) */}
                                    <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/20 rounded-tl-3xl"></div>

                                    {/* Badge */}
                                    <div className="absolute bottom-3 right-2  text-white text-lg font-extrabold w-10 h-10 flex items-center justify-center rounded-full shadow-xl border border-red-700">
                                        0
                                    </div>

                                </div>

                            </div>


                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}

export default page
