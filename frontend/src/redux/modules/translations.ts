import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TransitionState {
  lang: string;
}

const initialState = { lang: "en" } as TransitionState;

const translationSlice = createSlice({
  name: "translation",
  initialState,
  reducers: {
    setLang(state, action: PayloadAction<string>) {
      state.lang = action.payload;
    },
  },
});

export const { setLang } = translationSlice.actions;
export default translationSlice.reducer;
