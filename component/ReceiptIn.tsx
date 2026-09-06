// components/Receipt.tsx
import { forwardRef } from "react";
import Barcode from "react-barcode";
// import logo from "../public/logo.png";
// import Image from "next/image";

interface PrintDataIn {
    idParking: string
    plate_number: string
    date: string
    time: string
    idReceipt: string
}

const Receipt_IN = forwardRef<HTMLDivElement, PrintDataIn>((props, ref) => {
    // console.log(props.in_at);
    return (
        <div ref={ref} className="p-4 text-sm w-[300px] bg-white text-black">
            <div className="flex gap-5">
                {/* <Image src={logo} alt="logo" width={50}
                    height={50} /> */}
                <div className="text-center w-full">
                    <h2 className=" font-bold text-[18px]">HUAI KHWANG ESPORT</h2>
                    {/* <p className="text-center">Tel: 099-999-9999</p> */}
                </div>
            </div>

            <hr className="my-2" />

                <div >
                    <h4 className="text-[12px]  font-bold">อัตราค่าบริการ</h4>
                    <p className="text-[10px] font-bold">รถยนต์</p>
                    <p className="text-[9px]">1. ค่าบริการ 15 นาทีแรกฟรี นาทีที่ 16 - 60 คิดค่าบริการ 40.- บาท และจากนั้นคิดค่าบริการในอัตราชั่วโมงละ 40.- บาท</p>
                    <p className="text-[9px]">2. เมื่อประทับตรา LANDMARK ค่าบริการ 3 ชั่วโมงแรกฟรี จากนั้นคิดค่าบริการในอัตราชั่วโมงละ 10.- บาท</p>
                    <p className="text-[9px]">3. เมื่อซื้อของโลตัสครบ 150 บาท จอด 1 ชั่วโมงแรกฟรี จากนั้นคิดค่าบริการอัตราชั่วโมงละ 40.- บาท</p>
                    <p className="text-[9px]">4. เศษนาทีคิดค่าบริการเป็น 1 ชั่วโมง</p>
                </div>

                <hr className="my-2" />
                <h4 className="font-bold text-[12px]">ประทับตราที่นี่</h4>
                <hr className="my-2" />

                <div>
                    <h4 className="font-bold text-[12px]">เงื่อนไขและข้อปฏิบัติ</h4>
                    <p className="text-[9px] leading-[1.25]">1.การให้บริการเป็นเพียงการอำนวยความสะดวกเท่านั้น มิใช่เป็นการฝากทรัพย์ หากความเสียหายและ/หรือสูญหายของตัวรถ และทรัพย์สินภายในรถของผู้รับบริการ ผู้ให้บริการจะไม่รับผิดชอบในความเสียหายและสูญหายใดๆ ที่เกิดขึ้นทั้งสิ้น</p>
                    <p className="text-[9px] leading-[1.25]">2. บัตรนี้ใช้แสดงเพื่อการนำรถออก โปรดเก็บไว้กับตัวท่าน หากเกิดบัตรสูญหายจะต้องเสียค่าปรับ 200.- บาท พร้อมค่าบริการจอดรถตั้งแต่นาทีแรก และต้องนำหลักฐานการเป็นเจ้าของรถมาแสดงต่อผู้บริการ</p>
                    <p className="text-[9px] leading-[1.25]">3. กรุณาจอดรถไว้ในที่ ที่ผู้ให้บริการกำหนดไว้เท่านั้น ฝ่าฝืนจะถูกล็อกล้อ ผู้รับบริการจะต้องชำระค่าปลดล็อกในอัตราครั้งละ 200.- บาท และเสียค่าบริการจอดรถตามอัตราที่กำหนด</p>

                </div>

                <h1 className="font-bold text-[12px] mt-1">โปรดทราบ</h1>
                    <p className="text-[10px]">บัตรจอดรถหาย ปรับ 200.- บาท และเสียค่าจอดรถตั้งแต่นาทีแรก</p>
            

            <hr className="my-2" />
            <div className="text-[10px]">
                <h1>PARKING ID :No. {props.idParking}</h1>
                <p>DATE CAR-IN : {props.date}</p>
                <p>TIME CAR-IN : {props.time}</p>
                <p>RECEIPT ID :No.{props.idReceipt}</p>
                <p>LICENSE PLATE : NO.{props.plate_number}</p>
            </div>
            <hr className="my-2" />
            <div className="flex justify-center w-full ">
                {props.idParking && (
                    <Barcode
                        value={props.idParking}
                        width={1.5}
                        height={70}
                        fontSize={12}
                        displayValue={true}
                    />
                )}
            </div>
        </div>
    );
});

export default Receipt_IN;