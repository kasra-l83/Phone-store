"use client"
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { format } from "date-fns-jalali";
import { useQuery } from "@tanstack/react-query";
import { fetchOrderList } from "@/apis/orders.api";
import { fetchUserList } from "@/apis/users.api";
import { IOrder } from "@/types/orders";
import { IUser } from "@/types/users";

export default function Orders() {
    const [filter, setFilter]= useState<'all' | 'delivered' | 'notDelivered'>('all');
    const [page, setPage]= useState<number>(1)
    const { push } = useRouter();

    const session= localStorage.getItem("token")
    if(!session){
        push("/")
    }
    const orders= useQuery({
        queryKey: ["orders", page],
        queryFn: () => fetchOrderList(page)
    })
    const users= useQuery({
        queryKey: ["users"],
        queryFn: () => fetchUserList()
    })

    const getUserById= (id: string) =>{
        const user= users.data?.find((user: IUser) => user._id=== id);
        return user ? `${user.firstname} ${user.lastname}` : '';
    }
    const next= () =>{
        if(page< orders.data.total_pages){
            setPage(page+ 1)
        }
    }
    const before= () =>{
        if(page> 1){
            setPage(page- 1)
        }
    }
    
    return (
        <section>
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-3xl sm:text-4xl mb-5">مدیریت سفارش ها</h1>
                <span className="flex gap-x-2">
                    <button onClick={before} className={`${page===1 ? "hidden" : ""} bg-blue-500 hover:bg-blue-700 text-white p-2 rounded`}>قبلی</button>
                    <button onClick={next} className={`${page===orders.data?.total_pages ? "hidden" : ""} bg-blue-500 hover:bg-blue-700 text-white p-2 rounded`}>بعدی</button>
                </span>
            </div>
            <div className="flex gap-x-4 mb-5">
                <label>
                    <input type="radio" value="all" checked={filter === 'all'} onChange={() => setFilter('all')}/>
                    همه سفارشات
                </label>
                <label>
                    <input type="radio" value="delivered" checked={filter === 'delivered'} onChange={() => setFilter('delivered')}/>
                    سفارشات تحویل شده
                </label>
                <label>
                    <input type="radio" value="notDelivered" checked={filter === 'notDelivered'} onChange={() => setFilter('notDelivered')}/>
                    سفارشات تحویل نشده
                </label>
            </div>
            <table className="text-right max-w-[1000px] w-full mx-auto border-2 border-black">
                <thead className="bg-gray-400 text-white">
                    <tr>
                        <td className="border-l-2 border-black pr-2">نام کاربر</td>
                        <td className="border-l-2 border-black pr-2">مجموع مبلغ</td>
                        <td className="border-l-2 border-black text-center">زمان ثبت سفارش</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {orders.data?.data.orders.filter((order: IOrder)=>{
                        if(filter=== 'delivered') return order.deliveryStatus=== true;
                        if(filter=== 'notDelivered') return order.deliveryStatus=== false;
                        return true;
                    }).map((order: IOrder, index: number) =>(
                        <tr key={index} className={`${index % 2 !== 0 ? "bg-gray-200" : ""}`}>
                            <td className="border-l-2 border-black pr-2">{getUserById(order.user)}</td>
                            <td className="border-l-2 border-black pr-2">{order.totalPrice}</td>
                            <td className="border-l-2 border-black text-center">{format(order.createdAt, "yyyy/MM/dd")}</td>
                            <td className="text-blue-500 hover:text-blue-700 text-center"><button>بررسی سفارش ها</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}