import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "@/graphql/types";

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

const savedAuthState = localStorage.getItem("isLoggedIn") === "true";

const initialState: AuthState = {
  isLoggedIn: savedAuthState || false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.user = action.payload;
      localStorage.setItem("isLoggedIn", "true");
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.setItem("isLoggedIn", "false");
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
