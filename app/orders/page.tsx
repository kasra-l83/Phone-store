"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

export default function Orders() {
    const [orders, setOrders] = useState([]);
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

        fetchOrders();
    }, []);
    return (
        <>
            <h1>پنل ادمین</h1>
            <ul>
                {orders.map(order =>(
                    <div key={order._id} className="flex gap-x-5">
                        <li>{order.user}</li>
                        <li>{order.totalPrice}</li>
                        <li>{order.createdAt}</li>
                    </div>
                ))}
            </ul>
        </>
    )
}