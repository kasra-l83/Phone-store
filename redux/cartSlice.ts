import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const initialState= {
  list: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("cart")) || [] : []
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction) =>{
      state.list.push({ name: action.payload.name, price: action.payload.price, quantity: 1});
      localStorage.setItem("cart", JSON.stringify(state.list));
    },
    removeTodo: (state, action: PayloadAction) =>{
      state.list= state.list.filter((el) => el.name !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.list));
    },
    clearTodo: (state) =>{
      state.list= []
      localStorage.removeItem("cart")
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.list.find((el) => el.name === action.payload);
      if (item) {
        item.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state.list));
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.list.find((el) => el.name === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(state.list));
      }
    }
  }
})
export const todoReducer= cartSlice.reducer;
export const {addTodo, removeTodo, clearTodo, increaseQuantity, decreaseQuantity}= cartSlice.actions;