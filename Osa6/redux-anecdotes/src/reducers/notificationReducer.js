import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      const content = action.payload;
      return content;
    },
    clearNotification() {
      return "";
    },
  },
});

const { showNotification, clearNotification } = notificationSlice.actions;

export const openNotification = (content, time) => {
  return (dispatch) => {
    dispatch(showNotification(content));
    setTimeout(() => {
      dispatch(clearNotification());
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
