"use client";

import { useGetLostItemQuery } from "@/redux/api/lostItemApi";
import Image from "next/image";
import React from "react";

export default function MyLostItem() {
  const { data, error, isLoading } = useGetLostItemQuery({});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading lost items</div>;
  }

  const lostItems = data;

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">My Lost Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {lostItems?.map((item: any) => (
            <div key={item.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <Image
                width={300}
                height={300}
                src={item.images[0]}
                alt={item.lostItemName}
                className="h-40 w-full object-cover rounded mb-4"
              />
              <h4 className="text-lg font-bold mb-2">{item.lostItemName}</h4>
              <p className="text-sm text-gray-500">{item.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Location: {item.location}
              </p>
              <p className="text-sm text-gray-500 mt-2">Contact Info:</p>
              <p className="text-sm text-gray-500">
                Email: {item.contactInfo.email}
              </p>
              <p className="text-sm text-gray-500">
                Phone: {item.contactInfo.phone}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Status: {item.isFound ? "Found" : "Not Found"}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Date Created: {new Date(item.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Last Updated: {new Date(item.updatedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
