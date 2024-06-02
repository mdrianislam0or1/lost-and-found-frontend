import { tagTypes } from "../tagTypes/tagTypes";
import { baseApi } from "./baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyProfile: build.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      providesTags: [tagTypes.profileData],
    }),

    updateProfile: build.mutation({
      query: (data) => ({
        url: "/profile",
        method: "PATCH",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.profileData],
    }),
    changePassword: build.mutation({
      query: (data) => ({
        url: "/change-password",
        method: "PATCH",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.profileData],
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = profileApi;
