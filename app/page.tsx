"use client"

import { fetchProductList } from '@/apis/products.api';
import { CategoryCard } from '@/components/CategotyCard';
import { ProductCard, ProductCardSkeleton } from '@/components/ProductCard';
import Slider from '@/components/slider';
import { IProduct } from '@/types/product';
import { Suspense } from 'react';
import { GoChevronLeft } from "react-icons/go";
import { useQuery } from 'react-query';

const HomeSkeleton= () =>{
  return (
    <div className='flex justify-between gap-y-5 flex-wrap'>
      {[1,2,3,4,5].map((el) =>(
        <ProductCardSkeleton key={el}/>
      ))}
    </div>
  )
}
export default function Home() {
  const products= useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProductList(1, products.data?.total)
  })
  
  return (
    <div className='flex flex-col gap-y-5'>
      <Slider/>
      <section className='mb-10 flex flex-col gap-y-3 border pt-5'>
        <span className='flex justify-between px-5'>
          <h3 className='text-xl font-bold border-b-2 pb-3 border-b-blue-500'>آیفون ها</h3>
          <span className='flex gap-x-1 items-center'>
            <button className='text-base text-blue-500 hover:text-blue-700 font-normal'>مشاهده همه</button>
            <GoChevronLeft className='text-blue-500 text-xl hover:text-blue-700'/>
          </span>
        </span>
        <div className='flex justify-center sm:justify-between gap-5 flex-wrap'>
          {products.data?.data.products.filter((product: any)=>{
            if(product.category==="67594a60c44cc15973d2b4b6"){
              return true
            }
            return false;
          }).slice(0, 6).map((product: IProduct, index: number) =>(
            <Suspense fallback={<HomeSkeleton/>} key={index}>
              <ProductCard id={product._id} image={product.images[0]} name={product.name} price={product.price} quantity={product.quantity}/>
            </Suspense>
          ))}
        </div>
      </section>
      <section className='mb-10 flex flex-col gap-y-3 border pt-5'>
        <span className='flex justify-between px-5'>
          <h3 className='text-xl font-bold border-b-2 pb-3 border-b-blue-500'>شیاومی ها</h3>
          <span className='flex gap-x-1 items-center'>
            <button className='text-base text-blue-500 hover:text-blue-700 font-normal'>مشاهده همه</button>
            <GoChevronLeft className='text-blue-500 text-xl hover:text-blue-700'/>
          </span>
        </span>
        <div className='flex justify-center sm:justify-between gap-5 flex-wrap'>
          {products.data?.data.products.filter((product: IProduct)=>{
            if(product.category==="67594a73c44cc15973d2b4ba"){
              return true
            }
            return false;
          }).slice(0, 6).map((product: IProduct, index: number) =>(
            <Suspense fallback={<HomeSkeleton/>} key={index}>
              <ProductCard id={product._id} image={product.images[0]} name={product.name} price={product.price} quantity={product.quantity}/>
            </Suspense>
          ))}
        </div>
      </section>
      <section className='flex justify-around flex-wrap gap-y-5'>
        <CategoryCard/>
        <div className="size-36 bg-gray-100 rounded-2xl flex flex-col items-center justify-center px-5 cursor-pointer">
          <p className='font-black text-xl'>...</p>
          <p className='text-sm'>Other Brands</p>
        </div>
      </section>
      <section className='mb-10 flex flex-col gap-y-3 border pt-5'>
        <span className='flex justify-between px-5'>
          <h3 className='text-xl font-bold border-b-2 pb-3 border-b-blue-500'>ناموجود ها</h3>
          <span className='flex gap-x-1 items-center'>
            <button className='text-base text-blue-500 hover:text-blue-700 font-normal'>مشاهده همه</button>
            <GoChevronLeft className='text-blue-500 text-xl hover:text-blue-700'/>
          </span>
        </span>
        <div className='flex justify-center sm:justify-start gap-5 flex-wrap'>
          {products.data?.data.products.filter((product: any)=>{
            if(product.quantity===0){
              return true
            }
            return false;
          }).slice(0, 6).map((product: IProduct, index: number) =>(
            <Suspense fallback={<HomeSkeleton/>} key={index}>
              <ProductCard id={product._id} image={product.images[0]} name={product.name} price={product.price} quantity={product.quantity}/>
            </Suspense>
          ))}
        </div>
      </section>
    </div>
  )
}