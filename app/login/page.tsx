import { LoginForm } from "@/components/LoginForm";
import Image from 'next/image'
import Link from "next/link";

const LoginPage= () =>{
  return (
    <section className='max-w-[440px] h-[479px] mx-auto border border-blue-500 rounded-lg px-8 flex flex-col items-center justify-around'>
      <div className="flex items-center gap-x-2">
        <Image src="/icon/logo.png" alt='Logo' width={72} height={72}/>
        <h2 className="text-2xl text-blue-900 font-semibold">PLAY<span className="text-yellow-700">MEDA</span></h2>
      </div>
      <h4 className='text-2xl font-bold'>ورود کاربر</h4>
      <LoginForm/>
      <span className="flex gap-x-3">
        <p>هنوز عضو نشده اید؟</p>
        <Link href="/signup" className="text-blue-500 hover:text-blue-700 font-bold">ثبت نام</Link>
      </span>
    </section>
  )
}
export default LoginPage;