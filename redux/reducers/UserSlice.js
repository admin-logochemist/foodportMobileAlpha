import { createSlice } from "@reduxjs/toolkit";
import { AsyncStorage } from "@react-native-async-storage/async-storage";


export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,

    },
    reducers: {
        login: (state, action) => {
            console.log('áction', action.payload.email);
            state.user = action.payload;
        },
        logout: (state) => {
           
            localStorage.removeItem('EMAIL');
            state.user = null;
        },
    }
});
export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;