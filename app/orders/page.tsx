"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { format } from "date-fns-jalali";
import { IOrders } from "@/types/orders";
import { IUsers } from "@/types/users";

export default function Orders() {
    const [orders, setOrders] = useState<IOrders[]>([]);
    const [users, setUsers] = useState<IUsers[]>([]);
    const [page, setPage]= useState<number>(1);
    const [pages, setPages]= useState<number>(1);
    const [filter, setFilter] = useState<'all' | 'delivered' | 'notDelivered'>('all');
    const { push } = useRouter();

    const session= localStorage.getItem("token")
    if(!session){
        push("/")
    }

    const fetchOrders = async () => {
        const response = await fetch(`http://localhost:8000/api/orders?page=${page}&limit=3`);
        const data = await response.json();
        setOrders(data.data.orders);
        setPages(data.total_pages)
    }
    const fetchUsers = async () => {
        const response = await fetch('http://localhost:8000/api/users', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        const data = await response.json();
        setUsers(data.data.users);
    }

    useEffect(() => {
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
        <section>
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-3xl sm:text-4xl mb-5">مدیریت سفارش ها</h1>
                <span className="flex gap-x-2">
                    <button onClick={() => before()} className={`bg-blue-500 hover:bg-blue-700 text-white p-2 rounded ${page===1 ? "hidden" : ""}`}>قبلی</button>
                    <button onClick={() => next()} className={`bg-blue-500 hover:bg-blue-700 text-white p-2 rounded ${page===pages ? "hidden" : ""}`}>بعدی</button>
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
                    {orders.filter(order=>{
                        if(filter === 'delivered') return order.deliveryStatus === true;
                        if(filter === 'notDelivered') return order.deliveryStatus === false;
                        return true;
                    }).map((order, index: any) =>(
                        <tr key={index} className={`${index % 2 !== 0 ? "bg-gray-200" : ""}`}>
                            <td className="border-l-2 border-black pr-2">{getUserNameById(order.user)}</td>
                            <td className="border-l-2 border-black pr-2">{order.totalPrice}</td>
                            <td className="border-l-2 border-black text-center">{format(order.createdAt, "dd/MM/yyyy")}</td>
                            <td className="text-blue-500 hover:text-blue-700 text-center"><button>بررسی سفارش ها</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}