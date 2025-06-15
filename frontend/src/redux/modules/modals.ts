import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface ModalState {
  name: string;
  context?: {
    companyId?: string;
    companyName?: string;
  }
  // open: boolean;
}

const initialState = { name: "", context: undefined } as ModalState;

const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpenModal(state, action: PayloadAction<{ name: string, context?: ModalState["context"]}>) {
      state.name = action.payload.name;
      state.context = action.payload.context;
      // state.open = true;
      // state.lang = action.payload;
    },
    setCloseModal(state) {
      state.name = "";
      state.context = undefined;
      // state.open = false;
    },
  },
});

export const { setOpenModal, setCloseModal } = ModalSlice.actions;

export const selectModalName = (state: RootState) => state.modals.name;
export const selectModalContext = (state: RootState) => state.modals.context;
export default ModalSlice.reducer;
