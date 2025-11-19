import { createSlice } from '@reduxjs/toolkit';
import { getAuthData, removeAuthData } from '../../utils/authTokenStorage';

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false
};

const authData = getAuthData();
if (authData) {
    initialState.user = authData.user;
    initialState.token = authData.token;
    initialState.isAuthenticated = true;
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        logoutUser: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            removeAuthData();
        },
        initializeAuth: (state) => {
            const authData = getAuthData();
            if(authData) {
                state.user = authData.user;
                state.token = authData.token;
                state.isAuthenticated = true;
            }
            else {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
            }
        }
    },
});

export const { loginSuccess, logoutUser, initializeAuth } = authSlice.actions;
export default authSlice.reducer;