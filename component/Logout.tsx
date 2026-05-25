// components/Receipt.tsx
import { forwardRef } from "react";


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

const Logout = forwardRef<HTMLDivElement, nextShift>((props, ref) => {
    //console.log("props :" , props.shift_no);
    const dateIn = props.login?.split("T")[0] ?? "";
    const timeIn = props.login?.split("T")[1]?.split(".")[0] ?? "";
    const dateOut = props.logout?.split("T")[0] ?? "";
    const timeOut = props.logout?.split("T")[1]?.split(".")[0] ?? "";


    return (
        <div ref={ref} className="p-4 border text-sm w-[300px] bg-white text-black text-left">
            <div className="flex gap-5">
                <div>
                    <h2 className="text-center font-bold text-lg">HUAI KHWANG ESPORT</h2>
                </div>
            </div>
            <hr className="my-2" />

            <div className="w-full">
                <p>shift_No : {props.shift_no}</p>
                <p>date :  {dateIn} {timeIn}</p>
                <p>login :  {dateIn} {timeIn}</p>
                <p>logout : {dateOut} {timeOut} </p>
                <p>cashier : {props.cashier}</p>
                <p>จำนวนรถทั้งหมด : {props.amountCar} </p>
                <p>จำนวนที่ใช้ ส่วนลด Landmark : {props.amountLandmark} </p>
                <p>จำนวนที่ไม้ได้ไช้ส่วนลด : {props.amountNodiscount} </p>
                <p>จำนวนใบเสร็จหาย : {props.amountLost} </p>
                <p>ผลรวมรายได้ ทั้งหมด {props.amountCar} คัน  : {props.totalPrice} บาท</p>
            </div>
            {/* <hr className="my-2" /> */}
            {/* <div>
                <p className=" text-4xl">ราคา : {props.price} บาท </p>
            </div> */}
        </div>
    );
});

export default Logout;