import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ProfileState {
  name: string;
  address?: string;
  birthday?: string;
  gender?: number;
  about?: string;
  nearestStation?: string;
}

const initialState = {
  name: "",
  address: "",
  birthday: "2021-01-01",
  gender: 0,
  about: "",
  nearestStation: ""
} as ProfileState;

const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileState>) => {
      return {
        ...state,
        ...action.payload
      }
    }
  },
});

export const { setProfile } = ProfileSlice.actions;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const selectProfile = (state: RootState) => state.profile;
export default ProfileSlice.reducer;
