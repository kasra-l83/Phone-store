import type { Metadata } from "next";
import { FaLocationDot } from "react-icons/fa6";
import Image from 'next/image'
import { GoClock } from "react-icons/go";
import { BiSolidPhoneCall } from "react-icons/bi";
import { PiNotePencil } from "react-icons/pi";
import { MassegeForm } from "@/components/Massege";

export const metadata: Metadata= {
  title: "تماس با ما"
}

export default function Contact() {
  return (
    <section className="flex flex-col items-center gap-y-5">
      <div className="flex items-center gap-x-5">
        <div className="w-16 h-14 bg-blue-300 rounded-2xl text-blue-500 hidden flex-col justify-center items-center sm:flex"><span className="text-black text-center bg-white w-12 rounded-2xl">تهران</span>شیراز</div>
        <Image src="/img/map.png" alt="Map" width={648} height={188}/>
      </div>
      <span className="flex gap-x-2 items-center text-3xl font-bold">
        <FaLocationDot className="text-blue-500"/>
        <h2>آدرس فروشگاه</h2>
      </span>
      <p className="text-lg text-center font-light max-w-[648px]">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
      <span className="flex gap-x-2 items-center text-3xl font-bold">
        <GoClock className="text-blue-500"/>
        <h2>ساعت خرید حضوری</h2>
      </span>
      <p className="text-lg text-center font-light max-w-[648px]">شنبه الی چهارشنبه 9:30 تا 18 - پنج‌شنبه 9:30 تا 13:30</p>
      <span className="flex gap-x-2 items-center text-3xl font-bold">
        <BiSolidPhoneCall className="text-blue-500"/>
        <h2>شماره تماس</h2>
      </span>
      <p className="text-lg text-center font-light max-w-[648px]">۰۲۱-۵۸۷۴۲۳۶ </p>
      <span className="flex gap-x-2 items-center text-3xl font-bold">
        <PiNotePencil className="text-blue-500"/>
        <h2>ارسال پیام</h2>
      </span>
      <MassegeForm/>
    </section>
  )
}