import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface SkillState {
  name: string;
  experience: number;
}

// const initialState = {
//   name: "",
//   experience: -1
// } as SkillState;

const SkillsSlice = createSlice({
  name: "skills",
  initialState: [] as SkillState[],
  reducers: {
    addSkills(state, action: PayloadAction<SkillState>) {
      state.push(action.payload);
    },
  },
});

export const { addSkills } = SkillsSlice.actions;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const selectSkills = (state: RootState) => state.skills;

export default SkillsSlice.reducer;
