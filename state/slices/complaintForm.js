/**
 * ©2024, Ujjwal Jindal, Batch 2025, CSE - IIT (ISM) Dhanbad
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  form: {
    complaintType: "",
    location: "",
    locationDescription: "",
    problemDescription: "",
    timeOfAvailability: "",
  },
};

const complaintFormSlice = createSlice({
  name: "complaintForm",
  initialState,
  reducers: {
    updateComplaintType: (state, action) => {
      console.log("updateComplaintType", action.payload);
      state.form.complaintType = action.payload;
    },
    updateComplaintLocation: (state, action) => {
      state.form.location = action.payload;
    },
    updateLocationDescription: (state, action) => {
      state.form.locationDescription = action.payload;
    },
    updateProblemDescription: (state, action) => {
      state.form.problemDescription = action.payload;
    },
    updateTimeOfAvailability: (state, action) => {
      state.form.timeOfAvailability = action.payload;
    },
    discardForm: (state) => {
      state.form = {
        complaintType: "",
        location: "",
        locationDescription: "",
        problemDescription: "",
        timeOfAvailability: "",
      };
    },
  },
});

export const selectComplaintType = (state) =>
  state.complaintForm.form.complaintType;
export const selectComplaintLocation = (state) =>
  state.complaintForm.form.location;
export const selectLocationDescription = (state) =>
  state.complaintForm.form.locationDescription;
export const selectProblemDescription = (state) =>
  state.complaintForm.form.problemDescription;
export const selectTimeOfAvailability = (state) =>
  state.complaintForm.form.timeOfAvailability;

export const {
  updateComplaintType,
  updateComplaintLocation,
  updateLocationDescription,
  updateProblemDescription,
  updateTimeOfAvailability,
  discardForm,
} = complaintFormSlice.actions;

export default complaintFormSlice.reducer;
