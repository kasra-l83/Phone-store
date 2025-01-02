import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import Image from 'next/image';

export default function NotFound() {
  return (
    <section className="flex flex-col items-center gap-y-7">
      <h2 className="font-medium text-xl">صفحه‌ای که دنبال آن بودید پیدا نشد!</h2>
      <Link href="/">
        <button className="text-blue-500 text-sm font-bold hover:text-blue-700 flex items-center gap-x-2">صفحه اصلی <FaChevronLeft/></button>
      </Link>
      <Image src="/./img/not-found.webp" alt="Not Found" width={571} height={260}/>
    </section>
  )
}
