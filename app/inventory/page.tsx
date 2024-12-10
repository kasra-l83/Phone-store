"use client"

import { fetchProductList } from "@/apis/products.api";
import { IProduct } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Inventory() {
    const [page,setPage]= useState<number>(1)
    const { push }= useRouter();

    const session= localStorage.getItem("token")
    if(!session){
        push("/")
    }

    const products= useQuery({
        queryKey: ["products", page],
        queryFn: () => fetchProductList(page)
    })
    const next= () =>{
        if(page< products.data.total_pages){
            setPage(page+ 1)
        }
    }
    const before= () =>{
        if(page> 1){
            setPage(page- 1)
        }
    }

    return (
        <>
            <div className="mb-5 flex justify-between">
                <h2 className="sm:text-3xl text-base font-semibold">مدیریت موجودی و قیمت ها</h2>
                <span className="flex gap-x-2">
                    <button onClick={before} className={`${page===1 ? "hidden" : ""} bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded`}>قبلی</button>
                    <button onClick={next} className={`${page===products.data?.total_pages ? "hidden" : ""} bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded`}>بعدی</button>
                </span>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="sm:w-full w-[500px] text-gray-500 text-right">
                    <thead className="text-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3 bg-gray-50 ">کالا</th>
                            <th scope="col" className="px-6 py-3">قیمت</th>
                            <th scope="col" className="px-6 py-3 bg-gray-50 ">موجودی</th>
                        </tr>
                    </thead>
                    <tbody>
                    {products.data?.data.products.map((product, index) =>(
                        <tr key={index} className="border-b border-gray-200">
                            <th className="px-6 py-4 whitespace-nowrap bg-gray-50">{product.name}</th>
                            <th className="px-6 py-4">{product.price}</th>
                            <th className="px-6 py-4 bg-gray-50">{product.quantity}</th>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}