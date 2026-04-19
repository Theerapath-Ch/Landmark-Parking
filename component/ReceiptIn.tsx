// components/Receipt.tsx
import { forwardRef } from "react";
import Barcode from "react-barcode";

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
            <h2 className="text-center font-bold text-lg">LANDMARK</h2>
            <p className="text-center">Tel: 099-999-9999</p>

            <hr className="my-2" />

            <div>
                <h4 className="font-bold">อัตราค่าบริการ</h4>
                <p>รถยนต์</p>
                <p>1. ค่าบริการ 20 นาทีแรกฟรี นาทีที่ 26 - 60 คิดค่าบริการ 40.- บาท และจากนั้นคิดค่าบริการในอัตราชั่วโมงละ 40.- บาท</p>
                <p>2. เมื่อประทับตรา ZOWIE Esport Center ค่าบริการ 3 ชั่วโมงแรกฟรี จากนั้นคิดค่าบริการในอัตราชั่วโมงละ 10.- บาท</p>
                <p>3. เศษนาทีคิดค่าบริการเป็น 1 ชั่วโมง</p>
            </div>

            <hr className="my-2" />
            <h4 className="font-bold">ประทับตราที่นี่</h4>
            <hr className="my-2" />


            <div>
                <h4 className="font-bold">เงื่อนไขและข้อปฏิบัติ</h4>
                <p>1.การให้บริการเป็นเพียงการอำนวยความสะดวกเท่านั้น มิใช่เป็นการฝากทรัพย์ หากความเสียหายและ/หรือสูญหายของตัวรถ และทรัพย์สินภายในรถของผู้รับบริการ ผู้ให้บริการจะไม่รับผิดชอบในความเสียหายและสูญหายใดๆ ที่เกิดขึ้นทั้งสิ้น</p>
                <p>2. บัตรนี้ใช้แสดงเพื่อการนำรถออก โปรดเก็บไว้กับตัวท่าน หากเกิดบัตรสูญหายจะต้องเสียค่าปรับ 200.- บาท พร้อมค่าบริการจอดรถตั้งแต่นาทีแรก และต้องนำหลักฐานการเป็นเจ้าของรถมาแสดงต่อผู้บริการ</p>
                <p>3. กรุณาจอดรถไว้ในที่ ที่ผู้ให้บริการกำหนดไว้เท่านั้น ฝ่าฝืนจะถูกล็อกล้อ ผู้รับบริการจะต้องชำระค่าปลดล็อกในอัตราครั้งละ 200.- บาท และเสียค่าบริการจอดรถตามอัตราที่กำหนด</p>

            </div>

            <h1 className="font-bold">โปรดทราบ</h1>
            บัตรจอดรถหาย ปรับ 200.- บาท และเสียค่าจอดรถตั้งแต่นาทีแรก
            <hr className="my-2" />

            <div>
                <h1>PARKING ID :No. {props.idParking}</h1>
                <p>DATE CAR-IN : {props.date}</p>
                <p>TIME CAR-IN : {props.time}</p>
                <p>RECEIPT ID :No.{props.idReceipt}</p>
                <p>LICENSE PLATE : NO.{props.plate_number}</p>
            </div>
            <hr className="my-2" />
            {props.idParking && (
                <Barcode
                    value={props.idParking}
                    format='CODE128'
                    width={1}
                    height={60}
                    displayValue={true}
                />
            )}
        </div>
    );
});

export default Receipt_IN;