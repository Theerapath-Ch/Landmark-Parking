// components/Receipt.tsx
import { forwardRef } from "react";

interface PrintDataOut {
    idParking: string
    plate_number: string
    date: string
    time_In: string
    time_Out: string
    idReceipt: string
    price: number,
    discount: string

}

const Receipt_Out = forwardRef<HTMLDivElement , PrintDataOut>((props, ref) => {
    // console.log(props.in_at);
    return (
        <div ref={ref} className="p-4 border text-sm w-[300px] bg-white text-black text-left">
            <h2 className="text-center font-bold text-lg">LANDMARK</h2>
            <p className="text-center">Tel: 099-999-9999</p>
            <hr className="my-2" />

            <div>
                <p>PARKING ID :No. {props.idParking}</p>
                <p>RECEIPT ID :No. {props.idReceipt}</p>
                <p>LICENSE PLATE : {props.plate_number}</p>
                <p>DATE CAR-IN :{props.date} </p>
                <p>TIME CAR-IN : {props.time_In}</p>
                <p>TIME CAR-OUT :{props.time_Out} </p>
                <p>DISCOUNT :{props.discount} </p>
            </div>
            <hr className="my-2" />
            <div>
                <p>ราคา : {props.price} บาท </p>
            </div>
        </div>
    );
});

export default Receipt_Out;