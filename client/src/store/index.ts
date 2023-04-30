import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import { api } from "./api";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;

export default store;
