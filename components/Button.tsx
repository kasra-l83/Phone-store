"use client"

import { useAppDispatch } from "../redux/hook";
import { addTodo, removeTodo } from "../redux/cartSlice";
import { useState } from "react";

export const Button = ({quantity, name, price}) => {
  const [add, setAdd]= useState<boolean>(false);
  const dispatch= useAppDispatch();

  const toggleButton= () =>{
    if(add=== false){
      dispatch(addTodo({name, price}));
    }else {
      dispatch(removeTodo(name));
    }
    setAdd(!add);
  }
  return (
    <button onClick={toggleButton} disabled={quantity <= 0} className={`py-2 text-sm font-bold text-white rounded-lg w-60 ${quantity > 0 ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-300"}`}>
      افزودن به سبد
    </button>
  )
}