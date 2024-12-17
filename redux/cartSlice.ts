import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface TodoListState{
  list: any[]
}
export const initialState= {
  list: []
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: 0
  },
  reducers: {
    addTodo: (state) =>{
      // state.list.push({ title: action.payload});
      state.value+= 1
    },
    removeTodo: (state) =>{
      // state.list= state.list.filter((el: any) => el.title !== action.payload);
      state.value-= 1
    },
    clearTodo: (state) =>{
      // state.list= []
      state.value= 0
    }
  }
})
export const todoReducer= cartSlice.reducer;
export const {addTodo, removeTodo, clearTodo}= cartSlice.actions;