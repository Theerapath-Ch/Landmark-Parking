'use client'
import { useEffect, useRef, useState } from "react";
import { useKeyboard } from "@/utils/useKeyboard";
import { useRouter } from "next/navigation";
import ModeIn from "@/component/ModeIn";
import ModeOut from "@/component/ModeOut";
import ModeLost from "@/component/ModeLost";
import Report from "@/component/Report";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import Logout from "@/component/Logout";


interface ReportData {
  id: string,
  plate_number: string,
  in_at: string,
  out_at: string,
  status: string
}
interface nextShift {
  shift_no: string,
  date: string,
  login: string,
  logout: string,
  cashier: string,
  car_count: number,
  discount_amount: number,
  totalPrice: number
}


export default function Home() {


  const router = useRouter()
  const { setAction } = useKeyboard()

  const logOutRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: logOutRef,
  });

  const [data, setData] = useState<ReportData[]>([])

  const [nextShift, setNextShift] = useState<nextShift>({
    shift_no: "",
    date: "",
    login: "",
    logout: "",
    cashier: "",
    car_count: 0,
    discount_amount: 0,
    totalPrice: 0
  })

  useEffect(() => {
    setAction({
      "1": () => router.push("/modeIn"),
      "2": () => router.push("/modeOut"),
      "3": () => router.push("/modeLost"),
    })

    const getReportData = async () => {
      const getData = await fetch("/api/reportData")
      const res = await getData.json()
      // console.log(res);
      const { data } = res
      // console.log(data);
      setData(data)
    }
    getReportData()

  }, [router, setAction])

  const handleLogout = async () => {
    const result = await Swal.fire({
      icon: 'warning',
      title: "คุณต้องการส่งกะ ใช่ไหม",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: true,
      confirmButtonText: 'ตกลง',
    })
    //console.log(result);

    if (!result.isConfirmed) return

    const chk = await fetch("/api/logout", {
      method: "POST"
    })

    const res = await chk.json()
    console.log(res.nextShift[0].checktime.chkIn);

    // const {checktimeID , } = res.nexShift

    if (res.message === "success") {
      // setNextShift({
      //   shift_no: res.nextShift.checktimeID,
      //   date: res.nextShift.checktime.chkIn,
      //   login: res.nextShift.checktime.chkIn,
      //   logout: res.nextShift.checktime.chkOut,
      //   cashier: res.nextShift.checktime.shift,
      //   car_count: 0,
      //   discount_amount: 0,
      //   totalPrice: 0
      // })
      handlePrint()
    }

    //router.push("/login")
  }

  return (
    <div className="p-0 flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6  w-full  px-10 py-4 ">
        <div className="">
          {/* card */}
          <ModeIn />
          <ModeOut />
          <ModeLost />
        </div>

        <div className=" w-full ">
          {/* Report */}
          <Report data={data} />
        </div>

        <div>
          <button
            onClick={handleLogout}
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
        <div className="hidden">
          <Logout
            ref={logOutRef}
            shift_no={nextShift.shift_no}
            date={nextShift.date}
            login={nextShift.login}
            logout={nextShift.logout}
            cashier={nextShift.cashier}
            car_count={nextShift.car_count}
            discount_amount={nextShift.discount_amount}
            totalPrice={nextShift.totalPrice}
          />
        </div>
      </div>
    </div >
  );
}
