import { ITodo } from '@/types/todo';
import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  fetchCart,
  addToCartApi,
  updateCartApi,
  removeFromCartApi,
  clearCartApi,
} from "./thunks";

export const initialState= {
  list: [],
  loading: false,
  error: null
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setGuestCart: (state, action: PayloadAction<ITodo[]>) => {
      state.list = action.payload;
    },
    clearCart: (state) => {
      state.list = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.list = Array.isArray(action.payload) ? [...action.payload] : [];
      state.loading = false;
    });

    builder.addCase(fetchCart.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "خطا در دریافت سبد خرید";
    })

    builder.addCase(addToCartApi.fulfilled, (state, action) => {
      const newItem = action.meta.arg.item as ITodo;
      const existingItem = state.list.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.list.push(newItem);
      }
    });
    builder.addCase(addToCartApi.rejected, (state, action) => {
      state.error = (action.payload as string) || "خطا در افزودن به سبد خرید";
    })

    builder.addCase(updateCartApi.fulfilled, (state, action) => {
      const { productId, quantity } = action.meta.arg;
      const existingItem = state.list.find((item) => item.id === productId);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    })
    builder.addCase(updateCartApi.rejected, (state, action) => {
      state.error = (action.payload as string) || "خطا در بروزرسانی محصول";
    })

    builder.addCase(removeFromCartApi.fulfilled, (state, action) => {
      const { productId } = action.meta.arg;
      state.list = state.list.filter((item) => item.id !== productId);
    });
    builder.addCase(removeFromCartApi.rejected, (state, action) => {
      state.error =
        (action.payload as string) || "خطا در حذف محصول از سبد خرید";
    });
    builder.addCase(clearCartApi.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(clearCartApi.fulfilled, (state) => {
      state.list = [];
      state.loading = false;
    });
    builder.addCase(clearCartApi.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "خطا در پاک کردن سبد خرید";
    });
  }
})
export const todoReducer= cartSlice.reducer;
export const {setGuestCart, clearCart}= cartSlice.actions;