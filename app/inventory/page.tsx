"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

export default function Orders() {
    const [products, setProducts] = useState([]);
    const session= localStorage.getItem("token")
    const { push } = useRouter();
    if(!session){
        push("/")
    }
    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch('http://localhost:8000/api/products');
            const data = await response.json();
            setProducts(data.data.products);
            console.log(data.data.products);
        }

        fetchOrders();
    }, []);
    return (
        <>
            <h2 className="sm:text-3xl text-2xl font-semibold mb-5">مدیریت موجودی و قیمت ها</h2>
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