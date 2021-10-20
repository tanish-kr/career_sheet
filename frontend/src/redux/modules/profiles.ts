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
      // [...state, action.payload]
      // state = action.payload;
      // return state;
      // state = ...action.payload;
    }
    // setOpenModal(state, action: PayloadAction<string>) {
    //   state.name = action.payload;
    //   // state.open = true;
    //   // state.lang = action.payload;
    // },
    // setCloseModal(state) {
    //   state.name = "";
    //   // state.open = false;
    // },
  },
});

export const { setProfile } = ProfileSlice.actions;
export default ProfileSlice.reducer;
