import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex justify-center">
      <Image src="/img/baner.png" alt='Baner' width={1224} height={540}/>
    </div>
  )
}