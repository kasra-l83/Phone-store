"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import { useAppDispatch } from '@/redux/hook';
import { clearCartApi } from '@/redux/thunks';

export default function Pay() {
  const router = useRouter();
  const userId = Cookies.get("userId") as string;
  const dispatch= useAppDispatch();

  const handleSuccess = () => {
    dispatch(clearCartApi(userId))
    router.push("/resault?status=success")
  }

  const handleFailure = () => {
    router.push("/resault?status=failed")
  }

  return (
    <section className='flex justify-center relative'>
      <Image src="/img/pay.webp" alt='' width={1000} height={300}/>
      <button onClick={handleSuccess} className='bg-blue-500 hover:bg-blue-700 text-white px-16 py-1 rounded absolute bottom-11 right-[359px]'>پرداخت</button>
        <button onClick={handleFailure} className='bg-red-500 hover:bg-red-700 text-white px-12 py-1 rounded absolute bottom-11 right-[540px]'>انصراف</button>
    </section>
  )
}