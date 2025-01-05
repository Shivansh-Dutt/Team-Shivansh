import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"author",
    initialState:{
        user:null,
    },
    reducers:{
        // actions
        setAuthUser:(state,action) => {
            state.user = action.payload;
        },
        logoutUser: (state) => {
            state.author = null; // Set user info to null when logged out
        },
    }
});
export const {setAuthUser,logout } = authSlice.actions;
export default authSlice.reducer;