"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { format } from "date-fns-jalali";

export default function Orders() {
    const [orders, setOrders] = useState<any>([]);
    const [users, setUsers] = useState<any>([]);
    const session= localStorage.getItem("token")
    const { push } = useRouter();
    if(!session){
        push("/")
    }
    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch('http://localhost:8000/api/orders');
            const data = await response.json();
            setOrders(data.data.orders);
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
    }, []);
    const getUserNameById = (userId: string) => {
        const user = users.find(user => user._id === userId);
        return user ? `${user.firstname} ${user.lastname}` : '';
    }
    return (
        <>
            <h1 className="font-semibold text-3xl sm:text-4xl mb-5">مدیریت سفارش ها</h1>
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