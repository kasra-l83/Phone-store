"use client"

import { fetchCategoryList, fetchSubCategoryList } from "@/apis/products.api"
import { ICategory, ISubCategory } from "@/types/product"
import { useQuery } from "react-query"
import Link from "next/link";

export default function SideBar() {
    const categories= useQuery({
        queryKey: ["categories"],
        queryFn: () => fetchCategoryList()
    })
    const subCategories= useQuery({
        queryKey: ["subcategories"],
        queryFn: () => fetchSubCategoryList()
    })
      
    return (
        <div className="overflow-y-scroll max-h-96 py-2">
            {categories.data?.map((category: ICategory, index: number) => (
                <div key={index}>
                    <h3 className="text-lg font-semibold pr-2">{category.name}</h3>
                    {subCategories.data?.filter((subCategory: ISubCategory) => subCategory.category === category._id).map((subCategory: any, subIndex: number) => (
                        <Link href={`category/${subCategory._id}`} key={subIndex}>
                            <p className="text-sm font-normal text-gray-400 hover:text-gray-600 pr-5 my-1">{subCategory.name}</p>
                        </Link>
                    ))}
                </div>
            ))}
        </div>
    )
}