"use client"

import { IProduct } from "@/types/product";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

export default function Inventory() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [page, setPage]= useState<number>(1);
    const [pages, setPages]= useState<number>(1);
    const { push } = useRouter();

    const session= localStorage.getItem("token")
    if(!session){
        push("/")
    }

    const fetchInventory = async () => {
        const response = await fetch(`http://localhost:8000/api/products?page=${page}&limit=3`);
        const data = await response.json();
        setProducts(data.data.products);
        setPages(data.total_pages)
    }

    useEffect(() => {
        fetchInventory();
    }, [page]);

    const next= () =>{
        if(page< pages){
            setPage(page + 1)
        }
    }
    const before= () =>{
        if(page> 1){
            setPage(page - 1)
        }
    }

    return (
        <>
            <div className="mb-5 flex justify-between">
                <h2 className="sm:text-3xl text-base font-semibold">مدیریت موجودی و قیمت ها</h2>
                <span className="flex gap-x-2">
                    <button onClick={() => before()} className={`${page===1 ? "hidden" : ""} bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded`}>قبلی</button>
                    <button onClick={() => next()} className={`${page===pages ? "hidden" : ""} bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded`}>بعدی</button>
                </span>
            </div>
            <table className="border-2 border-black max-w-[1000px] w-full mx-auto text-right">
                <thead className="bg-gray-400 text-white">
                    <tr>
                        <th className="border-l-2 border-black pr-2">کالا</th>
                        <th className="border-l-2 border-black pr-2">قیمت</th>
                        <th className="pr-2">موجودی</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) =>(
                        <tr key={index} className={`${index % 2 !== 0 ? "bg-gray-200" : ""} my-5`}>
                            <th className="border-l-2 border-black pr-2">{product.name}</th>
                            <th className="border-l-2 border-black pr-2">{product.price}</th>
                            <th className="pr-2">{product.quantity}</th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}