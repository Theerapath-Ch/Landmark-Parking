'use client'
import { useEffect, useState } from "react";
import { useKeyboard } from "@/utils/useKeyboard";
import { useRouter } from "next/navigation";
import Link from "next/link";
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

  return (

    <div className="p-8 flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-1/3 w-full ">
        <div>
          {/* card */}
          <ModeIn />
          <ModeOut />
          <ModeLost />
        </div>

        {/* Report */}
        <Report data={data}  />
        
        {/* <div>
          <Link className="
      px-4 py-2
      border border-gray-300
      rounded-full
      text-gray-600
      hover:border-red-500 hover:text-red-500
      transition" href={"/login"}>Log OUT</Link>
        </div> */}
      </div>
    </div >
  );
}
