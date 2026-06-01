'use client'

const Admin = () => {
    return (
        <div
            className="relative bg-gradient-to-r from-orange-600 to-orange-300 mb-3 rounded-2xl p-6
  shadow-[0_15px_35px_rgba(0,0,0,0.25)]
  hover:shadow-[0_25px_45px_rgba(0,0,0,0.3)]
  transition duration-300 transform hover:-translate-y-2
  cursor-pointer overflow-hidden"
        >
            {/* Background number (ด้านขวา) */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 pr-4">
                <span className="text-[400px] font-extrabold text-white opacity-50 leading-none select-none">
                    
                </span>
            </div>

            {/* Paper texture */}
            <div className="absolute inset-0 bg-white/20 rounded-2xl mix-blend-overlay pointer-events-none"></div>

            {/* Header */}
            {/* <h2 className="relative z-10 text-xl font-bold mb-2 text-gray-800">
                🚗 Parking
            </h2> */}

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center items-center">
                <p className="text-9xl mt-3 font-extrabold text-white drop-shadow-lg">
                    ADMIN
                </p>
            </div>
        </div>
    )
}

export default Admin
