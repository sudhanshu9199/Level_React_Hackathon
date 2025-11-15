import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logoutUser: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { loginSuccess, logoutUser } = authSlice.actions;
export default authSlice.reducer;