/**
 * ©2024, Ujjwal Jindal, Batch 2025, CSE - IIT (ISM) Dhanbad
 */

import authReducer from "./slices/auth";
import complaintFormReducer from "./slices/complaintForm";
import api from "./api";

const rootReducer = {
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  complaintForm: complaintFormReducer,
};

export default rootReducer;
