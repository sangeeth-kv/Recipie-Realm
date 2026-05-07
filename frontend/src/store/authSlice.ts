import { createSlice } from "@reduxjs/toolkit";
import type {IAuthState}  from "../interface/IAuthState";

const initialState:IAuthState={
    user:null,
    isAuthenticated:false,
    loading:false,
}

export const authSlice = createSlice(
    {
       name:"auth",
       initialState,
       reducers: {

    // ✅ Set Current User
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    // ✅ Logout
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },

    // ✅ Optional Loading State
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  }, 
    }
)

export const {
  setUser,
  logoutUser,
  setLoading,
} = authSlice.actions;

export default authSlice.reducer;