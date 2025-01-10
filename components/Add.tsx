"use client"

import { useAppDispatch } from "../redux/hook";
import { addToCartApi, removeFromCartApi } from "@/redux/thunks";
import { useState } from "react";
import Cookies from "js-cookie";
import { getGuestCart, saveGuestCart } from "@/redux/guestSlice";
import { ITodo } from "@/types/todo";
import { setGuestCart } from "@/redux/cartSlice";

export const AddCart: React.FC<any>= ({quantity, name, price, image, id}) =>{
  const [add, setAdd]= useState<boolean>(false);
  const dispatch= useAppDispatch();
  const userId = Cookies.get("userId");
  console.log(userId);

  const toggleButton= () =>{
    if(add=== false){
      if(userId){
        dispatch(addToCartApi({
          userId,
          item: {
            id: id,
            name: name,
            price: price,
            quantity: 1,
            image: image,
            stock: quantity
          }
        }))
      }else {
        const guestCart = getGuestCart();
        guestCart.push({
          id: id,
          name: name,
          price: price,
          quantity: 1,
          image: image,
          stock: quantity
        })
        saveGuestCart(guestCart);
      }
    }else {
      if(userId){
        dispatch(removeFromCartApi({userId: userId, productId: id}));
      }else {
        const guestCart = getGuestCart();
        const updatedCart = guestCart.filter((product:ITodo) => product.id !== id);
        saveGuestCart(updatedCart);
        dispatch(setGuestCart(updatedCart))
      }
    }
    setAdd(!add);
  }
  
  return (
    <button onClick={toggleButton} disabled={quantity <= 0} 
      className="py-2 text-sm font-bold text-white rounded-lg bg-blue-500 hover:bg-blue-700 disabled:bg-gray-300"
    >
      افزودن به سبد
    </button>
  )
}