import { LoginForm } from "@/components/LoginForm";
import Image from 'next/image'

const LoginPage= () =>{
  return (
    <section className='max-w-[440px] h-[479px] mx-auto border border-blue-500 rounded-lg px-8 flex flex-col items-center justify-around'>
      <div className="flex items-center gap-x-2">
        <Image src="/icon/logo.png" alt='Logo' width={72} height={72}/>
        <h2 className="text-2xl text-blue-900 font-semibold">PLAY<span className="text-yellow-700">MEDA</span></h2>
      </div>
      <h4 className='text-2xl font-bold'>ورود ادمین</h4>
      <LoginForm/>
    </section>
  )
}
export default LoginPage;