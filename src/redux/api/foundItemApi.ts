import { tagTypes } from "../tagTypes/tagTypes";
import { baseApi } from "./baseApi";

const foundItemApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    submitFoundItemCategories: build.mutation({
      query: (data) => ({
        url: "/found-item-categories",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.foundItemCategoryData],
    }),

    getFoundItemCategories: build.query({
      query: () => ({
        url: "/found-item-categories",
        method: "GET",
      }),
      providesTags: [tagTypes.foundItemCategoryData],
    }),

    getAllFoundItem: build.query({
      query: () => ({
        url: "/found-items",
        method: "GET",
      }),
      providesTags: [tagTypes.foundData],
    }),

    searchFoundItems: build.query({
      query: ({ categoryId, location, foundItemName }) => ({
        url: "/found-items",
        method: "GET",
        params: {
          categoryId: categoryId || undefined,
          location: location || undefined,
          foundItemName: foundItemName || undefined,
        },
      }),
      providesTags: [tagTypes.foundData],
    }),

    submitFoundItem: build.mutation({
      query: (data) => ({
        url: "/found-items",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.foundData],
    }),

    getFoundItemById: build.query({
      query: (id) => ({
        url: `/found-items/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.foundData],
    }),
    updateFoundItem: build.mutation({
      query: ({ id, data }) => ({
        url: `/found-items/${id}`,
        method: "PUT",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.foundData],
    }),

    deleteFoundItem: build.mutation({
      query: (id) => ({
        url: `/found-items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.foundData],
    }),
  }),
});

export const {
  useSubmitFoundItemMutation,
  useGetFoundItemCategoriesQuery,
  useGetAllFoundItemQuery,
  useSubmitFoundItemCategoriesMutation,
  useLazySearchFoundItemsQuery,
  useGetFoundItemByIdQuery,
  useUpdateFoundItemMutation,
  useDeleteFoundItemMutation,
} = foundItemApi;
