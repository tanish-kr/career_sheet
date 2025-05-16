import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface ModalState {
  name: string;
  // open: boolean;
}

const initialState = { name: "" } as ModalState;

const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpenModal(state, action: PayloadAction<string>) {
      state.name = action.payload;
      // state.open = true;
      // state.lang = action.payload;
    },
    setCloseModal(state) {
      state.name = "";
      // state.open = false;
    },
  },
});

export const { setOpenModal, setCloseModal } = ModalSlice.actions;

export const selectModalName = (state: RootState) => state.modals.name;
export default ModalSlice.reducer;
