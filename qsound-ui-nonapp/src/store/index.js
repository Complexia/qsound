import { configureStore } from "@reduxjs/toolkit";
import { metamaskSlice } from "./metamaskSlice";

const store = configureStore({
  reducer: {
    metamask: metamaskSlice.reducer,
  },
});
export default store;
