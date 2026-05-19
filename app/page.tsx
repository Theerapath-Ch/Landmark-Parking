'use client'
import { useEffect, useState } from "react";
import { useKeyboard } from "@/utils/useKeyboard";
import { useRouter } from "next/navigation";
import ModeIn from "@/component/ModeIn";
import ModeOut from "@/component/ModeOut";
import ModeLost from "@/component/ModeLost";
import Report from "@/component/Report";

interface ReportData {
  id: string,
  plate_number: string,
  in_at: string,
  out_at: string,
  status: string
}


export default function Home() {

  const router = useRouter()
  const { setAction } = useKeyboard()

  const [data, setData] = useState<ReportData[]>([])

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
    await fetch("/api/logout", { method: "POST" })
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
      </div>
    </div >
  );
}
