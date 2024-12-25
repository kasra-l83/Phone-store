"use client"

import { useEffect, useState } from 'react';
import { format } from "date-fns-jalali";
import { useQuery } from "@tanstack/react-query";
import { fetchOrderList } from "@/apis/orders.api";
import { fetchUserList } from "@/apis/users.api";
import { IOrder } from "@/types/orders";
import { IUser } from "@/types/users";
import { formatPrice } from "@/utils/global";
import useAuth from '@/hooks/auth';

export default function Orders() {
    useAuth();
    const [filter, setFilter]= useState<'all' | 'delivered' | 'notDelivered'>('all');
    const [page, setPage]= useState<number>(1);

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
    const prev= () =>{
        if(page> 1){
            setPage(page- 1)
        }
    }
    
    return (
        <section>
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-3xl sm:text-4xl mb-5">مدیریت سفارش ها</h1>
                <span className="flex gap-x-2">
                    <button onClick={prev} className={`${page===1 ? "hidden" : ""} bg-blue-500 hover:bg-blue-700 text-white p-2 rounded`}>قبلی</button>
                    <button onClick={next} className={`${page===orders.data?.total_pages ? "hidden" : ""} bg-blue-500 hover:bg-blue-700 text-white p-2 rounded`}>بعدی</button>
                </span>
            </div>
            <div className="flex gap-x-4 mb-5">
                <label>
                    <input type="radio" checked={filter=== 'all'} onChange={() => setFilter('all')}/>
                    همه سفارشات
                </label>
                <label>
                    <input type="radio" checked={filter=== 'delivered'} onChange={() => setFilter('delivered')}/>
                    سفارشات تحویل شده
                </label>
                <label>
                    <input type="radio" checked={filter=== 'notDelivered'} onChange={() => setFilter('notDelivered')}/>
                    سفارشات تحویل نشده
                </label>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg min-h-[332px]">
                <table className="w-full text-right text-gray-500">
                    <thead className="text-gray-700">
                        <tr>
                            <th className="px-6 py-3 bg-gray-50">نام کاربر</th>
                            <th className="px-6 py-3">مجموع مبلغ</th>
                            <th className="px-6 py-3 bg-gray-50">زمان ثبت سفارش</th>
                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.data?.data.orders.filter((order: IOrder)=>{
                            if(filter=== 'delivered') return order.deliveryStatus=== true;
                            if(filter=== 'notDelivered') return order.deliveryStatus=== false;
                            return true;
                        }).map((orders: IOrder, index: number) =>(
                            <tr key={index} className="border-b border-gray-200">
                                <td className="px-6 py-4 bg-gray-50">{getUserById(orders.user)}</td>
                                <td className="px-6 py-4">{formatPrice(orders.totalPrice)}</td>
                                <td className="px-6 py-4 bg-gray-50">{format(orders.createdAt, "yyyy/MM/dd")}</td>
                                <td className="px-6 py-4 text-blue-500 hover:text-blue-700">
                                    <button>بررسی سفارش ها</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}