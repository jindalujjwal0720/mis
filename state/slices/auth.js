/**
 * ©2024, Ujjwal Jindal, Batch 2025, CSE - IIT (ISM) Dhanbad
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const {
        token,
        user: { user_name, id, dept_name, dept_type, photopath },
      } = action.payload;
      state.user = {
        name: user_name,
        email: id,
        deptName: dept_name,
        deptType: dept_type,
        imageURL: photopath,
      };
      console.log(user_name, id, dept_name, dept_type, photopath);
      state.accessToken = token;
    },
  },
});

export const selectUser = (state) => state.auth.user;
export const selectAccessToken = (state) => state.auth.accessToken;

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
