import { createSlice } from "@reduxjs/toolkit";
import { nameState, initialState } from "./types";
import { cryptokittiesApi } from "./api";

export const cryptokittiesSlice = createSlice({
  name: nameState,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        cryptokittiesApi.endpoints.getKitties.matchFulfilled,
        (state, { payload }) => {
          state.kitties = payload;
        }
      );
  },
});

export default cryptokittiesSlice.reducer;
