"use client"

import { ICategory } from "@/types/product";
import { IProduct } from "@/types/product";
import { ISubCategory } from "@/types/product";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import Image from 'next/image'
import { useQuery } from "@tanstack/react-query";
import { fetchCategoryList, fetchProductList, fetchSubCategoryList } from "@/apis/products.api";

export default function Orders() {
    const [page, setPage]= useState<number>(1);
    const { push } = useRouter();

    const session= localStorage.getItem("token")
    if(!session){
        push("/")
    }

    const products= useQuery({
        queryKey: ["products", page],
        queryFn: () => fetchProductList(page)
    })
    const categories= useQuery({
        queryKey: ["category"],
        queryFn: () => fetchCategoryList()
    })
    const subCategories= useQuery({
        queryKey: ["subCategory"],
        queryFn: () => fetchSubCategoryList()
    })

    const next= () =>{
        if(page< products.data?.total_pages){
            setPage(page + 1)
        }
    }
    const before= () =>{
        if(page> 1){
            setPage(page - 1)
        }
    }
    const getCategoryById= (id: string) =>{
        const category= categories.data?.find((category: ICategory) => category._id=== id);
        return category ? `${category.name}` : "";
    }
    const getSubCategoryById= (id: string) =>{
        const subCategory= subCategories.data?.find((subCategory: ISubCategory) => subCategory._id=== id);
        return subCategory ? `${subCategory.name}` : "";
    }

    return (
        <>
            <div className="mb-5 flex justify-between">
                <h2 className="sm:text-3xl text-base font-semibold">مدیریت کالا ها</h2>
                <span className="flex gap-x-2">
                    <button className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded">افزودن کالا</button>
                    <button onClick={before} className={`${page===1 ? "hidden" : ""} bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded`}>قبلی</button>
                    <button onClick={next} className={`${page===products.data?.total_pages ? "hidden" : ""} bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded`}>بعدی</button>
                </span>
            </div>
            <table className="border-2 border-black max-w-[1000px] w-full mx-auto text-right">
                <thead className="bg-gray-400 text-white">
                    <tr>
                        <th className="border-l-2 border-black pr-2">تصاویر</th>
                        <th className="border-l-2 border-black pr-2">نام کالا</th>
                        <th className="border-l-2 border-black pr-2">دسته بندی</th>
                        <th className="pr-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {products.data?.data.products.map((product: IProduct, index: number) =>(
                        <tr key={index} className={`${index % 2 !== 0 ? "bg-gray-200" : ""}`}>
                            <th className="border-l-2 border-black pr-2"><Image src={`http://localhost:8000/images/products/images/${product.images[0]}`} alt={product.name} width={80} height={80}/></th>
                            <th className="border-l-2 border-black pr-2">{product.name}</th>
                            <th className="border-l-2 border-black pr-2">{getCategoryById(product.category)} / {getSubCategoryById(product.subcategory)}</th>
                            <th className="pr-2 flex flex-wrap gap-4 justify-center items-center h-20">
                                <button className="text-blue-500 hover:text-blue-700">ویرایش</button>
                                <button className="text-red-500 hover:text-red-700">حذف</button>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}