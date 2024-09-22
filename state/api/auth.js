/**
 * ©2024, Ujjwal Jindal, Batch 2025, CSE - IIT (ISM) Dhanbad
 */

import api from ".";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: {
          username: credentials.username,
          password: credentials.password,
        },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;

export default authApi;
