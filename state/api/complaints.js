/**
 * ©2024, Ujjwal Jindal, Batch 2025, CSE - IIT (ISM) Dhanbad
 */

import api from ".";
import { complaintFromJSON, complaintToJSON } from "../../models/Complaint";

const complaintApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getComplaints: builder.query({
      query: () => ({
        url: "complaints",
        method: "GET",
        responseHandler: (response) => {
          return response
            .json()
            .then((data) =>
              data?.map((complaint) => complaintFromJSON(complaint))
            );
        },
      }),
      providesTags: ["Complaint"],
    }),
    getComplaintByComplaintId: builder.query({
      query: (id) => ({
        url: `complaints/${id}`,
        method: "GET",
        responseHandler: (response) =>
          response.json().then((complaint) => complaintFromJSON(complaint)),
      }),
      providesTags: ["Complaint"],
    }),
    createComplaint: builder.mutation({
      query: (complaint) => ({
        url: "complaints",
        method: "POST",
        body: complaintToJSON(complaint),
      }),
      invalidatesTags: ["Complaint"],
    }),
    getComplaintTypes: builder.query({
      query: () => ({
        url: "complaints/types",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetComplaintsQuery,
  useGetComplaintByComplaintIdQuery,
  useCreateComplaintMutation,
  useGetComplaintTypesQuery,
} = complaintApi;

export default complaintApi;
