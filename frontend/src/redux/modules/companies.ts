import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface CompanyState {
  name: string;
  employmentForm: string;
  employees: number;
  occupation: string;
  accomplishment: string;
  startOn: Date;
  endOn: Date;
}

const CompanySlice = createSlice({
  name: "company",
  initialState: [] as SkillState[],
  reducers: {
    addCompanies(state, action: PayloadAction<CompanyState>) {
      state.push(action.payload);
    },
  },
})


export const { addCompanies } = CompanySlice.actions;

export const selectCompanies = (state: RootState) => state.companies;

export default CompanySlice.reducer;
