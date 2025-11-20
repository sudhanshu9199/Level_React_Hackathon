import { createSlice } from "@reduxjs/toolkit";
import {
  getAuthData,
  removeAuthData,
  saveAuthData,
} from "../../utils/authTokenStorage";
import { updateUser as persistUpdateUser } from "../../utils/authStorage";

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

      const emailKey = state.user.email || state.user.emailAddress || null;
      if (!emailKey) {
        state.user = { ...state.user, ...updates };
        saveAuthData(state.user, state.token || null);
        return;
      }
      state.user = { ...state.user, ...updates, email: emailKey };

      saveAuthData(state.user, state.token || null);
      try {
        persistUpdateUser(emailKey, updates);
      } catch (err) {
        console.warn("persistUpdateUser failed:", err);
      }
    },
  },
});

export const { loginSuccess, logoutUser, initializeAuth, updateProfile } =
  authSlice.actions;
export default authSlice.reducer;
