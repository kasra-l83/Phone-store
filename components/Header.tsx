import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { BiSolidPhoneCall } from "react-icons/bi";
import Image from 'next/image'
import { Button } from "./button";

export default function Header() {
    return (
        <header className="flex flex-col gap-y-3 py-5">
            <div className="sm:flex justify-between items-center hidden">
                <span className="flex gap-10 text-base text-gray-400 font-normal">
                    <a href="/" className="hover:text-gray-600">صفحه اصلی</a>
                    <a href="/rules" className="hover:text-gray-600">قوانین و مقررات</a>
                    <a href="/contact" className="hover:text-gray-600">تماس با ما</a>
                    <a href="/about" className="hover:text-gray-600">درباره ما</a>
                </span>
                <div className="w-36 relative text-sm text-center">
                    <h6>پشتیبانی 24 ساعته</h6>
                    <h6>۰۲۱-۵۸۷۴۲۳۶</h6>
                    <BiSolidPhoneCall className="text-blue-500 text-2xl absolute left-[-10px] top-3"/>
                </div>
            </div>
            <hr className="hidden sm:block"/>
            <div className="flex justify-between items-center">
                <span className="flex items-center gap-x-2">
                    <Image src="/icon/logo.png" alt='Logo' width={72} height={72}/>
                    <h1 className="text-2xl text-blue-900 font-semibold hidden sm:block">PLAY<span className="text-yellow-700">MEDA</span></h1>
                </span>
                <div className="lg:flex items-center relative hidden">
                    <input type="text" name="search" placeholder="جستجو..." className="h-10 w-[496px] px-3 border rounded-lg"/>
                    <CiSearch className="text-xl absolute left-3"/>
                </div>
                <span className="flex gap-x-5">
                    <Button/>
                    <button className="text-xl text-blue-500 p-[10px] bg-gray-100 rounded-lg hover:bg-gray-300 relative"><IoCartOutline/><div className="bg-blue-500 text-white absolute right-[-10px] top-[-10px] rounded-full size-6 flex justify-center items-center">0</div></button>
                </span>
            </div>
        </header>
    )
}