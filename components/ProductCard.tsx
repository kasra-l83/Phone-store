import Image from 'next/image'
import { FaRegHeart } from "react-icons/fa6";
import { formatPrice } from "../utils/global";
import Link from "next/link";

export const ProductCard: React.FC<any>= ({image, name, price, id}) =>{
  return (
    <Link className="h-72 w-60 rounded-lg relative" href={`products/${id}`}>
      <div className='absolute size-9 rounded-full border-2 border-blue-500 left-5 top-5 bg-blue-200 z-10 flex justify-center items-center text-xl text-blue-500'><FaRegHeart /></div>
      <div className="h-[80%] bg-blue-200 rounded-t-lg flex justify-center items-center"><Image src={`http://localhost:8000/images/products/images/${image}`} alt={name} width={160} height={160}/></div>
      <div className="h-[20%] bg-blue-600 text-white px-2 py-1 rounded-b-lg">
        <h4>{name}</h4>
        <p className="text-left">{formatPrice(price)} تومان</p>
      </div>
    </Link>
  )
}