import { fetchProductById, fetchSubCategoryById } from "@/apis/products.api";
import { notFound } from "next/navigation";
import Image from 'next/image'
import { SiAdguard } from "react-icons/si";
import { formatPrice } from "@/utils/global";
import { FaChevronLeft } from "react-icons/fa";
import { TfiTruck } from "react-icons/tfi";
import { PiCoinVerticalFill } from "react-icons/pi";
import Link from "next/link";
import  ColorSelector  from "@/components/color";
import { AddCart } from "@/components/Add";

const ProductPage: React.FC<IPageParams<{ id: string }>>= async ({ params }) =>{
  const id= (await params).id;
  const product= await fetchProductById(id)
  const subCategory= await fetchSubCategoryById(product.subcategory._id);
  if(!id || !product) return notFound();

  return (
    <section className="lg:grid lg:grid-cols-4 space-y-4">
      <div className="flex justify-center">
        <Image src={`http://localhost:8000/images/products/images/${product.images}`} alt={product.name} width={500} height={500}/>
      </div>
      <div className="w-full pl-5 flex flex-col justify-between col-span-2 space-y-2 lg:space-y-0">
        <h4 className="text-sm text-blue-500 font-bold">{subCategory.category.name} / <Link href={`/category/${subCategory._id}`} className="hover:text-blue-700">{subCategory.name}</Link></h4>
        <h2 className="text-lg font-medium">گوشی موبایل {product.name}</h2>
        <ColorSelector/>
        <h4 className="text-base font-semibold">بیمه</h4>
        <div className="border rounded-lg h-16 w-full flex">
          <div className="w-[7%] border-l flex justify-center items-center">
            <input type="checkbox" className="size-4 cursor-pointer"/>
          </div>
          <div className="flex flex-col justify-around p-2 w-full">
            <p className="text-xs font-bold">بیمه تجهیزات دیجیتال - بیمه سامان</p>
            <span className="flex gap-x-1 items-center relative">
              <div className="rounded-full bg-blue-500 text-sm px-1 text-white">50%</div>
              <p className="line-through text-gray-300 text-sm">2,000,000</p>
              <p className="text-base">1,000,000 تومان</p>
              <button className="absolute left-0 text-sm font-bold text-blue-500 hover:text-blue-700 flex gap-x-1 items-center">جزییات<FaChevronLeft/></button>
            </span>
          </div>
        </div>
        <h4 className="text-base font-semibold">ویژگی ها</h4>
        <span className="flex text-sm gap-x-2">
          <div className="bg-gray-100 rounded-lg w-full p-2 font-bold">
            <p className="text-gray-400">برند</p>
            <p>{product.brand}</p>
          </div>
          <div className="bg-gray-100 rounded-lg w-full p-2 font-bold">
            <p className="text-gray-400">حجم حافظه</p>
            <p>64 گیگابایت</p>
          </div>
          <div className="bg-gray-100 rounded-lg w-full p-2 font-bold">
            <p className="text-gray-400 line-clamp-1">رزولوشن دوربین اصلی</p>
            <p>42 مگاپیکسل</p>
          </div>
        </span>
      </div>
      <div className="flex flex-col justify-around border bg-gray-100 px-4 rounded-lg space-y-2 lg:space-y-0">
        <h4 className="text-lg text-left font-semibold">{product.quantity > 0 ? `${formatPrice(product.price)} تومان` : "ناموجود"}</h4>
        <AddCart quantity={product.quantity} name={product.name} price={product.price}/>
        <h5 className="flex gap-x-3 items-center">
          <SiAdguard className="text-xl text-blue-500"/>
          گارانتی 18 ماهه
        </h5>
        <hr/>
        <h5 className="text-base flex gap-x-2 items-center">
          <TfiTruck className="text-xl text-blue-500"/>
          ارسال از 1 روز کاری دیگر
        </h5>
        <hr/>
        <h5 className="text-base flex gap-x-2">
          <PiCoinVerticalFill className="text-xl text-yellow-500"/>
          150 امتیاز از این خرید
        </h5>
      </div>
    </section>
  )
}
export default ProductPage;