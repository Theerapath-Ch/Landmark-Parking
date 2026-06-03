'use client'
import Logout from "@/component/Logout";
import Receipt_Out from "@/component/ReceiptOut";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react"
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";

interface ReportDataCar {
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
interface ReportDataShift {
    id: string,
    chkIn: string,
    chkOut: string,
    shift: string,
    username: string,
    receipts: {
        price: number,
        discount: string
        remark: string
    }[]
}

interface prinDataCar {
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

interface nextShift {
    shift_no: string,
    login: string,
    logout: string,
    cashier: string,
    amountCar: number,
    amountLandmark: number,
    amountNodiscount: number,
    amountLost: number,
    totalPrice: number
}

export default function AdminPage() {
    const router = useRouter()

    const reChkReceipt = useRef<HTMLDivElement>(null);
    const handlePrintCar = useReactToPrint({
        contentRef: reChkReceipt,
    });
    const [shouldPrintCar, setShouldPrintCar] = useState(false)
    const [prinDataCar, setPrintDataCar] = useState<prinDataCar>({
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

    const shiftRef = useRef<HTMLDivElement>(null);
    const handlePrintShift = useReactToPrint({
        contentRef: shiftRef,
    });
    const [shouldPrintShift, setShouldPrintShift] = useState(false)
    const [prinDataShift, setPrintDataShift] = useState<nextShift>({
        shift_no: "",
        login: "",
        logout: "",
        cashier: "",
        amountCar: 0,
        amountLandmark: 0,
        amountNodiscount: 0,
        amountLost: 0,
        totalPrice: 0
    })

    const [allItems, setAllItems] = useState(0)
    const [carIn, setCarIn] = useState(0)
    const [price, setPrice] = useState(0)


    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const [activeTab, setActiveTab] = useState("car");


    const [dataCar, setDataCar] = useState<ReportDataCar[]>([])

    const [dataShift, setDataShift] = useState<ReportDataShift[]>([]);


    const dayShift = dataShift.filter((item) => item.shift === "Day");
    const nightShift = dataShift.filter((item) => item.shift === "Night");



    useEffect(() => {
        if (shouldPrintCar) {
            handlePrintCar();
        }
    }, [shouldPrintCar, prinDataCar]);

    useEffect(() => {
        if (shouldPrintShift) {
            handlePrintShift();
        }
    }, [shouldPrintShift, prinDataShift]);

    const getDataReportAdmin = async (startDate: string, endDate: string) => {
        const getData = await fetch("/api/reportDataAdmin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                startDate: startDate,
                endDate: endDate
            })
        })
        const res = await getData.json()
        const { dataCar, dataShift } = res
        console.log(dataShift);
        let allItems = 0
        let carIn = 0
        let sumPrice = 0
        dataCar.forEach((i: any) => {
            //console.log(i);
            if (i.out_at == null) {
                carIn++
            }
            if (i.receipt.price != null) {
                sumPrice += i.receipt.price
            }
            allItems++
        })
        setAllItems(allItems)
        setCarIn(carIn)
        setPrice(sumPrice)

        setDataCar(dataCar)
        setDataShift(dataShift)

    }

    const printReceiptData = async (patkingId: string,) => {
        const getDataReceipt = await fetch(`/api/carOut/receipt/${patkingId}`)
        const res = await getDataReceipt.json()
        const { data } = res
        //console.log(data);
        const dateIn = data.in_at.split('T')[0]
        const timeIn = data.in_at.split('T')[1].split('.')[0]
        //const dateOut = data.out_at.split('T')[1].split('.')[0]
        const timeOut = data.out_at.split('T')[1].split('.')[0]

        setPrintDataCar({
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
        setShouldPrintCar(true)
    }

    const printReceiptShift = async (idReceipt: string,) => {
        console.log(idReceipt);

        const getDataReceipt = await fetch(`/api/logout`, {
            method: 'POST',
            body: JSON.stringify({
                idReceipt: idReceipt
            })
        })
        const res = await getDataReceipt.json()
        //console.log(res);
        // const { message } = res
        type Shift = {
            discount: string | null;
            remark: string | null;
            price: number;
        };

        const summary = {
            amountCar: 0,
            amountLandmark: 0,
            amountNodiscount: 0,
            amountLost: 0,
            sumPrice: 0,
        };

        res.nextShift.forEach(({ discount, remark, price }: Shift) => {
            if (discount === "Landmark") {
                summary.amountLandmark++;
            } else if (discount === "No-Discount") {
                summary.amountNodiscount++;
            }
            if (remark === "lost") {
                summary.amountLost++;
            }
            summary.amountCar++;
            summary.sumPrice += price;
        });
        // console.log(summary.amountCar);
        // console.log(summary.amountLandmark);
        // console.log(summary.amountNodiscount);
        // console.log(summary.amountLost);
        // console.log(summary.sumPrice);

        const { id, chkIn, chkOut, shift } = res.chkTime
        // console.log(id);
        // console.log(chkIn);
        // console.log(chkOut);
        // console.log(shift);

        if (res.message === "success") {
            setPrintDataShift({
                shift_no: id,
                login: chkIn,
                logout: chkOut,
                cashier: shift,
                amountCar: summary.amountCar,
                amountLandmark: summary.amountLandmark,
                amountNodiscount: summary.amountNodiscount,
                amountLost: summary.amountLost,
                totalPrice: summary.sumPrice
            })
        }
        setShouldPrintShift(true)
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

        await fetch("/api/logout", {
            method: "POST",
            body: JSON.stringify({
                idReceipt: null
            })
        })
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
                            onClick={() => getDataReportAdmin(startDate, endDate)}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                        >
                            ค้นหา
                        </button>
                    </div>
                </div>
            </div>
            {/* tab */}
            <div>
                {/* Header */}
                <div className="flex gap-2 mb-4">
                    <button
                        onClick={() => setActiveTab("car")}
                        className={`px-4 py-2 rounded ${activeTab === "car"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                            }`}
                    >
                        รถ
                    </button>

                    <button
                        onClick={() => setActiveTab("shift")}
                        className={`px-4 py-2 rounded ${activeTab === "shift"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                            }`}
                    >
                        กะงาน
                    </button>
                </div>
            </div>

            {activeTab === "car" && (<div className="reportAdmin1 ">
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
                            ประวัติการจอดรถ วันที่ {startDate} - {endDate}
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
                                {dataCar.map((item, i) => {
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
                                                                onClick={() => printReceiptData(item.id)}
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
                                idParking={prinDataCar.idParking}
                                plate_number={prinDataCar.plate_number}
                                date={prinDataCar.date}
                                time_In={prinDataCar.time_In}
                                time_Out={prinDataCar.time_Out}
                                idReceipt={prinDataCar.idReceipt}
                                price={prinDataCar.price}
                                discount={prinDataCar.discount}
                                remark={prinDataCar.remark}
                            />
                        </div>
                    </div>
                </div>
            </div>
            )}

            {activeTab === "shift" && (<div className="reportAdmin2 ">
                <div className="min-h-screen bg-slate-100 p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* DAY SHIFT */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="flex items-center justify-between bg-amber-500 px-6 py-4">
                                <h2 className="text-xl font-bold text-white">
                                    ☀ DAY SHIFT
                                </h2>
                            </div>

                            <div className="p-5 space-y-4">
                                {dayShift.map((item, i) => {
                                    const dateIn = item.chkIn?.split("T")[0] ?? "";
                                    const timeIn = item.chkIn?.split("T")[1]?.split(".")[0] ?? "";
                                    const dateOut = item.chkOut?.split("T")[0] ?? "";
                                    const timeOut = item.chkOut?.split("T")[1]?.split(".")[0] ?? "";

                                    const price = item.receipts.reduce(
                                        (sum, receipt) => sum + receipt.price,
                                        0
                                    );
                                    return (
                                        <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:shadow-md transition" onClick={() => printReceiptShift(item.id)}>
                                            <div className="text-sm text-slate-600 space-y-1">
                                                <p>เข้างาน : {dateIn} {timeIn}</p>
                                                <p>ออกงาน : {dateOut} {timeOut}</p>
                                                <p>ผลรวมรายได้ ทั้งหมด : {price} ฿</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* NIGHT SHIFT */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="flex items-center justify-between bg-indigo-600 px-6 py-4">
                                <h2 className="text-xl font-bold text-white">
                                    🌙 NIGHT SHIFT
                                </h2>
                            </div>

                            <div className="p-5 space-y-4">
                                {nightShift.map((item, i) => {

                                    const dateIn = item.chkIn?.split("T")[0] ?? "";
                                    const timeIn = item.chkIn?.split("T")[1]?.split(".")[0] ?? "";
                                    const dateOut = item.chkOut?.split("T")[0] ?? "";
                                    const timeOut = item.chkOut?.split("T")[1]?.split(".")[0] ?? "";
                                    const price = item.receipts.reduce(
                                        (sum, receipt) => sum + receipt.price,
                                        0
                                    );
                                    return (
                                        <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:shadow-md transition"
                                            onClick={() => printReceiptShift(item.id)}
                                        >
                                            <div className="text-sm text-slate-600 space-y-1">
                                                <p>เข้างาน : {dateIn} {timeIn}</p>
                                                <p>ออกงาน : {dateOut} {timeOut}</p>
                                                <p>ผลรวมรายได้ ทั้งหมด : {price} ฿</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="hidden">
                                <Logout
                                    ref={shiftRef}
                                    shift_no={prinDataShift.shift_no}
                                    login={prinDataShift.login}
                                    logout={prinDataShift.logout}
                                    cashier={prinDataShift.cashier}
                                    amountCar={prinDataShift.amountCar}
                                    amountLandmark={prinDataShift.amountLandmark}
                                    amountNodiscount={prinDataShift.amountNodiscount}
                                    amountLost={prinDataShift.amountLost}
                                    totalPrice={prinDataShift.totalPrice}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}