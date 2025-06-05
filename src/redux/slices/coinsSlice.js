import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCoinsAPI } from "../../services/api";

export const fetchCoins = createAsyncThunk("coins/fetchCoins", async () => {
  const data = await fetchCoinsAPI();
  return data;
});

const coinsSlice = createSlice({
  name: "coins",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default coinsSlice.reducer;
