import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
 


  export const getAllCartProductAsync = createAsyncThunk("getCartProduct", async (cartId)=>{
    console.log("CARTID IN GETCARTPRODUCTS THUNK", cartId)
    try{
        const { data } = await axios.get(`/api/cartProduct/${cartId}`)
        console.log("DATA IN getAllCartProductAsync ", data)
        return data
    }catch(error){
        console.log("Error in getCart thunk", error)
    }
 })

 
const initialState =[]
const cartProduct = createSlice({
   name: "cartProduct",
   initialState,
   reducers: {
   },
   extraReducers: (builder) => {
       builder.addCase(getAllCartProductAsync.fulfilled, (state, action)=>{
            // action.payload.forEach(product=>{
            //     if(product.quantity){
            //         product.quantity++
            //     }else{
            //         product.quantity = 1
            //     }
            // });
            return action.payload
       })
   }
})
 
 
export const selectCartProduct = (state)=>{
  
   return state.cartProduct
}
 
 
export default cartProduct.reducer
