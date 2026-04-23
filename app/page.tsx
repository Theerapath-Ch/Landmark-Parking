'use client'
import { useEffect, useState } from "react";
import { useKeyboard } from "@/utils/useKeyboard";
import { useRouter } from "next/navigation";

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
      {/* <input ref={inputRef} onKeyDown={chocie} /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-1/3 w-full ">
        <div className="  ">
          {/* Card 1 */}
          <div
            className="relative bg-green-300 mb-3 rounded-2xl p-6
  shadow-[0_15px_35px_rgba(0,0,0,0.25)]
  hover:shadow-[0_25px_45px_rgba(0,0,0,0.3)]
  transition duration-300 transform hover:-translate-y-2
  cursor-pointer overflow-hidden"
          >
            {/* Paper texture */}
            <div className="absolute inset-0 bg-white/20 rounded-2xl mix-blend-overlay pointer-events-none"></div>

            {/* Header */}
            <h2 className="relative z-10 text-xl font-bold mb-2 text-gray-800">
              🚗 Parking
            </h2>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center items-center">
              <p className="text-9xl mt-3 font-extrabold text-white drop-shadow-lg">
                IN
              </p>
            </div>

            {/* Fold corner (กระดาษงอ) */}
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/30 rounded-tl-3xl"></div>

            {/* Badge number */}
            <div className="absolute bottom-3 right-4 bg-white text-green-600 text-lg font-extrabold w-10 h-10 flex items-center justify-center rounded-full shadow-lg border border-green-300">
              1
            </div>
          </div>


          {/* Card 2 */}
          <div
            className="relative bg-red-400 mb-3 rounded-2xl p-6
  shadow-[0_15px_35px_rgba(0,0,0,0.25)]
  hover:shadow-[0_25px_45px_rgba(0,0,0,0.3)]
  transition duration-300 transform hover:-translate-y-2
  cursor-pointer overflow-hidden"
          >
            {/* Paper texture */}
            <div className="absolute inset-0 bg-white/20 rounded-2xl mix-blend-overlay pointer-events-none"></div>

            {/* Header */}
            <h2 className="relative z-10 text-xl font-bold mb-2 text-gray-800">
              🚗 Parking
            </h2>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center items-center">
              <p className="text-9xl mt-3 font-extrabold text-white drop-shadow-lg">
                OUT
              </p>
            </div>

            {/* Fold corner (กระดาษงอ) */}
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/30 rounded-tl-3xl"></div>

            {/* Badge number */}
            <div className="absolute bottom-3 right-4 bg-white text-red-600 text-lg font-extrabold w-10 h-10 flex items-center justify-center rounded-full shadow-lg border border-red-300">
              2
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-blue-100 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-800">📊 Report</h2>

          {/* Table */}
          <div className="overflow-hidden rounded-xl shadow-md">
            <table className="w-full text-center border-collapse">

              {/* Header */}
              <thead>
                <tr className="bg-blue-300 text-gray-800 text-sm uppercase">
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
                    <tr key={id} className="bg-white hover:bg-blue-50 transition">
                      <td className="px-4 py-3 font-semibold">{item.id}</td>
                      <td className="px-4 py-3">{item.plate_number}</td>
                      <td className="px-4 py-3">{item.in_at.split("T")[1].split(".")[0]}</td>
                      {
                        !item.out_at && (
                          <td className="px-4 py-3 text-center">
                            <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                              IN
                            </span>
                          </td>
                        )

                      }

                    </tr>
                  )
                })}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </div >
  );
}
