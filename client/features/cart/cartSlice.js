// import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
// import axios from "axios";
 
// // const token = window.localStorage.getItem(TOKEN)

// export const getCart = createAsyncThunk("getCart/", async(userId)=>{
//    console.log("HELLO From get cart thunk", userId)
//    try{
//        const {data} = await axios.get(`/api/cart/${userId}`)
//        return data
//    }catch(error){
//        console.log("Error in getCart thunk", error)
//    }
// })

// export const editCartAsync = createAsyncThunk("editCart", async (cart) => {
      
//     const { data } = await axios.put(`/api/cart/${cart.cartId}`, cart);
//     console.log("DATA IN editCArt Thunk, ", data)
//     return data;
//   });

 
// const initialState =[]
// const cart = createSlice({
//    name: "cart",
//    initialState,
//    reducers: {
 
//    },
//    extraReducers: (builder)=>{
//        builder.addCase(getCart.fulfilled, (state, action)=>{
//            return action.payload
//        })
//    }
// })
 
 
// export const selectCart = (state)=>{
//    console.log("HELLE")
//    return state.cart
// }
 
 
// export default cart.reducer


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
 
// const token = window.localStorage.getItem(TOKEN)

// export const getCart = createAsyncThunk("getCart/", async(userId)=>{
//    try{
//        const {data} = await axios.get(`/api/cart/${userId}`)
//        return data
//    }catch(error){
//        console.log("Error in getCart thunk", error)
//    }
// })

export const getCartAsync = createAsyncThunk("getCart", async (userId)=>{
  console.log("HITTTT get cart async")
    try{
        const { data } = await axios.get(`/api/cart/${userId}/cart`)
        return data
    }catch(error){
        console.log("Error in getCart thunk", error)
    }
 })

export const editCartAsync = createAsyncThunk("editCart", async (cart) => {
    console.log("CART IN EDIT CART ASYNC: ", cart)
      try{
    const { data } = await axios.put(`/api/cart/${cart.cartId}`, cart);
    console.log("DATERRRRR : ", data)
    return data;
      }catch(error){
        console.log("ERROR in EDIT CART THUNK")
      }
  });

  export const removeFromCartAsync = createAsyncThunk("removeFromCart", async (info) => {
    try{
         const { data } = await axios.put(`/api/cart/remove/${info.meId}`, info);
         return data;
      }catch(error){
        console.log("ERROR in REMOVE FROM CART THUNK")
        
      }
  });

  export const getCartProductAsync = createAsyncThunk("getCartProduct", async (cartProduct)=>{
    
    try{
        const { data } = await axios.get(`/api/cartProduct/${cartProduct.cartId}/${cartProduct.productId}`)
        return data
    }catch(error){
        console.log("Error in getCart thunk", error)
    }
 })

 
const initialState =[]
const cart = createSlice({
   name: "cart",
   initialState,
   reducers: {
 
   },
   extraReducers: (builder) => {
       builder.addCase(getCartAsync.fulfilled, (state, action)=>{
            // action.payload.forEach(product=>{
            //     if(product.quantity){
            //         product.quantity++
            //     }else{
            //         product.quantity = 1
            //     }
            // });
            console.log("ACTION PAYLOAD : ", action.payload)
           return action.payload
       }),
    //    builder.addCase(getCart2.fulfilled, c(state, action)=>{
    //     return action.payload
    // })
    builder.addCase(removeFromCartAsync.fulfilled, (state, action)=>{
        // console.log("REMOVE FROM CART THUNK FULFILLED", action.payload)
        return action.payload
    }),
    builder.addCase(editCartAsync.fulfilled, (state, action)=>{
      console.log("AXION PAYLOADD: ", action.payload)
        return action.payload
    })
   }
})
 
 
export const selectCart = (state)=>{
  //  console.log("HELLE")
   return state.cart
}
 
 
export default cart.reducer
