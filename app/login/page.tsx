import logo from "../../public/logo.png";
import Image from "next/image";
export default function LoginPage() {
    return (
        <div className="relative flex items-center justify-center h-screen overflow-hidden">

            {/* Background */}
            <div className="absolute inset-0 bg-black">
                <Image
                    src={logo}
                    alt="bg"
                    className="w-full h-full object-cover blur-md scale-110"
                />
            </div>

            {/* Overlay (เพิ่มความเข้มเล็กน้อย) */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Card */}
            <div className="relative  p-8 rounded-2xl 
        bg-white/10 backdrop-blur-lg 
        shadow-2xl text-white">

                <h2 className="text-3xl font-bold text-center mb-6">
                    Login
                </h2>

                <form className="space-y-5">

                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full p-3 rounded-lg 
              bg-white/80 text-black 
              outline-none focus:ring-2 focus:ring-orange-400"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 rounded-lg 
              bg-white/80 text-black 
              outline-none focus:ring-2 focus:ring-orange-400"
                    />

                    <button
                        type="submit"
                        className="w-full p-3 rounded-lg 
              bg-gradient-to-r from-orange-500 to-red-500 
              font-bold text-white
              hover:scale-105 transition duration-300
              shadow-lg hover:shadow-orange-500/50"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}