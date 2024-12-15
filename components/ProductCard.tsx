import Image from 'next/image'
import { formatPrice } from "../utils/global";
import { TfiTruck } from "react-icons/tfi";
import { FaStar } from "react-icons/fa6";
import Link from "next/link";

export const ProductCardSkeleton: React.FC= () =>{
  return (
    <div className="h-72 w-60 rounded-lg bg-gray-300">
      <div className="h-[80%] rounded-t-lg flex justify-center items-center"><div className='size-[160px] bg-gray-500'></div></div>
      <div className="h-[20%] px-2 py-1 rounded-b-lg">
        <div className='w-5 h-2 bg-gray-500'></div>
        <div className='w-5 h-2 text-left bg-gray-500'></div>
      </div>
    </div>
  )
}
export const ProductCard: React.FC<any>= ({image, name, price, id, quantity}) =>{
  return (
    <Link className="h-96 hover:shadow-2xl w-[216px] px-3 flex flex-col gap-y-4 border-l" href={`products/${id}`}>
      <div className='flex justify-center'><Image src={`http://localhost:8000/images/products/images/${image}`} alt={name} width={160} height={160}/></div>
      <div className='gap-1 p-1 rounded-full items-center text-xs bg-gray-100 w-24 flex'>
        <TfiTruck className='text-blue-500 text-base'/>
        ارسال رایگان
      </div>
      <h4 className='line-clamp-1'>{name}</h4>
      <span className='flex justify-end items-center gap-x-2'>
        {
          price<=20000000 ? 1 :
          20000000< price && price<= 40000000 ? 3 :
          5
        }
        <FaStar className='text-orange-500'/>
      </span>
      <span className='flex justify-end gap-x-8 items-center'>
        <div className={`bg-blue-500 text-white inline-flex px-1 rounded-full ${price> 35000000 && quantity> 0 ? "" : "hidden"}`}>10%</div>
        <p className={`${quantity> 0 ? "" : "text-gray-300"}`}>
          {
            price> 35000000 && quantity> 0 ? `${formatPrice(price* 9/ 10)} تومان` :
            0< price && price<= 35000000 && quantity> 0 ? `${formatPrice(price)} تومان` :
            "ناموجود"
          }
        </p>
      </span>
      <p className={`line-through text-left text-base text-gray-300 ${price> 35000000 && quantity> 0 ? "" : "hidden"}`}>{formatPrice(price)}</p>
    </Link>
  )
}