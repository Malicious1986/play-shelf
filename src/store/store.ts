import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import authReducer from "@/store/slices/authSlice"; // Your auth slice

// Combine all reducers (if you have more in the future)
const rootReducer = combineReducers({
  auth: authReducer,
});

// Configure persist
const persistConfig = {
  key: "root", // Key for localStorage
  storage,
  whitelist: ["auth"], // Only persist auth slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (gDM) => gDM(),
});

export const persistor = persistStore(store);

// Export types for useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
