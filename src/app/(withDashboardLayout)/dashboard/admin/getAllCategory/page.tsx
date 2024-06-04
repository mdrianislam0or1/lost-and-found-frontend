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
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (lostError || foundError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Error />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Found Item Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {foundData?.length ? (
          foundData.map((category: any) => (
            <div key={category.id} className="border p-4 rounded shadow-md">
              <p className="font-bold">{category.id}</p>
              <p className="font-bold">{category.name}</p>
              <p className="text-sm text-gray-500">
                Created At: {new Date(category.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Updated At: {new Date(category.updatedAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center">
            No found item categories found
          </p>
        )}
      </div>

      <h2 className="text-2xl font-bold mb-4 mt-8">All Lost Item Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {lostData?.length ? (
          lostData.map((category: any) => (
            <div key={category.id} className="border p-4 rounded shadow-md">
              <p className="font-bold">{category.id}</p>
              <p className="font-bold">{category.name}</p>
              <p className="text-sm text-gray-500">
                Created At: {new Date(category.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Updated At: {new Date(category.updatedAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center">
            No lost item categories found
          </p>
        )}
      </div>
    </div>
  );
}
