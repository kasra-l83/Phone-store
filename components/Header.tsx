"use client"

import { IoCartOutline } from "react-icons/io5";
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { TiThMenu } from "react-icons/ti";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaPencilRuler } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";

export default function Header() {
    const [open, setOpen]= useState<boolean>(false);
    const { push }= useRouter();

    const session= localStorage.getItem("token");
    
    const click= () =>{
        push("/login")
    }
    const openHandler= () => setOpen(true);
    const closeHandler= () => setOpen(false);
    return (
        <>
        <header className="flex flex-col justify-center gap-y-3 p-5">
            <div className="flex flex-row-reverse justify-between items-center sm:flex-row">
                <span className={`gap-x-10 text-base text-gray-400 font-normal ${!session? "hidden" : "hidden sm:flex"}`}>
                    <a href="/admin/orders" className="hover:text-blue-500">سفارشات</a>
                    <a href="/admin/inventory" className="hover:text-blue-500">موجودی</a>
                    <a href="/admin/products" className="hover:text-blue-500">محصولات</a>
                </span>
                <span className="flex items-center gap-x-2">
                    <Image src="/icon/logo.png" alt='Logo' width={72} height={72}/>
                    <h1 className="text-2xl text-blue-900 font-semibold hidden sm:block">PLAY<span className="text-yellow-700">MEDA</span></h1>
                </span>
                <span className={`hidden gap-x-10 text-base text-gray-400 font-normal ${!session? "lg:flex" : ""}`}>
                    <a href="/" className="hover:text-blue-500">صفحه اصلی</a>
                    <a href="/products" className="hover:text-blue-500">محصولات</a>
                    <a href="/rules" className="hover:text-blue-500">قوانین و مقررات</a>
                    <a href="/contact" className="hover:text-blue-500">تماس با ما</a>
                    <a href="/about" className="hover:text-blue-500">درباره ما</a>
                </span>
                <span className={`flex gap-x-5 ${!session ? "" : "hidden"}`}>
                    <button onClick={click} className="text-blue-500 w-40 py-[10px] bg-gray-100 rounded-lg hover:bg-gray-300 hidden sm:block">ورود یا ثبت نام</button>
                    <button className="text-xl text-blue-500 p-[10px] bg-gray-100 rounded-lg hover:bg-gray-300 relative"><IoCartOutline/><div className="bg-blue-500 text-white absolute right-[-10px] top-[-10px] rounded-full size-6 flex justify-center items-center">0</div></button>
                </span>
                <button onClick={openHandler} className="p-[10px] bg-blue-500 text-white text-lg rounded-lg sm:hidden">
                    <TiThMenu />
                </button>
            </div>
            <hr/>
        </header>
        {open && !session && (
            <div className="flex flex-col bg-blue-500 text-white w-[35%] h-[100%] absolute top-0 z-20">
                <span className="flex items-center justify-between mb-5 px-2">
                    <h6>منو</h6>
                    <button onClick={closeHandler} className="text-3xl"><IoCloseSharp/></button>
                </span>
            <a onClick={closeHandler} href="/" className="hover:bg-white hover:text-blue-500 py-2 pr-1 flex gap-x-2 items-center"><IoHomeSharp />صفحه اصلی</a>
            <a onClick={closeHandler} href="/products" className="hover:bg-white hover:text-blue-500 py-2 pr-1 flex gap-x-2 items-center"><MdOutlineProductionQuantityLimits />محصولات</a>
            <a onClick={closeHandler} href="/rules" className="hover:bg-white hover:text-blue-500 py-2 pr-1 flex gap-x-2 items-center"><FaPencilRuler />قوانین و مقررات</a>
            <a onClick={closeHandler} href="/contact" className="hover:bg-white hover:text-blue-500 py-2 pr-1 flex gap-x-2 items-center"><FaPhoneFlip />تماس با ما</a>
            <a onClick={closeHandler} href="/about" className="hover:bg-white hover:text-blue-500 py-2 pr-1 flex gap-x-2 items-center">درباره ما</a>
        </div>
        )}
        {open && session && (
            <div className="flex flex-col bg-blue-500 text-white w-[35%] h-[100%] absolute top-0 z-20">
                <button onClick={closeHandler} className="text-3xl mb-5"><IoCloseSharp/></button>
            <a onClick={closeHandler} href="/admin/orders" className="hover:bg-white hover:text-blue-500 py-2 pr-1">سفارشات</a>
            <a onClick={closeHandler} href="/admin/inventory" className="hover:bg-white hover:text-blue-500 py-2 pr-1">موجودی</a>
            <a onClick={closeHandler} href="/admin/products" className="hover:bg-white hover:text-blue-500 py-2 pr-1">محصولات</a>
        </div>
        )}
        </>
    )
}