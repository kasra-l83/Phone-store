"use client"

import { ICategory } from "@/types/product";
import { IProduct } from "@/types/product";
import { ISubCategory } from "@/types/product";
import { useState } from 'react';
import Image from 'next/image'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCategoryList, fetchProductList, fetchSubCategoryList, deleteProduct } from "@/apis/products.api";
import useAuth from "@/hooks/auth";

export default function Orders() {
    useAuth();
    const [page, setPage]= useState<number>(1);
    const queryClient= useQueryClient();

    const products= useQuery({
        queryKey: ["products", page],
        queryFn: () => fetchProductList(page, 5)
    })
    const categories= useQuery({
        queryKey: ["category"],
        queryFn: () => fetchCategoryList()
    })
    const subCategories= useQuery({
        queryKey: ["subCategory"],
        queryFn: () => fetchSubCategoryList()
    })
    
    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteProduct(id),
        onSuccess: () =>{
            queryClient.invalidateQueries(["products", page]);
        }
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
        return category?.name
    }
    const getSubCategoryById= (id: string) =>{
        const subCategory= subCategories.data?.find((subCategory: ISubCategory) => subCategory._id=== id);
        return subCategory?.name
    }
    const deleteHandler = (id: string) => {
        deleteMutation.mutate(id);
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
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-[500px] sm:w-full text-gray-500 text-right">
                    <thead className="text-gray-700 bg-gray-50">
                        <tr>
                            <th className="px-16 py-3">تصویر</th>
                            <th className="px-6 py-3">نام کالا</th>
                            <th className="px-6 py-3">دسته بندی</th>
                            <th className="px-6 py-3">عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.data?.data.products.map((product: IProduct, index: number) =>(
                            <tr key={index} className={`${index % 2 !== 0 ? "bg-gray-200" : ""}`}>
                                <th className="p-4"><Image src={`http://localhost:8000/images/products/images/${product.images[0]}`} alt={product.name} width={190} height={252}/></th>
                                <th className="px-6 py-4 text-gray-900 text-nowrap">{product.name}</th>
                                <th className="px-6 py-4 text-gray-900">{getCategoryById(product.category)} / {getSubCategoryById(product.subcategory)}</th>
                                <th className="flex gap-4 px-6 py-4 text-gray-900 h-[160px]">
                                    <button className="text-blue-500 hover:text-blue-700">ویرایش</button>
                                    <button onClick={() => deleteHandler(product._id)} className="text-red-500 hover:text-red-700">حذف</button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}