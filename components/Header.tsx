"use client"

import { IoCartOutline } from "react-icons/io5";
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { TiThMenu } from "react-icons/ti";

export default function Header() {
    const session= localStorage.getItem("token");
    const { push }= useRouter();
    const click= () =>{
        push("/login")
    }
    return (
        <header className="flex flex-col justify-center gap-y-3 p-5">
            <div className="flex flex-row-reverse justify-between items-center sm:flex-row">
                <span className={`gap-x-10 text-base text-gray-400 font-normal ${!session? "hidden" : "hidden sm:flex"}`}>
                    <a href="/admin/orders" className="hover:text-gray-600">سفارشات</a>
                    <a href="/admin/inventory" className="hover:text-gray-600">موجودی</a>
                    <a href="/admin/products" className="hover:text-gray-600">محصولات</a>
                </span>
                <span className="flex items-center gap-x-2">
                    <Image src="/icon/logo.png" alt='Logo' width={72} height={72}/>
                    <h1 className="text-2xl text-blue-900 font-semibold hidden sm:block">PLAY<span className="text-yellow-700">MEDA</span></h1>
                </span>
                <span className={`hidden gap-x-10 text-base text-gray-400 font-normal ${!session? "lg:flex" : ""}`}>
                    <a href="/" className="hover:text-gray-600">صفحه اصلی</a>
                    <a href="/products" className="hover:text-gray-600">محصولات</a>
                    <a href="/rules" className="hover:text-gray-600">قوانین و مقررات</a>
                    <a href="/contact" className="hover:text-gray-600">تماس با ما</a>
                    <a href="/about" className="hover:text-gray-600">درباره ما</a>
                </span>
                <span className={`flex gap-x-5 ${!session ? "" : "hidden"}`}>
                    <button onClick={click} className="text-blue-500 w-40 py-[10px] bg-gray-100 rounded-lg hover:bg-gray-300 hidden sm:block">ورود یا ثبت نام</button>
                    <button className="text-xl text-blue-500 p-[10px] bg-gray-100 rounded-lg hover:bg-gray-300 relative"><IoCartOutline/><div className="bg-blue-500 text-white absolute right-[-10px] top-[-10px] rounded-full size-6 flex justify-center items-center">0</div></button>
                </span>
                <div className="p-[10px] bg-blue-500 text-white text-lg rounded-lg cursor-pointer sm:hidden">
                    <TiThMenu />
                </div>
            </div>
            <hr/>
        </header>
    )
}