import Image from "next/image";

export default function Contact() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <Image src="/img/category/apple.webp" alt="Apple" width={550} height={245} className="rounded-lg cursor-pointer"/>
      <Image src="/img/category/samsung.webp" alt="Samsung" width={550} height={245} className="rounded-lg cursor-pointer"/>
      <Image src="/img/category/xiaomi.webp" alt="Xiaomi" width={550} height={245} className="rounded-lg cursor-pointer"/>
      <Image src="/img/category/nokia.webp" alt="Nokia" width={550} height={245} className="rounded-lg cursor-pointer"/>
      <div className="grid grid-cols-2 gap-x-3">
        <Image src="/img/category/huawei.webp" alt="Huawie" width={299} height={224} className="rounded-lg cursor-pointer"/>
        <Image src="/img/category/oneplus.webp" alt="Oneplus" width={299} height={224} className="rounded-lg cursor-pointer"/>
      </div>
      <div className="grid grid-cols-2 gap-x-3">
        <Image src="/img/category/gplus.webp" alt="Gplus" width={299} height={224} className="rounded-lg cursor-pointer"/>
        <Image src="/img/category/honor.webp" alt="Honor" width={299} height={224} className="rounded-lg cursor-pointer"/>
      </div>
      <div className="grid grid-cols-2 gap-x-3">
        <Image src="/img/category/motorola.webp" alt="Motorola" width={299} height={224} className="rounded-lg cursor-pointer"/>
        <Image src="/img/category/glx.webp" alt="Glx" width={299} height={224} className="rounded-lg cursor-pointer"/>
      </div>
      <div className="grid grid-cols-2 gap-x-3">
        <Image src="/img/category/cat.webp" alt="Cat" width={299} height={224} className="rounded-lg cursor-pointer"/>
        <Image src="/img/category/vivo.webp" alt="Vivo" width={299} height={224} className="rounded-lg cursor-pointer"/>
      </div>
    </section>
  )
}