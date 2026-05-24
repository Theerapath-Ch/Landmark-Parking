// components/Receipt.tsx
import { forwardRef } from "react";


interface nextShift {
    shift_no: string,
    date: string,
    login: string,
    logout: string,
    cashier: string,
    car_count: number,
    discount_amount: number,
    totalPrice: number
}

const Logout = forwardRef<HTMLDivElement, nextShift>((props, ref) => {
    // console.log(props.in_at);
    return (
        <div ref={ref} className="p-4 border text-sm w-[300px] bg-white text-black text-left">
            <div className="flex gap-5">
                {/* <Image src={logo} alt="logo" width={50}
                    height={50} /> */}
                <div>
                    <h2 className="text-center font-bold text-lg">HUAI KHWANG ESPORT</h2>
                    {/* <p className="text-center">Tel: 099-999-9999</p> */}
                </div>
            </div>
            <hr className="my-2" />

            <div>
                <p>shift_No : {props.shift_no}</p>
                <p>date :  {props.date}</p>
                <p>login : {props.login}</p>
                <p>logout :{props.logout} </p>
                <p>cashier : {props.cashier}</p>
                <p>car_count :{props.car_count} </p>
                <p>discount_amount :{props.discount_amount} </p>
                <p>totalPrice :{props.totalPrice} </p>
            </div>
            <hr className="my-2" />
            {/* <div>
                <p className=" text-4xl">ราคา : {props.price} บาท </p>
            </div> */}
        </div>
    );
});

export default Logout;