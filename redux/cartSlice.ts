import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface TodoListState{
  list: any[]
}
export const initialState: TodoListState= {
  list: [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) =>{
      state.list.push({ title: action.payload});
    },
    removeTodo: (state, action: PayloadAction<string>) =>{
      state.list= state.list.filter((el: any) => el.title !== action.payload);
    },
    clearTodo: (state) =>{
      state.list= []
    }
  }
})
export const todoReducer= cartSlice.reducer;
export const {addTodo, removeTodo, clearTodo}= cartSlice.actions;