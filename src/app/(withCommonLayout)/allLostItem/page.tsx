/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState } from "react";
import {
  useGetLostItemsQuery,
  useGetLostItemCategoriesQuery,
} from "@/redux/api/lostItemApi";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/components/UI/StyleComponent/Loading";
import Error from "@/components/UI/StyleComponent/Error";

export default function AllLostItem() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [location, setLocation] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const {
    data: lostItemsData,
    error,
    isLoading,
  } = useGetLostItemsQuery({
    searchTerm,
    categoryId,
    location,
    page,
    limit,
  });

  const { data: categoriesData } = useGetLostItemCategoriesQuery({});

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Error />
      </>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Recently Reported Lost Items
      </h1>
      <div className="mb-4 text-center p-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md mb-2"
        />
        <input
          type="text"
          placeholder="Location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 border border-gray-300 rounded-md mb-2"
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="p-2 border border-gray-300 rounded-md mb-2"
        >
          <option value="">Select Category</option>
          {categoriesData?.map((category: any) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            setPage(1);
          }}
          className="bg-black text-white p-2 rounded-md"
        >
          Apply Filters
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lostItemsData?.map((item: any) => (
          <div
            key={item.id}
            className={`shadow-md rounded-lg p-6 ${
              item.isFound ? "bg-pink-200" : "bg-green-200"
            }`}
          >
            <Image
              width={400}
              height={400}
              src={item.images[0]}
              alt={item.images[0]}
              className="w-full h-40 object-cover rounded-md mb-4"
            />

            <h2 className="text-xl font-semibold mb-2">{item.lostItemName}</h2>
            <p className="text-gray-700 mb-2">
              <strong>Description:</strong> {item.description}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Location:</strong> {item.location}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Contact Email:</strong> {item.contactInfo.email}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Contact Phone:</strong> {item.contactInfo.phone}
            </p>
            <p className="text-gray-500 text-sm mt-4">
              Reported on: {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
