import { configureStore } from "@reduxjs/toolkit";
import { issuesSlice } from "./issuesSlice";

export const store = configureStore({
  reducer: { [issuesSlice.name]: issuesSlice.reducer },
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
