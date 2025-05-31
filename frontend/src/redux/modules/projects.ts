import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface ProjectState {
  companyId: string;
  title: string;
  summary: string;
  jobRole: string;
  member: number;
  description: string;
  technologies?: Technology[];
  startOn: string;
  endOn: string;
}

export interface Technology  {
  name: string;
  version?: string;
}

const ProjectSlice = createSlice({
  name: "project",
  initialState: [] as ProjectState[],
  reducers: {
    addProject(state, action: PayloadAction<ProjectState>) {
      state.push(action.payload);
    },
  },
})


export const { addProject } = ProjectSlice.actions;

export const selectProjects = (companyId: string) => (state: RootState) => state.projects.filter(project => project.companyId == companyId);

export default ProjectSlice.reducer;
