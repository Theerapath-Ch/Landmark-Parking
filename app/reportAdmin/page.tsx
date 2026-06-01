'use client'
import Receipt_Out from "@/component/ReceiptOut";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react"
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";

interface ReportDataAdmin {
    id: string,
    plate_number: string,
    in_at: string,
    out_at: string,
    price: string,
    discount: string,
    status: string,
    receipt: {
        price: number,
        discount: string
        remark: string
    }
}

interface PrintDataOut {
    idParking: string
    plate_number: string
    date: string
    time_In: string
    time_Out: string
    idReceipt: string
    price: number,
    discount: string,
    remark: string
}

export default function AdminPage() {
    const router = useRouter()


    const [data, setData] = useState<ReportDataAdmin[]>([])

    const [printDataOut, setPrintDataOut] = useState<PrintDataOut>({
        idParking: "",
        plate_number: "",
        date: "",
        time_In: "",
        time_Out: "",
        idReceipt: "",
        price: 0,
        discount: "",
        remark: ""
    })

    const reChkReceipt = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        contentRef: reChkReceipt,
    });

    const [print, setPrint] = useState(false)
    const [allItems, setAllItems] = useState(0)
    const [carIn, setCarIn] = useState(0)
    const [price, setPrice] = useState(0)


    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")


    useEffect(() => {
        // getDataReportAdmin()

        if (print) {
            handlePrint()
        }
    }, [printDataOut])



    const getDataReportAdmin = async (startDate: string, endDate: string) => {
        // console.log("วันที่เริ่ม:", startDate)
        // console.log("วันที่สิ้นสุด:", endDate)
        const getData = await fetch("/api/reportDataAdmin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                startDate: startDate,
                endDate: endDate
            })
        })
        const res = await getData.json()
        console.log(res);
        const { data } = res
        
        let allItems = 0
        let carIn = 0
        let sumPrice = 0
        data.forEach((i: any) => {
            //console.log(i);
            if (i.out_at == null) {
                carIn++
            }
            if (i.receipt.price != null) {
                sumPrice += i.receipt.price
            }
            allItems++
        })
        //console.log(carIn);
        setAllItems(allItems)
        setCarIn(carIn)
        setPrice(sumPrice)

        setData(data)
    }

    const printReceipt = async (patkingId: string,) => {
        const getDataReceipt = await fetch(`/api/carOut/receipt/${patkingId}`)
        const res = await getDataReceipt.json()
        const { data } = res
        //console.log(data);
        const dateIn = data.in_at.split('T')[0]
        const timeIn = data.in_at.split('T')[1].split('.')[0]
        const dateOut = data.out_at.split('T')[1].split('.')[0]
        const timeOut = data.out_at.split('T')[1].split('.')[0]

        setPrintDataOut({
            idParking: data.id,
            plate_number: data.plate_number,
            date: dateIn,
            time_In: timeIn,
            time_Out: timeOut,
            idReceipt: data.receipt.id,
            price: data.receipt.price,
            discount: data.receipt.discount,
            remark: data.receipt.remark
        })
        setPrint(true)

    }

    const logout = async () => {

        const result = await Swal.fire({
            icon: 'warning',
            title: "คุณต้องการ Log out ใช่ไหม",
            allowOutsideClick: false,
            allowEscapeKey: false,
            showCancelButton: true,
            confirmButtonText: 'ตกลง',
        })
        //console.log(result);

        if (!result.isConfirmed) return

        const logout = await fetch("/api/logout", {
            method: "POST"
        })

        const res = await logout.json()
        //console.log(res);

        router.push("/login")

    }


    return (
        <div className="min-h-screen bg-gray-100 p-4">
            {/* Header */}
            <div className="flex justify-between p-1">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">
                        Parking Management
                    </h1>
                    <p className="text-gray-500">
                        ระบบจัดการข้อมูลการจอดรถ
                    </p>
                </div>
                <div>
                    <button
                        onClick={logout}
                        className="
              px-4 py-2
              border border-gray-300
              rounded-full
              text-gray-600
              hover:border-red-500 hover:text-red-500
              transition"
                    >
                        LOG OUT
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl shadow p-4 mb-6">
                <h2 className="font-semibold mb-4">
                    ค้นหาข้อมูล
                </h2>

                <div className="grid md:grid-cols-4 gap-4">
                    <div>
                        <label className="text-sm">
                            วันที่เริ่มต้น
                        </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full border rounded-lg p-2"
                        />
                    </div>

                    <div>
                        <label className="text-sm">
                            วันที่สิ้นสุด
                        </label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full border rounded-lg p-2"
                        />
                    </div>

                    <div className="flex items-end">
                        <button
                            onClick={() => getDataReportAdmin(startDate,endDate )}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                        >
                            ค้นหา
                        </button>
                    </div>
                </div>
            </div>

            {/* Summary */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl shadow p-5">
                    <p className="text-gray-500">
                        รถทั้งหมด
                    </p>
                    <h2 className="text-3xl font-bold">
                        {allItems}
                    </h2>
                </div>

                <div className="bg-white rounded-xl shadow p-5">
                    <p className="text-gray-500">
                        รถที่ยังไม่ออก
                    </p>
                    <h2 className="text-3xl font-bold text-orange-500">
                        {carIn}
                    </h2>
                </div>

                <div className="bg-white rounded-xl shadow p-5">
                    <p className="text-gray-500">
                        รายได้รวม
                    </p>
                    <h2 className="text-3xl font-bold text-green-600">
                        {price}
                    </h2>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow">
                <div className="p-4 border-b">
                    <h2 className="font-semibold">
                        ประวัติการจอดรถ
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full ">
                        <thead className="bg-gray-5 ">
                            <tr>
                                <th className="p-3">
                                    ID
                                </th>
                                <th className="p-3">
                                    ทะเบียน
                                </th>
                                <th className="p-3">
                                    เวลาเข้า
                                </th>
                                <th className="p-3">
                                    เวลาออก
                                </th>
                                <th className="p-3">
                                    ค่าจอด
                                </th>
                                <th className="p-3">
                                    ส่วนลด
                                </th>
                                <th className="p-3">
                                    หมายเหตุ
                                </th>
                                <th className="p-3">
                                    สถานะ
                                </th>
                                <th className="p-3">
                                    {/* จัดการ */}
                                </th>
                            </tr>
                        </thead>

                        <tbody className="text-center">
                            {data.map((item, i) => {
                                return (
                                    <tr key={i} className="border-t">
                                        <td className="p-3">
                                            {item.id}
                                        </td>
                                        <td className="p-3">
                                            {item.plate_number}
                                        </td>
                                        <td className="p-3">
                                            {item.in_at.split("T")[0]} {item.in_at.split("T")[1].split(".")[0]}
                                        </td>
                                        <td className="p-3">
                                            {item.out_at
                                                ? `${item.out_at.split("T")[0]} ${item.out_at.split("T")[1].split(".")[0]}`
                                                : "-"}
                                        </td>
                                        <td className="p-3">
                                            {item.receipt.price}
                                        </td>
                                        <td className="p-3">
                                            {item.receipt.discount == 'No-Discount' || item.receipt.remark == "lost"
                                                ? "-"
                                                : item.receipt.discount
                                            }
                                        </td>
                                        <td className="p-3">
                                            {item.receipt.remark == "lost"
                                                ? "ใบเสร็จหาย"
                                                : ""
                                            }
                                        </td>
                                        <td className="p-3">
                                            {item.out_at == null ? (
                                                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                                                    ยังไม่ชำระ
                                                </span>
                                            ) : (
                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                                    ชำระแล้ว
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-3">
                                            {
                                                item.out_at == null
                                                    ? (
                                                        <button
                                                            className="px-3 py-2 bg-gray-300 text-gray-500 rounded-lg "
                                                        >
                                                            พิมพ์ใบเสร็จ
                                                        </button>
                                                    )
                                                    : (
                                                        <button
                                                            onClick={() => printReceipt(item.id)}
                                                            className="px-3 py-2 bg-green-600 text-white rounded-lg
                                                hover:bg-green-400 hover:text-black "
                                                        >
                                                            พิมพ์ใบเสร็จ
                                                        </button>
                                                    )
                                            }
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div className="hidden">
                        <Receipt_Out
                            ref={reChkReceipt}
                            idParking={printDataOut.idParking}
                            plate_number={printDataOut.plate_number}
                            date={printDataOut.date}
                            time_In={printDataOut.time_In}
                            time_Out={printDataOut.time_Out}
                            idReceipt={printDataOut.idReceipt}
                            price={printDataOut.price}
                            discount={printDataOut.discount}
                            remark={printDataOut.remark}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}