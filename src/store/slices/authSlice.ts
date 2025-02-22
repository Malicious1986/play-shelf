import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
}

const savedAuthState = localStorage.getItem("isLoggedIn") === "true";

const initialState: AuthState = {
  isLoggedIn: savedAuthState || false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", "true");
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.setItem("isLoggedIn", "false");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
