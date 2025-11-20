import { createSlice } from "@reduxjs/toolkit";
import {
  getAuthData,
  removeAuthData,
  saveAuthData,
} from "../../utils/authTokenStorage";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authData = getAuthData();
if (authData) {
  initialState.user = authData.user;
  initialState.token = authData.token;
  initialState.isAuthenticated = true;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      saveAuthData(state.user, state.token);
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      removeAuthData();
    },
    initializeAuth: (state) => {
      const authData = getAuthData();
      if (authData) {
        state.user = authData.user;
        state.token = authData.token;
        state.isAuthenticated = true;
      } else {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      }
    },
    updateProfile: (state, action) => {
      if (!state.user) return;
      const updates = action.payload;
      state.user = { ...state.user, ...updates };

      const token = state.token || null;
      saveAuthData(state.user, token);
    },
  },
});

export const { loginSuccess, logoutUser, initializeAuth, updateProfile } =
  authSlice.actions;
export default authSlice.reducer;