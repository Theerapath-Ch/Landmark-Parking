'use client'

interface ReportData {
    id: string,
    plate_number: string,
    in_at: string,
    out_at: string,
    status: string
}

const Report = ({ data }: { data: ReportData[] }) => {
    console.log("data :" , data);

    return (
        <div className="bg-blue-100 rounded-2xl p-6 shadow-lg h-full">
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
                            {/* <th className="px-4 py-3 text-center"></th> */}
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                        {
                            data === undefined ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-4 text-gray-500">
                                        ไม่มีข้อมูล
                                    </td>
                                </tr>
                            ) : (
                                data.map((item, id) => (
                                    <tr
                                        key={id}
                                        className="bg-white hover:bg-blue-50 transition"
                                    >
                                        <td className="px-4 py-3 font-semibold">
                                            {item.id}
                                        </td>

                                        <td className="px-4 py-3">
                                            {item.plate_number}
                                        </td>

                                        <td className="px-4 py-3">
                                            {item.in_at.split("T")[1].split(".")[0]}
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            {
                                                !item.out_at ? (
                                                    <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                                                        IN
                                                    </span>
                                                ) : (
                                                    <span className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                                                        OUT
                                                    </span>
                                                )
                                            }
                                        </td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default Report
