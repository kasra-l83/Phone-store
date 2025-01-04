import { SignupForm } from '@/components/SignupForm';
import Image from 'next/image'
import Link from 'next/link';

const SignupPage= () =>{
  return (
    <section className='max-w-[440px] mx-auto border border-blue-500 rounded-lg px-8 py-4 flex flex-col items-center justify-around'>
      <div className="flex items-center gap-x-2">
        <Image src="/icon/logo.png" alt='Logo' width={72} height={72}/>
        <h2 className="text-2xl text-blue-900 font-semibold">PLAY<span className="text-yellow-700">MEDA</span></h2>
      </div>
      <h4 className='text-2xl font-bold'>ثبت نام</h4>
      <SignupForm/>
      <span className="flex gap-x-3">
        <p>عضو هستم.</p>
        <Link href="/login" className="text-blue-500 hover:text-blue-700 font-bold">ورود</Link>
      </span>
    </section>
  )
}
export default SignupPage;