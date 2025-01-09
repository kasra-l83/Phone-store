import { fetchCategoryList, fetchSubCategoryList } from "@/apis/products.api";
import { ICategory, ISubCategory } from "@/types/product";
import Image from 'next/image';
import Link from "next/link";

const SideBar= async () =>{
    const categories= await fetchCategoryList();
    const subCategories= await fetchSubCategoryList();
      
    return (
        <div className="overflow-y-scroll max-h-96 py-2">
            {categories?.map((category: ICategory) => (
                <div key={category._id}>
                    <span className="flex items-center">
                        <Image src={`http://localhost:8000/images/categories/icons/${category.icon}`} alt={category.name} width={30} height={30}/>
                        <h3 className="text-lg font-semibold">{category.name}</h3>
                    </span>
                    {subCategories?.filter((subCategory: ISubCategory) => subCategory.category=== category._id).map((subCategory: ISubCategory) => (
                        <Link href={`/category/${subCategory._id}`} key={subCategory._id}>
                            <p className="text-sm font-normal text-gray-400 hover:text-gray-600 pr-5 my-1 cursor-pointer">{subCategory.name}</p>
                        </Link>
                    ))}
                </div>
            ))}
        </div>
    )
}
export default SideBar;