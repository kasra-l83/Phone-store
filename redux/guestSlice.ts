import { ITodo } from "@/types/todo";

export const saveGuestCart = (cart: ITodo) => {
    localStorage.setItem("cart", JSON.stringify(cart));
}
  
export const getGuestCart = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
}
  
export const clearGuestCart = () => {
    localStorage.removeItem("cart");
}