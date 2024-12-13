"use client"

import { BiSolidPhoneCall } from "react-icons/bi";
import { FaLocationDot, FaTelegram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

export default function Footer() {
    const session= localStorage.getItem("token");

    return (
        <footer className="sm:grid md:grid-cols-3 gap-y-3 p-5">
            <div className={`border-l-2 flex flex-col gap-y-5 ${session? "hidden" : ""}`}>
                <span className="flex gap-x-2 text-3xl font-bold">
                    <FaLocationDot className="text-blue-500"/>
                    <h2>آدرس فروشگاه</h2>
                </span>
                <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
                <span className="flex gap-x-2 items-center mt-5 sm:hidden lg:flex">
                    <BiSolidPhoneCall className="text-2xl"/>
                    <h2>شماره تماس: 5874236-021</h2>
                </span>
            </div>
            <div className={`flex flex-col items-center gap-5 sm:gap-y-16 ${session? "hidden" : ""}`}>
                <h2 className="text-3xl font-bold">ما را دنبال کنید</h2>
                <span className="flex gap-x-3 text-4xl text-blue-500">
                    <FaYoutube className="cursor-pointer hover:text-blue-700"/>
                    <AiFillInstagram className="cursor-pointer hover:text-blue-700"/>
                    <FaTelegram className="cursor-pointer hover:text-blue-700"/>
                </span>
            </div>
            <img src="/img/louded.png" className={`h-52 w-full cursor-pointer ${session? "hidden" : "hidden md:block"}`}/>
        </footer>
    )
}