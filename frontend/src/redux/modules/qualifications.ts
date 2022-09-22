import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface QualificationState {
  name: string;
  acquisitionDate: string;
}

const QualificationSlice = createSlice({
  name: "qualifications",
  initialState: [] as QualificationState[],
  reducers: {
    addQualifications(state, action: PayloadAction<QualificationState>) {
      state.push(action.payload);
    },
  },
});

export const { addQualifications } = QualificationSlice.actions;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const selectQualifications = (state: RootState) => state.qualifications;

export default QualificationSlice.reducer;
