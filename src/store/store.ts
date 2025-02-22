import { configureStore } from "@reduxjs/toolkit";
import gameSlice  from "@/store/slices/gameSlice";
import authSlice from "@/store/slices/authSlice";

export const store = configureStore({
    reducer:{
        game: gameSlice,
        auth: authSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;