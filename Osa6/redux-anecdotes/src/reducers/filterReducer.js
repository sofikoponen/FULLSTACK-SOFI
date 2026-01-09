import { createSlice } from "@reduxjs/toolkit";

const initialState = "ALL";

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterDotes(state, action) {
      const content = action.payload;
      return content;
    },
  },
});

export const { filterDotes } = filterSlice.actions;

export default filterSlice.reducer;
