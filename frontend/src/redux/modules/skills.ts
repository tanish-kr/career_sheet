import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface SkillState {
  name: string;
  experience: number; // 20: 半年以内 40: 半年以上-1年未満 60: 1年以上-3年未満: 80: 3年以上- 5年未満 100: 5年以上
}

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
 
export const selectSkills = (state: RootState) => state.skills;

export default SkillsSlice.reducer;
