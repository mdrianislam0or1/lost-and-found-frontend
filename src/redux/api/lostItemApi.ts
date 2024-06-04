import { tagTypes } from "../tagTypes/tagTypes";
import { baseApi } from "./baseApi";

const lostItemApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    submitLostItem: build.mutation({
      query: (data) => ({
        url: "/lostItem",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.lostData],
    }),

    submitLostItemCategories: build.mutation({
      query: (data) => ({
        url: "/lostItem/categories",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.lostData],
    }),

    getLostItemCategories: build.query({
      query: () => ({
        url: "/lostItem/categories",
        method: "GET",
      }),
      providesTags: [tagTypes.lostData],
    }),
    getRecentLostItem: build.query({
      query: () => ({
        url: "/lostItem/recent-lost-items",
        method: "GET",
      }),
      providesTags: [tagTypes.lostData],
    }),
    getAllLostItem: build.query({
      query: () => ({
        url: "/lostItem",
        method: "GET",
      }),
      providesTags: [tagTypes.lostData],
    }),

    getLostItem: build.query({
      query: () => ({
        url: "/lostItem/my-items",
        method: "GET",
      }),
      providesTags: [tagTypes.lostData],
    }),

    getLostItems: build.query({
      query: ({ searchTerm, categoryId, location, page, limit }) => ({
        url: "/lostItem",
        method: "GET",
        params: { searchTerm, categoryId, location, page, limit },
      }),
      providesTags: [tagTypes.lostData],
    }),

    updateLostItem: build.mutation({
      query: ({ id, data }) => ({
        url: `/lostItem/${id}`,
        method: "PUT",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.lostData],
    }),

    getLostItemById: build.query({
      query: (id) => ({
        url: `/lostItem/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.lostData],
    }),

    deleteLostItem: build.mutation({
      query: (id) => ({
        url: `/lostItem/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.lostData],
    }),

    isFoundUpdate: build.mutation({
      query: ({ id, isFound }) => ({
        url: `/lostItem/is-found/${id}`,
        method: "PATCH",
        contentType: "application/json",
        data: { isFound },
      }),
      invalidatesTags: [tagTypes.lostData],
      transformResponse: (response, meta) => {
        if (!response) {
          return { error: "Failed to update item status" };
        }
        return { data: response };
      },
    }),
  }),
});

export const {
  useSubmitLostItemMutation,
  useGetLostItemCategoriesQuery,
  useGetLostItemQuery,
  useSubmitLostItemCategoriesMutation,
  useGetRecentLostItemQuery,
  useGetAllLostItemQuery,
  useGetLostItemsQuery,
  useUpdateLostItemMutation,
  useGetLostItemByIdQuery,
  useDeleteLostItemMutation,
  useIsFoundUpdateMutation,
} = lostItemApi;
