"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  useLazySearchFoundItemsQuery,
  useGetFoundItemCategoriesQuery,
} from "@/redux/api/foundItemApi";
import { usesDebounced } from "@/redux/hooks";
import Loading from "@/components/UI/StyleComponent/Loading";

const SearchOrFilters: React.FC = () => {
  const [categoryId, setCategoryId] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [foundItemName, setFoundItemName] = useState<string>("");

  const [trigger, { data, error, isLoading }] = useLazySearchFoundItemsQuery();
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetFoundItemCategoriesQuery({});

  const debouncedTerm = usesDebounced({
    searchQuery: foundItemName,
    delay: 6000,
  });

  const handleSearch = () => {
    trigger({ categoryId, location, foundItemName });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Search Found Items
        </h2>
        <div className="text-center space-y-4 mb-4">
          {categoriesLoading && <p>Loading categories...</p>}
          {/* {categoriesError && <p className="text-red-500">Error loading categories</p>} */}
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Select Category</option>
            {categoriesData?.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Found Item Name"
            value={foundItemName}
            onChange={(e) => setFoundItemName(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleSearch}
            className="p-2 bg-black text-white rounded hover:bg-blue600"
          >
            Search
          </button>
        </div>
      </div>
      {isLoading && (
        <>
          <Loading />
        </>
      )}
      {/* {error && <p className="text-red-500">Error: {error.message}</p>} */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.map((item: any) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col"
          >
            <div className="flex-1 mb-4">
              <h2 className="text-xl font-semibold mb-2">
                {item.foundItemName}
              </h2>
              <p className="text-gray-700 mb-2">{item.description}</p>
              <p className="text-gray-700 mb-2">
                <strong>Location:</strong> {item.location}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Date Found:</strong>{" "}
                {new Date(item.dateFound).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                <strong>Contact Info:</strong> {item.contactInfo.email},{" "}
                {item.contactInfo.phone}
              </p>
            </div>
            <div className="flex space-x-4">
              {item.images.map((image: string, index: number) => (
                <Image
                  key={index}
                  width={128}
                  height={128}
                  src={image}
                  alt={image}
                  className="w-32 h-32 object-cover rounded-md"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchOrFilters;
