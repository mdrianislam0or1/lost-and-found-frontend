"use client";
import { useGetRecentLostItemQuery } from "@/redux/api/lostItemApi";
import Image from "next/image";
import Link from "next/link";

export default function RecentLostItem() {
  const { data, error, isLoading } = useGetRecentLostItemQuery({});

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error loading recent lost items.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Recently Reported Lost Items
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((item: any) => (
          <div key={item.id} className="bg-white shadow-md rounded-lg p-6">
            {/* <Image
              width={400}
              height={400}
              src={item.images[0]}
              alt={item.lostItemName}
              className="w-full h-40 object-cover rounded-md mb-4"
            /> */}
            <h2 className="text-xl font-semibold mb-2">{item.lostItemName}</h2>
            <p className="text-gray-700 mb-2">
              <strong>Description:</strong> {item.description}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Location:</strong> {item.location}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Reported By:</strong> {item.user.name} ({item.user.email})
            </p>
            <p className="text-gray-700">
              <strong>Category:</strong> {item.category.name}
            </p>
            <p className="text-gray-500 text-sm mt-4">
              Reported on: {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {/* View All  LostItem Button */}
      <div className="text-center">
        <Link href="/allLostItem">
          <button className="bg-black text-white font-bold py-2 px-4 rounded mt-4">
            View all Lost Item
          </button>
        </Link>
      </div>
    </div>
  );
}
