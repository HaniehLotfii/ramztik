import { configureStore } from "@reduxjs/toolkit";
import coinsReducer from "./slices/coinsSlice";
// import settingsReducer from "./slices/settingsSlice"; // بعداً استفاده میشه

export const store = configureStore({
  reducer: {
    coins: coinsReducer,
    // settings: settingsReducer, // فعلاً می‌تونه خالی باشه یا حذفش کنی
  },
});
