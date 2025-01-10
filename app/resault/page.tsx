"use client"

import { useSearchParams } from 'next/navigation';
import Image from 'next/image'

export default function Result() {
  const searchParams= useSearchParams();
  const status= searchParams.get("status");

  return (
    <section className='flex justify-center'>
      {status=== "success" ? (
        <Image src="/img/success.webp" alt='' width={500} height={300}/>
      ): <Image src="/img/error.jpg" alt='' width={500} height={300}/>}
    </section>
  )
}