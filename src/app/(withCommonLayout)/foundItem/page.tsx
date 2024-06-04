"use client";

import Error from "@/components/UI/StyleComponent/Error";
import Loading from "@/components/UI/StyleComponent/Loading";
import { useGetAllFoundItemQuery } from "@/redux/api/foundItemApi";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function FoundItem() {
  const { data, error, isLoading } = useGetAllFoundItemQuery({});

  if (isLoading) {
    return (
      <div>
        {" "}
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  const foundItems = data?.data;
  console.log(foundItems?.data);

  return (
    <div className="container mx-auto p-6">
      <div className=" text-center">
        <div>
          <Link href="/claimItem">
            <button className="bg-black text-white font-bold py-2 px-4 rounded mt-4">
              Claim A Item
            </button>
          </Link>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Found Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {foundItems?.map((item: any) => (
            <div key={item.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <Image
                width={400}
                height={400}
                src={item.images[0]}
                alt={item.foundItemName}
                className="h-40 w-full object-cover rounded mb-4"
              />
              <h4 className="text-lg font-bold mb-2">{item.foundItemName}</h4>
              <p className="text-sm text-gray-500">{item.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Location: {item.location}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Date Found: {new Date(item.dateFound).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500 mt-2">Contact Info:</p>
              <p className="text-sm text-gray-500">
                Email: {item.contactInfo.email}
              </p>
              <p className="text-sm text-gray-500">
                Phone: {item.contactInfo.phone}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Status: {item.status}
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
