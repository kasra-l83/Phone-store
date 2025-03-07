"use client"

import Image from 'next/image'
import { IoIosArrowUp } from "react-icons/io";

export default function Footer() {
    const scrollToTop= () =>{
        window.scrollTo({
            top: 0
        })
    }

    return (
        <footer className='pt-5 border-t-2 mt-5'>
            <span className='flex justify-between items-center mb-1 px-5'>
                <span className="flex items-center gap-x-2">
                    <Image src="/icon/logo.png" alt='Logo' width={40} height={40}/>
                    <h2 className="text-2xl text-blue-900 font-semibold">
                        PLAY<span className="text-yellow-700">MEDA</span>
                    </h2>
                </span>
                <button onClick={scrollToTop} className='text-gray-400 text-sm font-semibold px-2 border-2 hidden sm:flex gap-x-2 items-center rounded-lg h-10 hover:text-gray-500 hover:border-gray-500'>
                    بازگشت به بالا<IoIosArrowUp/>
                </button>
            </span>
            <span className='flex mb-10 px-5'>
                <p className='text-sm pl-3'>تلفن پشتیبانی ۶۱۹۳۰۰۰۰ - ۰۲۱</p>
                <p className='text-sm border-x-2 px-3'>۰۲۱-۹۱۰۰۰۱۰۰</p>
                <p className='text-sm pr-3'>۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم</p>
            </span>
            <span className='flex justify-around flex-wrap gap-3 mb-10 px-5'>
                <div className='flex flex-col items-center'>
                    <Image src="/icon/express.svg" alt='Express' width={56} height={56}/>
                    <h6 className='text-sm'>امکان تحویل اکپرس</h6>
                </div>
                <div className='flex flex-col items-center'>
                    <Image src="/icon/cash.svg" alt='Cash' width={56} height={56}/>
                    <h6 className='text-sm'>امکان پرداخت در محل</h6>
                </div>
                <div className='flex flex-col items-center'>
                    <Image src="/icon/support.svg" alt='Support' width={56} height={56}/>
                    <h6 className='text-sm'>7 روز هفته، 24 ساعت</h6>
                </div>
                <div className='flex flex-col items-center'>
                    <Image src="/icon/return.svg" alt='Return' width={56} height={56}/>
                    <h6 className='text-sm'>هفت روز ضمانت بازگشت کالا</h6>
                </div>
                <div className='flex flex-col items-center'>
                    <Image src="/icon/original.svg" alt='Original' width={56} height={56}/>
                    <h6 className='text-sm'>ضمانت اصل بودن کالا</h6>
                </div>
            </span>
            <div className='text-white bg-black text-sm text-center p-3'>
                <p>برای استفاده از مطالب وب‌سايت، داشتن «هدف غیرتجاری» و ذکر «منبع» کافیست. تمام حقوق اين وب‌سايت نیز برای کسری لطیفی است.</p>
            </div>
        </footer>
    )
}