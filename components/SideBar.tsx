"use client"

import { fetchCategoryList, fetchSubCategoryList } from "@/apis/products.api"
import { ICategory, ISubCategory } from "@/types/product"
import { useQuery } from "react-query"
import { useRouter } from "next/navigation";
import Image from 'next/image'

export default function SideBar() {
    const categories= useQuery({
        queryKey: ["categories"],
        queryFn: () => fetchCategoryList()
    })
    const subCategories= useQuery({
        queryKey: ["subcategories"],
        queryFn: () => fetchSubCategoryList()
    })
    const { push }= useRouter();
      
    return (
        <div className="overflow-y-scroll max-h-96 py-2">
            {categories.data?.map((category: ICategory, index: number) => (
                <div key={index}>
                    <span className="flex items-center">
                        <Image src={`http://localhost:8000/images/categories/icons/${category.icon}`} alt="" width={30} height={30}/>
                        <h3 className="text-lg font-semibold">{category.name}</h3>
                    </span>
                    {subCategories.data?.filter((subCategory: ISubCategory) => subCategory.category === category._id).map((subCategory: any, subIndex: number) => (
                        <p onClick={() => push(`/category/${subCategory._id}`)} key={subIndex} className="text-sm font-normal text-gray-400 hover:text-gray-600 pr-5 my-1 cursor-pointer">{subCategory.name}</p>
                    ))}
                </div>
            ))}
        </div>
    )
}