"use client"

import { fetchProductList } from "@/apis/products.api";
import { IProduct } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { formatPrice } from "@/utils/global";
import useAuth from "@/hooks/auth";

export default function Inventory() {
    useAuth();
    const [page,setPage]= useState<number>(1);

    const products= useQuery({
        queryKey: ["products", page],
        queryFn: () => fetchProductList(page, 5)
    })

    const next= () =>{
        if(page< products.data.total_pages){
            setPage(page+ 1)
        }
    }
    const prev= () =>{
        if(page> 1){
            setPage(page- 1)
        }
    }

    return (
        <>
            <div className="mb-5 flex justify-between">
                <h2 className="sm:text-3xl text-base font-semibold">مدیریت موجودی و قیمت ها</h2>
                <span className="flex gap-x-2">
                    <button onClick={prev} className={`${page===1 ? "hidden" : ""} bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded`}>قبلی</button>
                    <button onClick={next} className={`${page===products.data?.total_pages ? "hidden" : ""} bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded`}>بعدی</button>
                </span>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg min-h-[292px]">
                <table className="w-full text-right text-gray-500">
                    <thead className="text-gray-700">
                        <tr>
                            <th className="px-6 py-3 bg-gray-50">کالا</th>
                            <th className="px-6 py-3">قیمت</th>
                            <th className="px-6 py-3 bg-gray-50">موجودی</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.data?.data.products.map((product: IProduct, index: number) =>(
                            <tr key={index} className="border-b border-gray-200">
                                <td className="px-6 py-3 bg-gray-50">{product.name}</td>
                                <td className="px-6 py-3">{formatPrice(product.price)}</td>
                                <td className="px-6 py-3 bg-gray-50">{product.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}