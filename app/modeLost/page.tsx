'use client'

import { useEffect, useState } from "react";
import { useKeyboard } from "@/utils/useKeyboard";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface ReportData {
    id: string,
    plate_number: string,
    in_at: string,
    out_at: string,
    status: string
}
const page = () => {
    const router = useRouter()
    const { setAction } = useKeyboard()
    const [data, setData] = useState<ReportData[]>([])
    useEffect(() => {
        setAction({
            "/": () => router.push("/"),
        })
        const fetchData = async () => {
            const getData = await fetch("/api/reportData")
            const res = await getData.json()
            //console.log(res);
            const { data } = res
            setData(data);

        }
        fetchData()
    }, [])

    const sendData = async (idParking: string) => {
        //alert("test");
        //console.log(idParking);

        const result = await Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            showCancelButton: true,
            title: "คุณต้องการบันทึก ใบเสร็จหาย ใช่ไหม ",
            icon: 'warning',
        })
        //console.log(result);

        const { isConfirmed } = result
        if (!isConfirmed) {
            const chk = document.getElementById(idParking) as HTMLInputElement
            chk.checked = false
        } else {
            const fine = await Swal.fire({
                title: "ค่าปรับ",
                input: "number",
                inputLabel: "ระบุราคาค่าปรับ",
                showCancelButton: true,
                customClass: {
                    input: "no-spinner"
                },
                inputValidator: (value) => {
                    if (!value) return "โปรดระบุราคาที่ปรับ";
                }
            });
            console.log(fine);
            if (fine.isConfirmed) {
                const lostReceipt = await fetch("/api/lost", {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        idParking: idParking,
                        fine: parseInt(fine.value)
                    })
                })

                const result = await lostReceipt.json()
                //console.log(result);
                const { success } = result
                if (success) {
                    await Swal.fire({
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showCloseButton: false,
                        title: "บันทึกข้อมูลเรียบร้อย",
                        icon: 'success',
                        text: `ID : ${idParking} นี้ ได้ทำใบเสร็จหาย`,
                        confirmButtonText: 'ตกลง',
                        //showCancelButton: true,
                    })

                    router.push("/")
                }
            } else {
                const chk = document.getElementById(idParking) as HTMLInputElement
                chk.checked = false
            }
        }

    }

    return (
        <div className="p-5">
            <div className="bg-gray-100 w-fit p-3 mb-2 text-2xl text-gray-700 px-3 py-1 rounded-lg  font-mono shadow-inner">
                กด <span className="text-gray-700  font-medium tracking-wide"> "/" </span> เพื่อย้อนกลับ
            </div>
            <div className="bg-orange-200 rounded-2xl p-6 shadow-lg h-full ">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                        รายการ <span className=" text-4xl">รถ</span> ที่อยู่ในระบบ
                    </h2>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-xl shadow-md">
                    <table className="w-full text-center border-collapse">

                        {/* Header */}
                        <thead>
                            <tr className="bg-orange-500 text-gray-800 text-sm uppercase">
                                <th className="px-4 py-3">✔</th>
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">เลขทะเบียน</th>
                                <th className="px-4 py-3">เวลาเข้า</th>
                                <th className="px-4 py-3 text-center">Status</th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody>
                            {data.map((item, id) => {
                                return (
                                    <tr
                                        key={id}
                                        className="bg-white hover:bg-blue-50 transition"
                                    >

                                        {/* Checkbox */}
                                        <td className="px-4 py-3">
                                            <input
                                                id={(item.id)}
                                                type="checkbox"
                                                onClick={() => sendData(item.id)}
                                                //checked={selectedIds.includes(item.id)}
                                                //onChange={() => handleCheckbox(item.id)}
                                                className="w-4 h-4 cursor-pointer"
                                            />
                                        </td>

                                        <td className="px-4 py-3 font-semibold">
                                            {item.id}
                                        </td>

                                        <td className="px-4 py-3">
                                            {item.plate_number}
                                        </td>

                                        <td className="px-4 py-3">
                                            {item.in_at.split("T")[1].split(".")[0]}
                                        </td>

                                        {!item.out_at && (
                                            <td className="px-4 py-3 text-center">
                                                <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                                                    IN
                                                </span>
                                            </td>
                                        )}
                                    </tr>
                                )
                            })}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}
export default page