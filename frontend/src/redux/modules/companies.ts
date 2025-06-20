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
    const startDateA = new Date(`${a.startOn}-01`);
    const startDateB = new Date(`${b.startOn}-01`);

    const startDiff = startDateB.getTime() - startDateA.getTime();
      if (startDiff !== 0) {
        return startDiff;
      }

    // 終了日比較（null を最大と見なす）
    const endDateA = a.endOn ? new Date(`${a.endOn}-01`) : null;
    const endDateB = b.endOn ? new Date(`${b.endOn}-01`) : null;

    if (!endDateA && !endDateB) return 0; // 両方null → 同順位
    if (!endDateA) return 1;              // Aは稼働中 → Aは下（古い）
    if (!endDateB) return -1;             // Bは稼働中 → Bは下（古い）

    return endDateB.getTime() - endDateA.getTime(); // 終了月の降順
  });
}

export default CompanySlice.reducer;
