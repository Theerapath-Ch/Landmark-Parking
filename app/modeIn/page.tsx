'use client'
import { useEffect, useRef, useState } from "react"
import { useKeyboard } from "@/utills/useKeyboard"
import { useRouter } from "next/navigation"
import { useReactToPrint } from "react-to-print"
import Swal from "sweetalert2"
import Receipt_In from "@/component/ReceiptIn"

interface PrintDataIn {
  idParking: string
  plate_number: string
  date: string
  time: string
  idReceipt: string
}

const modeIn = () => {
  const router = useRouter()
  const { setAction } = useKeyboard()
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState<string>("")
  // console.log(inputRef);
  const receiptRefIn = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: receiptRefIn,
  });

  const [printDataIn, setPrintDataIn] = useState<PrintDataIn>({
    idParking: "",
    plate_number: "",
    date: "",
    time: "",
    idReceipt: ""
  })

  useEffect(() => {
    setAction({
      "Enter": () => submitCarIn(value),
      "/": () => router.push("/")
    })
    inputRef.current?.focus()

  }, [value])

  //console.log(value);

  const submitCarIn = async (val: string) => {

    const res = await fetch("/api/carIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({  
        plate_number: val
      })
    })

    const data = await res.json()
    const { message, infoCar, infoReceipt } = data
    // console.log(infoCar.in_at)

    if (message == 'no-plate') {
      await Swal.fire({
        position: "top-end",
        icon: 'error',
        title: 'กรุณากรออกเลขทะเบียน',
      })
    }


    if (message == "Success") {
      const date = infoCar.in_at.split('T')[0]
      const time = infoCar.in_at.split('T')[1].split('.')[0]
      setPrintDataIn({
        idParking: infoCar.id,
        plate_number: infoCar.plate_number,
        date: date,
        time: time,
        idReceipt: infoReceipt.id
      })
      await Swal.fire({
        title: 'บันทึกข้อมูลแล้ว',
        text: "id : " + infoCar.id + "  / เลขทะเบียน : " + infoCar.plate_number,
        icon: 'success',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showCloseButton: false,
        confirmButtonText: 'ปริ้นใบเสร็จ',
      }).then((result) => {
        if (result.isConfirmed) {
          handlePrint()
        }
      })
      router.push("/")
    } else {
      await Swal.fire({
        title: "internal Server Error",
        icon: 'error',
      })

    }
  }



  return (
    <div className="h-dvh bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-350 grid grid-cols-3 gap-6 p-6">

        {/* LEFT PANEL */}
        <div className="col-span-2 bg-white rounded-3xl shadow-xl p-10 flex flex-col justify-between">
          <div>
            <p className="text-3xl text-gray-500 mb-4">กรอกเลขทะเบียน</p>
            <input
              type="text"
              placeholder="----"
              ref={inputRef}
              onChange={(e) => {
                let val = e.target.value.replace(/\D/g, "")
                if (val.length > 4) {
                  // alert("กรอกได้สูงสุด 4 ตัวเลข")
                  val = val.slice(0, 4)
                }
                setValue(val)
              }}
              className="w-full h-45 text-center text-8xl font-bold border-4 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 transition"
              required
            />
            {/* <p className="text-2xl text-gray-400 mt-6">
              เวลาเข้า : <input className="text-black font-semibold" value="" readOnly />
            </p> */}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex flex-col justify-between gap-1'">
          {/* SAVE */}
          <button
            className="relative flex-1 bg-green-300 text-5xl font-bold rounded-xl px-8 py-6
  shadow-[0_15px_35px_rgba(0,0,0,0.25)]
  border border-green-200 "
          >
            {/* Text */}
            <span className="relative z-10">SAVE</span>

            {/* Fold corner (มุมกระดาษงอ) */}
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/30 rounded-tl-3xl"></div>

            {/* Badge number */}
            <div className="absolute bottom-3 right-3  text-green-600 text-lg font-extrabold w-10 h-10 flex items-center justify-center ">
              Enter
            </div>

          </button>


          {/* CANCEL */}
          <button
            className="relative flex-1 bg-red-600 text-5xl mt-2 font-bold rounded-xl px-8 py-6
  shadow-[0_15px_35px_rgba(0,0,0,0.25)]
  border border-red-200"
          >
            {/* Text */}
            <span className="relative z-10">Back</span>

            {/* Fold corner (มุมกระดาษงอ) */}
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/30 rounded-tl-3xl"></div>

            {/* Badge number */}
            <div className="absolute bottom-3 right-3 bg-white text-red-600 text-xl font-extrabold w-10 h-10 flex items-center justify-center rounded-full shadow-lg border border-red-300">
              /
            </div>

          </button>

        </div>

      </div>
      <div className="hidden">
        <Receipt_In
          ref={receiptRefIn}
          idParking={printDataIn.idParking}
          plate_number={printDataIn.plate_number}
          date={printDataIn.date}
          time={printDataIn.time}
          idReceipt={printDataIn.idReceipt}
        />
      </div>
    </div>
  )
}

export default modeIn
