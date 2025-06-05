import { configureStore } from "@reduxjs/toolkit";
import coinsReducer from "./slices/coinsSlice";

export const store = configureStore({
  reducer: {
    coins: coinsReducer,
  },
});
