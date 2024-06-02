"use client";

import React from "react";
import { useGetLostItemCategoriesQuery } from "@/redux/api/lostItemApi";
import { useGetFoundItemCategoriesQuery } from "@/redux/api/foundItemApi";

export default function GetAllCategories() {
  const {
    data: lostData,
    error: lostError,
    isLoading: lostLoading,
  } = useGetLostItemCategoriesQuery({});
  const {
    data: foundData,
    error: foundError,
    isLoading: foundLoading,
  } = useGetFoundItemCategoriesQuery({});

  if (lostLoading || foundLoading) {
    return <div>Loading...</div>;
  }

  if (lostError) {
    return <div>Error fetching lost item categories</div>;
  }

  if (foundError) {
    return <div>Error fetching found item categories</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Found Item Categories</h2>
      {foundData?.length ? (
        <ul className="space-y-2">
          {foundData?.map((category: any) => (
            <li key={category.id} className="border p-2 rounded">
              <p className="font-bold">{category.name}</p>
              <p className="text-sm text-gray-500">
                Created At: {new Date(category.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Updated At: {new Date(category.updatedAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No found item categories found</p>
      )}

      <h2 className="text-2xl font-bold mb-4 mt-8">All Lost Item Categories</h2>
      {lostData?.length ? (
        <ul className="space-y-2">
          {lostData?.map((category: any) => (
            <li key={category.id} className="border p-2 rounded">
              <p className="font-bold">{category.name}</p>
              <p className="text-sm text-gray-500">
                Created At: {new Date(category.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Updated At: {new Date(category.updatedAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No lost item categories found</p>
      )}
    </div>
  );
}
