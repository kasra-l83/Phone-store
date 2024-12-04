"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { format } from "date-fns-jalali";

export default function Orders() {
    const [orders, setOrders] = useState<any>([]);
    const [users, setUsers] = useState<any>([]);
    const [page, setPage]= useState<number>(1);
    const [pages, setPages]= useState<number>(0);
    const session= localStorage.getItem("token")
    const { push } = useRouter();
    if(!session){
        push("/")
    }
    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch(`http://localhost:8000/api/orders?page=${page}&limit=3`);
            const data = await response.json();
            setOrders(data.data.orders);
            setPages(data.total_pages)
            console.log(data.data.orders);
        }
        const fetchUsers = async () => {
            const response = await fetch('http://localhost:8000/api/users', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            const data = await response.json();
            setUsers(data.data.users);
            console.log(data.data.users);
        }

        fetchUsers()
        fetchOrders();
    }, [page]);
    const getUserNameById = (userId: string) => {
        const user = users.find(user => user._id === userId);
        return user ? `${user.firstname} ${user.lastname}` : '';
    }
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
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-3xl sm:text-4xl mb-5">مدیریت سفارش ها</h1>
                <span className="flex gap-x-2">
                    <button onClick={() => before()} className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">قبلی</button>
                    <button onClick={() => next()} className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">بعدی</button>
                </span>
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
                    {orders.map((order, index: any) =>(
                        <tr key={index} className={`${index % 2 !== 0 ? "bg-gray-200" : ""}`}>
                            <td className="border-l-2 border-black pr-2">{getUserNameById(order.user)}</td>
                            <td className="border-l-2 border-black pr-2">{order.totalPrice}</td>
                            <td className="border-l-2 border-black text-center">{format(order.createdAt, "dd/MM/yyyy")}</td>
                            <td className="text-blue-500 hover:text-blue-700 text-center"><button>بررسی سفارش ها</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}