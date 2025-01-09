"use client"

import { useAppDispatch } from "@/redux/hook";
import { useSelector } from "react-redux";
import { decreaseQuantity, increaseQuantity, removeTodo } from "@/redux/cartSlice";
import Image from 'next/image'
import { formatPrice } from "@/utils/global";
import { FaTrashCan } from "react-icons/fa6";
import { ITodo } from "@/types/todo";

export default function Cart() {
  const list= useSelector((state) =>state.cart.list);
  const dispatch= useAppDispatch();
  const totalPrice= list.reduce((el: number, product: ITodo) => el + (product.price * product.quantity), 0);
  const totalQuantity= list.reduce((el: number, product: ITodo) => el + product.quantity, 0);

  const deleteHandler= (name) =>{
    dispatch(removeTodo(name))
  }
  const increaseHandler = (name) => {
    dispatch(increaseQuantity(name));
  }
  const decreaseHandler = (name) => {
    dispatch(decreaseQuantity(name));
  }

  return (
    <section className={`${list.length> 0 ? "" : "flex justify-center"}`}>
      {list.length<= 0 && (
        <div className="w-[916px] h-80 py-6 border rounded-lg flex flex-col gap-y-3 items-center justify-center">
          <Image src="/icon/empty.svg" alt="Empty" width={160} height={160}/>
          <h4 className="text-2xl font-extrabold">سبد خرید شما خالی است!</h4>
          <p className="text-base font-extralight">می‌توانید برای مشاهده محصولات بیشتر به صفحات زیر بروید:</p>
        </div>
      )}
      {list.length> 0 && (
        <section className="min-h-80">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-[500px] sm:w-full text-gray-500 text-right">
              <thead className="text-gray-700 bg-gray-50">
                <tr>
                  <th className="px-16 py-3">تصویر</th>
                  <th className="px-6 py-3">نام کالا</th>
                  <th className="px-6 py-3">قیمت</th>
                  <th className="px-6 py-3">تعداد</th>
                </tr>
              </thead>
              {list.map((product, index: number) =>(
                <tbody key={index}>
                  <tr className={`${index % 2 !== 0 ? "bg-gray-200" : ""}`}>
                    <th><Image src={`http://localhost:8000/images/products/images/${product.image}`} alt={product.name} width={160} height={160}/></th>
                    <th className="px-6 py-4 text-gray-900 text-nowrap">{product.name}</th>
                    <th className="px-6 py-4 text-gray-900">{formatPrice(product.price)} تومان</th>
                    <th className="px-6 py-4 text-gray-900">
                      <span className="text-blue-500 border rounded-lg py-2 px-1">
                        <button disabled={product.all<= product.quantity} onClick={() => increaseHandler(product.name)} className="hover:text-blue-700 pl-5 text-2xl disabled:text-gray-200">+</button>
                        {product.quantity}
                        <button onClick={() => decreaseHandler(product.name)} className={`hover:text-blue-700 pr-5 text-2xl ${product.quantity> 1 ? "" : "hidden"}`}>-</button>
                        <button onClick={() => deleteHandler(product.name)} className={`text-red-500 hover:text-red-700 pr-5 ${product.quantity> 1 ? "hidden" : ""}`}><FaTrashCan/></button>
                      </span>
                    </th>
                  </tr>
                </tbody>
              ))}                
            </table>
          </div>
          <span className="flex justify-between mt-5 px-5">
            <div>
              <p>تعداد کل محصولات: {totalQuantity}</p>
              <p>مجموع قیمت: {formatPrice(totalPrice)} تومان</p>
            </div>
            <button className="py-1 px-2 bg-blue-500 text-white rounded hover:bg-blue-700">نهایی کردن سبد خرید</button>
          </span>
        </section>
      )}
    </section>
  )
}