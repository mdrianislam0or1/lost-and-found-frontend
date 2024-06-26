import { tagTypes } from "../tagTypes/tagTypes";
import { baseApi } from "./baseApi";

const claimApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    submitClaim: build.mutation({
      query: (data) => ({
        url: "/claims",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.allClaim],
    }),

    getAllClaim: build.query({
      query: () => ({
        url: "/claims",
        method: "GET",
      }),
      providesTags: [tagTypes.allClaim],
    }),
    getMyClaim: build.query({
      query: () => ({
        url: "/my-claims",
        method: "GET",
      }),
      providesTags: [tagTypes.allClaim],
    }),
    getWebsiteMetrics: build.query({
      query: () => ({
        url: "/website-metrics",
        method: "GET",
      }),
      providesTags: [tagTypes.allClaim],
    }),

    getAllUser: build.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: [tagTypes.allClaim, tagTypes.foundData, tagTypes.lostData],
    }),

    updateUserStatus: build.mutation({
      query: ({ id, status }) => ({
        url: `/users/${id}/status`,
        method: "PUT",
        contentType: "application/json",
        data: { status },
      }),
      invalidatesTags: [tagTypes.allClaim],
    }),

    updateClaimStatus: build.mutation({
      query: ({ id, status }) => ({
        url: `/claims/${id}`,
        method: "PUT",
        contentType: "application/json",
        data: { status },
      }),
      invalidatesTags: [tagTypes.allClaim],
    }),

    deleteClaimItem: build.mutation({
      query: (id) => ({
        url: `/claims/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.allClaim],
    }),
  }),
});

export const {
  useSubmitClaimMutation,
  useGetAllClaimQuery,
  useGetMyClaimQuery,
  useUpdateClaimStatusMutation,
  useDeleteClaimItemMutation,
  useGetWebsiteMetricsQuery,
  useGetAllUserQuery,
  useUpdateUserStatusMutation,
} = claimApi;
