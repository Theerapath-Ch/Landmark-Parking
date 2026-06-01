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
  // date: string,
  login: string,
  logout: string,
  cashier: string,
  amountCar: number,
  amountLandmark: number,
  amountNodiscount: number,
  amountLost: number,
  totalPrice: number
}

export default function Home() {

  const { setAction } = useKeyboard()
  const router = useRouter()

  const logOutRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: logOutRef,
  });

  const [data, setData] = useState<ReportData[]>([])

  const [nextShift, setNextShift] = useState<nextShift>({
    shift_no: "",
    // date: "",
    login: "",
    logout: "",
    cashier: "",
    amountCar: 0,
    amountLandmark: 0,
    amountNodiscount: 0,
    amountLost: 0,
    totalPrice: 0
  })

  const [shouldPrint, setShouldPrint] = useState(false);

  useEffect(() => {

      chkRole()

    setAction({
      "1": () => router.push("/modeIn"),
      "2": () => router.push("/modeOut"),
      "3": () => router.push("/modeLost"),
    })

    getReportData()

    if (nextShift && shouldPrint) {
      handlePrint();
      setShouldPrint(false);
    }



  }, [router, setAction, nextShift, shouldPrint, handlePrint])

  const chkRole = async () => {
    const chkRole = await fetch("/api/chkRole")
    const res = await chkRole.json()
   // console.log("chkRole :", res);
    const { data } = res
    if (data.shift == "Admin") router.push("/reportAdmin")

  }
  const getReportData = async () => {
    const getData = await fetch("/api/reportData")
    const res = await getData.json()
    //console.log(res);
    const { data } = res
    setData(data)
  }

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
    // console.log("nextShift :",res.nextShift);

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
      setNextShift({
        shift_no: id,
        // date: chkIn,
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
    setShouldPrint(true);

    router.push("/login")
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
            // date={nextShift.date}
            login={nextShift.login}
            logout={nextShift.logout}
            cashier={nextShift.cashier}
            amountCar={nextShift.amountCar}
            amountLandmark={nextShift.amountLandmark}
            amountNodiscount={nextShift.amountNodiscount}
            amountLost={nextShift.amountLost}
            totalPrice={nextShift.totalPrice}
          />
        </div>
      </div>
    </div >
  );
}
