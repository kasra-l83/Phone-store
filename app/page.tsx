"use client"

import { fetchAllList } from '@/apis/products.api';
import { ProductCard } from '@/components/ProductCard';
import { IProduct } from '@/types/product';
import Image from 'next/image'
import { GoChevronLeft } from "react-icons/go";
import { useQuery } from 'react-query';

export default function Home() {
  const products= useQuery({
    queryKey: ["products"],
    queryFn: () => fetchAllList(9)
  })
  
  return (
    <div className='flex flex-col gap-y-5'>
      <div className="flex justify-center">
        <Image src="/img/baner.png" alt='Baner' width={1224} height={540}/>
      </div>
      <section className='mb-10 flex flex-col gap-y-3'>
        <span className='flex justify-between'>
          <h3 className='text-3xl font-bold'>آیفون</h3>
          <span className='flex gap-x-1 items-center'>
            <button className='text-base text-blue-500 hover:text-blue-700 font-normal'>مشاهده همه</button>
            <GoChevronLeft className='text-blue-500 text-xl hover:text-blue-700'/>
          </span>
        </span>
        <hr />
        <div className='flex justify-between gap-y-5 flex-wrap'>
          {products.data?.data.products.filter((product: any)=>{
            if(product.category==="67594a60c44cc15973d2b4b6"){
              return true
            }
            return false;
          }).map((product: IProduct, index: number) =>(
            <ProductCard key={index} image={product.images[0]} name={product.name} price={product.price}/>
          ))}
        </div>
      </section>
      <section className='mb-10 flex flex-col gap-y-3'>
        <span className='flex justify-between'>
          <h3 className='text-3xl font-bold'>شیاومی</h3>
          <span className='flex gap-x-1 items-center'>
            <button className='text-base text-blue-500 hover:text-blue-700 font-normal'>مشاهده همه</button>
            <GoChevronLeft className='text-blue-500 text-xl hover:text-blue-700'/>
          </span>
        </span>
        <hr />
        <div className='flex justify-between gap-y-5 flex-wrap'>
          {products.data?.data.products.filter((product: any)=>{
            if(product.category==="67594a73c44cc15973d2b4ba"){
              return true
            }
            return false;
          }).map((product: IProduct, index: number) =>(
            <ProductCard key={index} image={product.images[0]} name={product.name} price={product.price}/>
          ))}
        </div>
      </section>
    </div>
  )
}