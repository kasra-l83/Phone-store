import { fetchProductList } from '@/apis/products.api';
import { CategoryCard } from '@/components/CategotyCard';
import { ProductCard } from '@/components/ProductCard';
import Slider from '@/components/slider';
import { IProduct } from '@/types/product';
import { GoChevronLeft } from "react-icons/go";

const Home= async() =>{
  const products= await fetchProductList(1, 0);
  
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
          {products.data?.products.filter((product: IProduct)=>{
            if(product.category==="67594a60c44cc15973d2b4b6"){
              return true
            }
            return false;
          }).slice(0, 6).map((product: IProduct) =>(
            <ProductCard key={product._id} id={product._id} image={product.images} name={product.name} price={product.price} quantity={product.quantity}/>
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
          {products.data?.products.filter((product: IProduct)=>{
            if(product.category==="67594a73c44cc15973d2b4ba"){
              return true
            }
            return false;
          }).slice(0, 6).map((product: IProduct) =>(
            <ProductCard key={product._id} id={product._id} image={product.images} name={product.name} price={product.price} quantity={product.quantity}/>
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
          {products.data?.products.filter((product: IProduct)=>{
            if(product.quantity===0){
              return true
            }
            return false;
          }).slice(0, 6).map((product: IProduct) =>(
            <ProductCard key={product._id} id={product._id} image={product.images} name={product.name} price={product.price} quantity={product.quantity}/>
          ))}
        </div>
      </section>
    </div>
  )
}
export default Home;