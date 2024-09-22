/**
 * ©2024, Ujjwal Jindal, Batch 2025, CSE - IIT (ISM) Dhanbad
 */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.EXPO_PUBLIC_SERVER_API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    console.log("token", token);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const api = createApi({
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    // ...endpoints for the api
  }),
  tagTypes: [
    // ...tagTypes for caching
    "Complaint",
  ],
});

export default api;
