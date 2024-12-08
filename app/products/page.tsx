"use client"

import { ICategory } from "@/types/category";
import { IProduct } from "@/types/product";
import { ISubCategory } from "@/types/subCategory";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import Image from 'next/image'

export default function Orders() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [page, setPage]= useState<number>(1);
    const [pages, setPages]= useState<number>(1);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);
    const { push } = useRouter();

    const session= localStorage.getItem("token")
    if(!session){
        push("/")
    }

    const fetchOrders = async () => {
        const response = await fetch(`http://localhost:8000/api/products?page=${page}&limit=3`);
        const data = await response.json();
        setProducts(data.data.products);
        setPages(data.total_pages)
    }
    const fetchCategory = async () => {
        const response = await fetch(`http://localhost:8000/api/categories`);
        const data = await response.json();
        setCategories(data.data.categories)
    }
    const fetchSubCategory = async () => {
        const response = await fetch(`http://localhost:8000/api/subcategories`);
        const data = await response.json();
        setSubCategories(data.data.subcategories)
    }

    useEffect(() => {
        fetchOrders();
        fetchCategory();
        fetchSubCategory();
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
    const getCategoryById = (id: string) => {
        const category = categories.find(category => category._id === id);
        return category ? `${category.name}` : '';
    }
    const getSubCategoryById = (id: string) => {
        const subCategory = subCategories.find(subCategory => subCategory._id === id);
        return subCategory ? `${subCategory.name}` : '';
    }

    return (
        <>
            <div className="mb-5 flex justify-between">
                <h2 className="sm:text-3xl text-base font-semibold">مدیریت کالا ها</h2>
                <span className="flex gap-x-2">
                    <button className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded">افزودن کالا</button>
                    <button onClick={() => before()} className={`${page===1 ? "hidden" : ""} bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded`}>قبلی</button>
                    <button onClick={() => next()} className={`${page===pages ? "hidden" : ""} bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded`}>بعدی</button>
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
                    {products.map((product, index) =>(
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