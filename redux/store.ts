import { configureStore } from '@reduxjs/toolkit';
import {todoReducer} from './cartSlice';

export type RootState= ReturnType<typeof store.getState>
export type AppDispatch= typeof store.dispatch

const store = configureStore({
    reducer: {
        cart: todoReducer
    }
})
export default store;