"use client"

import { addTodo, removeTodo } from "@/redux/cartSlice";
import { useAppDispatch } from "@/redux/hook";
import { IProduct } from "@/types/product";
import { useState } from "react";
import { toast } from "react-toastify";

export const AddButton: React.FC<IProduct>= (product: IProduct) =>{
    const [add, setAdd]= useState<boolean>(false);
    const dispatch= useAppDispatch();

    const toggleButton= () =>{
        if(add=== false){
            dispatch(addTodo(product.name));
            toast.success("ok")
        }else {
            dispatch(removeTodo(product.name));
            toast.error("nok")
        }
    setAdd(!add);
    }

    return (
        <button disabled={product.quantity<= 0} className={`py-2 text-sm font-bold text-white rounded-lg w-60 ${product.quantity> 0 ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-300"}`}>افزودن به سبد</button>
    )
}