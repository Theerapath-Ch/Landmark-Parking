'use client'
import { useEffect } from "react";
import { useKeyboard } from "@/utills/useKeyboard";
import { useRouter } from "next/navigation";
// import { useNumpadNavigation } from "../utills/useNumpadNavigation"
// import { useKeyDown } from "../utills/useKeyDown"
export default function Home() {
  // const action = useNumpadNavigation();
  // const handelKey = useKeyDown()

  const router = useRouter()
  const { setAction } = useKeyboard()

  useEffect(() => {
    setAction({
      "1" : () => router.push("/modeIn"),
      "2" : () => router.push("/modeOut"),
    })

  }, [router , setAction])


  return (

    <div className="p-8 flex justify-center items-center">
      {/* <input ref={inputRef} onKeyDown={chocie} /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-1/3 w-full ">
        <div className="  ">
          {/* Card 1 */}
          <div className="bg-green-300 mb-3 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 cursor-pointer">
            <h2 className="text-xl font-bold mb-2 text-gray-800">🚗 Parking</h2>
            <div className="h-fit flex flex-col justify-center items-center">
              <p className="text-9xl mt-3">IN</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-red-400 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 cursor-pointer">
            <h2 className="text-xl font-bold mb-2 text-gray-800">🚗 Parking</h2>
            <div className="h-fit flex flex-col justify-center items-center">
              <p className="text-9xl mt-3">OUT</p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-blue-100 rounded-2xl p-6 shadow-lg ">
          <h2 className="text-xl font-bold mb-2 text-gray-800">📊 Report</h2>
          <p className="text-gray-600">ดูรายงานและสถิติ</p>
        </div>

      </div>
    </div>
  );
}
