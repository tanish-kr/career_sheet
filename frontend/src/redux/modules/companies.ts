import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface CompanyState {
  id: string;
  name: string;
  employmentForm: string;
  employees: number;
  occupation: string;
  accomplishment: string;
  startOn: string;
  endOn: string;
}

const CompanySlice = createSlice({
  name: "company",
  initialState: [] as CompanyState[],
  reducers: {
    addCompanies: {
      reducer: (state, action: PayloadAction<CompanyState>) => {
        state.push(action.payload);
      },
      prepare: (companyData: Omit<CompanyState, "id">) => {
        const newId = Date.now().toString();
        return { payload: { ...companyData, id: newId } };
      }
    },
  },
})


export const { addCompanies } = CompanySlice.actions;

export const selectCompanies = (state: RootState) => {
  const companies = [...state.companies];

  return companies.sort((a, b) => {
    const dateA = new Date(`${a.startOn}-01`);
    const dateB = new Date(`${b.startOn}-01`);

    return dateB.getTime() - dateA.getTime();
  });
}

export default CompanySlice.reducer;
