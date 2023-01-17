import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const checkoutAsync = createAsyncThunk("checkout", async () => {
  const {data} = await axios.post("/checkout", null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
});

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: { data: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkoutAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
  },
});

export const selectCheckout = (state) => state.checkout;


export default checkoutSlice.reducer;