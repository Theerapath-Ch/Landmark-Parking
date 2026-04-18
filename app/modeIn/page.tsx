'use client'
import { useEffect, useRef, useState } from "react"
import { useKeyboard } from "@/utills/useKeyboard"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"

const modeIn = () => {
  const router = useRouter()
  const { setAction } = useKeyboard()
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState<string>("")
  // console.log(inputRef);
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
    const { message } = data
    //console.log(message)
    if (message == "Success") {
      await Swal.fire({
        title: 'success!',
        text: 'บันทึกข้อมูลแล้ว',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        confirmButtonText: 'ตกลง'
      })
    }

    router.push("/")
  }



  return (
    <div className="h-dvh bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-350 grid grid-cols-3 gap-6 p-6">

        {/* LEFT PANEL */}
        <div className="col-span-2 bg-white rounded-3xl shadow-xl p-10 flex flex-col justify-between">
          <div>
            <p className="text-3xl text-gray-500 mb-4">กรอกเลขทะเบียน</p>
            <input
              inputMode="numeric"
              type="text"
              placeholder="----"
              pattern="[0-9]*"
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
            />
            <p className="text-2xl text-gray-400 mt-6">
              เวลาเข้า : <input className="text-black font-semibold" value="12:00" readOnly />
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex flex-col justify-between">
          {/* SAVE */}
          <button
            className="flex-1 bg-green-300 text-5xl font-bold rounded-3xl shadow-lg"
          >
            SAVE
          </button>


          {/* CANCEL */}
          <button className="flex-1 bg-red-400  text-5xl font-bold rounded-3xl shadow-lg  mt-6">
            BACK
          </button>

        </div>

      </div>
    </div>
  )
}

export default modeIn
