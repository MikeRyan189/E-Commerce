import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchUsersAsync = createAsyncThunk("allUsers", async () => {
      const { data } = await axios.get(`/api/users`);
      return data;
    });

    export const fetchUsersByUsernameAsync = createAsyncThunk("allUsersByUsername", async (username) => {
           const { data } = await axios.get(`/api/users/username/${username}`);
           return data;
         });

    export const addUserAsync = createAsyncThunk("addUser", async ({username, password}) => {
      
      const { data } = await axios.post(`/api/users`, {username, password});
        return data;
      });

      export const deleteSingleUserAsync = createAsyncThunk("deleteSingleUser", async (id) => {
        const { data } = await axios.delete(`/api/users/${id}`);
        return data;
      })

      export const deleteSingleCartAsync = createAsyncThunk("deleteSingleCart", async (id) => {
        const { data } = await axios.delete(`/api/cart/${id}`);
        return data;
      })

  const userSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchUsersAsync.fulfilled, (state, action) => {
        return action.payload;
      });
      builder.addCase(fetchUsersByUsernameAsync.fulfilled, (state, action) => {
        return action.payload;
      });
      builder.addCase(addUserAsync.fulfilled, (state, action) => {
        state.push(action.payload);
      });   
    },
  });

  export const selectUsers = (state) => {
    return state.users;}

  export default userSlice.reducer