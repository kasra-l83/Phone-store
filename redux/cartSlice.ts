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
      state.list.push({ name: action.payload.name, price: action.payload.price, image: action.payload.image});
      localStorage.setItem("cart", JSON.stringify(state.list));
    },
    removeTodo: (state, action: PayloadAction) =>{
      state.list= state.list.filter((el) => el.name !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.list));
    },
    clearTodo: (state) =>{
      state.list= []
      localStorage.removeItem("cart")
    }
  }
})
export const todoReducer= cartSlice.reducer;
export const {addTodo, removeTodo, clearTodo}= cartSlice.actions;