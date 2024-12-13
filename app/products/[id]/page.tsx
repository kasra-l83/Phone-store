import { fetchProductById, fetchSubCategoryById } from "@/apis/products.api";
import { notFound } from "next/navigation";
import Image from 'next/image'
import { SiAdguard } from "react-icons/si";
import { formatPrice } from "@/utils/global";

const BlogPage: React.FC<IPageParams<{ id: string }>> = async ({ params }) => {
  const id= (await params).id;
  const product= await fetchProductById(id)
  const subCategory= await fetchSubCategoryById(product.subcategory._id);
  if(!id || !product) return notFound();

  return (
    <section className="flex flex-col gap-10">
    <div className="flex flex-wrap justify-center sm:justify-between gap-y-3">
      <Image src={`http://localhost:8000/images/products/images/${product.images[0]}`} alt={product.name} width={250} height={250}/>
      <div className="flex flex-col justify-between">
        <h2 className="text-lg font-medium">گوشی موبایل {product.name}</h2>
        <h4 className="text-base text-gray-500">برند : {product.brand}</h4>
        <h4 className="text-base text-gray-500">مدل : {subCategory.name}</h4>
        <h4 className="text-base text-gray-500">حجم حافظه : 12 گیگابایت</h4>
        <h4 className="text-base text-gray-500">کیفیت دوربین : 42 مگاپیکسل</h4>
        <h4 className="text-base font-medium">موجودی محصول : <span className={product.quantity> 0 ? "text-blue-500" : "text-red-500"}>{product.quantity> 0 ? "موجود" : "ناموجود"}</span></h4>
      </div>
      <div className="flex flex-col gap-y-10">
        <span className="flex gap-x-3 items-center">
          <SiAdguard className="text-xl text-blue-500"/>
          گارانتی 36 ماهه
        </span>
        <hr />
        <h4 className="text-base text-blue-700 font-semibold flex justify-center">{formatPrice(product.price)} تومان</h4>
        <span className="flex gap-x-2 justify-center">
          <button className="border border-blue-500 rounded-full text-xl size-6 flex justify-center items-center">+</button>
          1
          <button className="border border-blue-500 rounded-full text-xl size-6 flex justify-center items-center">-</button>
        </span>
        <button disabled={product.quantity> 0} className="py-2 bg-blue-500 text-white rounded-lg w-60 hover:bg-blue-700">افزودن به سبد</button>
      </div>
    </div>
    <span className="flex justify-center flex-wrap gap-x-20">
      <span className="flex gap-x-2 items-center text-xs text-gray-500"><Image src="/icon/express.png" alt="Express" width={50} height={50}/>امکان تحویل اکسپرس</span>
      <span className="flex gap-x-2 items-center text-xs text-gray-500"><Image src="/icon/support.png" alt="Support" width={50} height={50}/>پشتیبانی ۲۴ ساعته</span>
      <span className="flex gap-x-2 items-center text-xs text-gray-500"><Image src="/icon/return.png" alt="Return" width={50} height={50}/>هفت روز ضمانت بازگشت کالا</span>
      <span className="flex gap-x-2 items-center text-xs text-gray-500"><Image src="/icon/original.png" alt="Original" width={50} height={50}/>ضمانت اصل بون کالا</span>
    </span>
    </section>
  )
}
export default BlogPage;