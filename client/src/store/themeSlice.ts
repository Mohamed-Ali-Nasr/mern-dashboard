import { createSlice } from "@reduxjs/toolkit";

interface DefaultThemeState {
  mode: string;
  userId: string;
}

const initialState: DefaultThemeState = {
  mode: "dark",
  userId: "63701cc1f03239b7f700000e",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export default themeSlice.reducer;
export const { setMode } = themeSlice.actions;
