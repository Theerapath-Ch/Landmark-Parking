import Image from "next/image"
import logo from "../public/logo.png";


const Navbar = () => {
    return (
        <nav className="w-full  2xl:p-4 relative shadow-2xl shadow-gray-400 overflow-hidden bg-linear-to-r from-black via-gray-900 to-black  ">
            {/* เอฟเฟกต์แสงวิ่ง */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_40%)] animate-pulse"></div>
            {/* เส้นแสงด้านล่าง */}
            <div className="absolute bottom-0 left-0 w-full "></div>
            <div className="flex justify-center items-center gap-4 py-3 relative z-10">
                {/* Logo */}
                <Image
                    src={logo}
                    alt="logo"
                    width={100}
                    height={100}
                    // className="w-25 h-25 "
                />
                {/* Title */}
                <h1 className="text-amber-100 text-3xl md:text-4xl font-bold tracking-wider 
                    drop-shadow-[0_0_8px_rgba(255,200,0,0.5)]">
                    LANDMARK PARKING POS
                </h1>
            </div>
        </nav>
    )
}

export default Navbar
