import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ProfileState {
  name: string;
  address?: string;
  birthday: string;
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
  nearestStation: "",
} as ProfileState;

const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setProfile } = ProfileSlice.actions;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const selectProfile = (state: RootState) => state.profile;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const selectAge = (state: RootState) => {
  const today = new Date();
  const birthday = new Date(state.profile.birthday);
  const age = today.getFullYear() - birthday.getFullYear();
  const thisYearsBirthday = new Date(
    today.getFullYear(),
    birthday.getMonth(),
    birthday.getDate()
  );
  return age + (thisYearsBirthday.getTime() > today.getTime() ? -1 : 0);
};

export default ProfileSlice.reducer;
