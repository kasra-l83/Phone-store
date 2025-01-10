import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { clearGuestCart, getGuestCart } from "./guestSlice";

export const fetchCart = createAsyncThunk(
  "basket/fetchCart",
  async (userId: string, { rejectWithValue }) => {
    try {
      const BASE_URL = "http://localhost:3000";
      const response = await axios.get(`${BASE_URL}/api/cart?userId=${userId}`);
      return response.data.products || [];
    } catch (error: any) {
      console.error("fetchCart error:", error.message);
      return rejectWithValue(error.message || "Error fetching cart");
    }
  }
)

export const addToCartApi = createAsyncThunk(
  "basket/addToCartApi",
  async (payload: { userId: string; item: ITodo }, { rejectWithValue }) => {
    try {
      const { userId, item } = payload;
      const BASE_URL = "http://localhost:3000";
      const response = await axios.post(`${BASE_URL}/api/cart`, {
        userId,
        product: item,
      })
      return response.data;
    } catch (error: any) {
      console.error("addToCartApi error:", error.message);
      return rejectWithValue(error.message || "Error adding to cart");
    }
  }
)

export const updateCartApi = createAsyncThunk(
  "basket/updateCartApi",
  async (
    payload: { userId?: string; productId: string; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      const { userId, productId, quantity } = payload;
      const BASE_URL = "http://localhost:3000";
      const response = await axios.put(`${BASE_URL}/api/cart`, {
        userId,
        productId,
        quantity,
      });
      return response.data;
    } catch (error: any) {
      console.error("updateCartApi error:", error.message);
      return rejectWithValue(error.message || "Error updating cart");
    }
  }
)

export const removeFromCartApi = createAsyncThunk(
  "basket/removeFromCartApi",
  async (
    payload: { userId: string; productId: string },
    { rejectWithValue }
  ) => {
    try {
      const { userId, productId } = payload;
      const BASE_URL = "http://localhost:3000";
      const response = await axios.delete(`${BASE_URL}/api/cart`, {
        data: { userId, productId },
      });
      return response.data;
    } catch (error: any) {
      console.error("removeFromCartApi error:", error.message);
      return rejectWithValue(error.message || "Error removing from cart");
    }
  }
);

export const clearCartApi = createAsyncThunk(
  "basket/clearCartApi",
  async (userId: string, { rejectWithValue }) => {
    try {
      const BASE_URL = "http://localhost:3000";
      const response = await axios.delete(`${BASE_URL}/api/cart/clear`, {
        data: { userId },
      });
      return response.data;
    } catch (error: any) {
      console.error("clearCartApi error:", error.message);
      return rejectWithValue(error.message || "Error clearing cart");
    }
  }
);

import { RootState } from "./store"; // فرض کنید RootState در فایل store تعریف شده است
import { ITodo } from "@/types/todo";

export const mergeGuestCartWithUserCart = createAsyncThunk(
  "basket/mergeGuestCartWithUserCart",
  async (
    payload: { userId: string },
    { getState, dispatch, rejectWithValue }
  ) => {
    try {
      const BASE_URL = "http://localhost:3000";
      const guestCart = getGuestCart();
      const state = getState() as RootState;
      const userCart = state.cart.list; // دریافت سبد کاربر

      const mergedCart: ITodo[] = [];

      const cartMap = new Map<string, ITodo>();

      userCart.forEach((item) => {
        cartMap.set(item.id, { ...item });
      })

      guestCart.forEach((guestItem: ITodo) => {
        if (cartMap.has(guestItem.id)) {
          const existingItem = cartMap.get(guestItem.id)!;
          existingItem.quantity += guestItem.quantity;
        } else {
          cartMap.set(guestItem.id, { ...guestItem });
        }
      });
      console.log("Cart Map after merging:", Array.from(cartMap.values()));
      mergedCart.push(...cartMap.values());
      await axios.post(`${BASE_URL}/api/cart/merge`, {
        userId: payload.userId,
        products: mergedCart,
      });
      dispatch(fetchCart(payload.userId));
      clearGuestCart();
    } catch (error: any) {
      console.error("Error merging guest cart with user cart:", error.message);
      return rejectWithValue(error.message || "Error merging carts");
    }
  }
)