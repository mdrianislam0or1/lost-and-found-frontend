"use client";

import React from "react";
import { useGetLostItemCategoriesQuery } from "@/redux/api/lostItemApi";
import { useGetFoundItemCategoriesQuery } from "@/redux/api/foundItemApi";
import Loading from "@/components/UI/StyleComponent/Loading";
import Error from "@/components/UI/StyleComponent/Error";

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
    return (
      <div>
        {" "}
        <Loading />
      </div>
    );
  }

  if (lostError) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  if (foundError) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Found Item Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {foundData?.length ? (
          <ul className="space-y-2">
            {foundData?.map((category: any) => (
              <li key={category.id} className="border p-2 rounded">
                <p className="font-bold">{category.id}</p>
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
      </div>

      <h2 className="text-2xl font-bold mb-4 mt-8">All Lost Item Categories</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {lostData?.length ? (
          <div className="space-y-2">
            {lostData?.map((category: any) => (
              <div key={category.id} className="border p-2 rounded">
                <p className="font-bold">{category.id}</p>

                <p className="font-bold">{category.name}</p>
                <p className="text-sm text-gray-500">
                  Created At: {new Date(category.createdAt).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Updated At: {new Date(category.updatedAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">
            No lost item categories found
            <Error />
          </p>
        )}
      </div>
    </div>
  );
}
