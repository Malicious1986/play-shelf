import { combineReducers,configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER,REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web

import authReducer from "@/store/slices/authSlice"; // Your auth slice
import filtersReducer from "@/store/slices/filtersSlice"; // Your auth slice

// Combine all reducers (if you have more in the future)
const rootReducer = combineReducers({
  auth: authReducer,
  filters: filtersReducer,
});

// Configure persist
const persistConfig = {
  key: "root", // Key for localStorage
  storage,
  whitelist: ["auth", "filters"], // Only persist auth slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (gDM) => gDM({
    serializableCheck: {
      // Ignore redux-persist actions that trigger the warning
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

// Export types for useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
