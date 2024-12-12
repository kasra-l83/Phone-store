"use client"


import { fetchProductList } from '@/apis/products.api';
import { ProductCard } from '@/components/ProductCard';
import { IProduct } from '@/types/product';
import { GoChevronLeft } from "react-icons/go";
import { useQuery } from 'react-query';

export default function Products() {
  const products= useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProductList(1, products.data?.total)
  })
  
  return (
    <div className='flex flex-col gap-y-5'>
      <section className='mb-10 flex flex-col gap-y-3'>
        <span className='flex justify-between'>
          <h3 className='text-3xl font-bold'>محصولات</h3>
          <span className='flex gap-x-1 items-center'>
            <button className='text-base text-blue-500 hover:text-blue-700 font-normal'>مشاهده همه</button>
            <GoChevronLeft className='text-blue-500 text-xl hover:text-blue-700'/>
          </span>
        </span>
        <hr />
        <div className='flex justify-between gap-y-5 flex-wrap'>
          {products.data?.data.products.map((product: IProduct, index: number) =>(
            <ProductCard key={index} image={product.images[0]} name={product.name} price={product.price}/>
          ))}
        </div>
      </section>
    </div>
  )
}