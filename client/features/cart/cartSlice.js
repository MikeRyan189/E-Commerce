import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCartAsync = createAsyncThunk("getCart", async (userId) => {
  console.log("HITTTT get cart async");
  try {
    const { data } = await axios.get(`/api/cart/${userId}/cart`);
    return data;
  } catch (error) {
    console.log("Error in getCart thunk", error);
  }
});

export const editCartAsync = createAsyncThunk("editCart", async (cart) => {
  console.log("CART IN EDIT CART ASYNC: ", cart);
  try {
    const { data } = await axios.put(`/api/cart/${cart.cartId}`, cart);
    console.log("DATERRRRR : ", data);
    return data;
  } catch (error) {
    console.log("ERROR in EDIT CART THUNK");
  }
});

export const removeFromCartAsync = createAsyncThunk(
  "removeFromCart",
  async (info) => {
    try {
      const { data } = await axios.put(`/api/cart/remove/${info.meId}`, info);
      return data;
    } catch (error) {
      console.log("ERROR in REMOVE FROM CART THUNK");
    }
  }
);

const initialState = [];
const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCartAsync.fulfilled, (state, action) => {
      return action.payload;
    }),
      builder.addCase(removeFromCartAsync.fulfilled, (state, action) => {
        return action.payload;
      }),
      builder.addCase(editCartAsync.fulfilled, (state, action) => {
        console.log("AXION PAYLOADD: ", action.payload);
        return action.payload;
      });
  },
});

export const selectCart = (state) => {
  return state.cart;
};

export default cart.reducer;
