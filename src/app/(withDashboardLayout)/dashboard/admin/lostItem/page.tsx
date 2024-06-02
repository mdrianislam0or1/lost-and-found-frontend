"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useSubmitLostItemMutation,
  useGetLostItemCategoriesQuery,
  useGetAllLostItemQuery,
  useDeleteLostItemMutation,
} from "@/redux/api/lostItemApi";
import Link from "next/link";

type FormValues = {
  categoryId: string;
  lostItemName: string;
  description: string;
  location: string;
  isFound: boolean;
  contactInfo: {
    phone: string;
    email: string;
  };
  images: string;
};

export default function SubmitLostItem() {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [submitLostItem, { isLoading, isError, isSuccess, error }] =
    useSubmitLostItemMutation();

  const {
    data: lostItemsData,
    isLoading: lostLoading,
    isError: lostError,
    error: lError,
  } = useGetAllLostItemQuery({});

  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetLostItemCategoriesQuery({});

  const [deleteLostItem, { isError: deleteError, isSuccess: deleteSuccess }] =
    useDeleteLostItemMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const imagesArray = data.images.split(",").map((url) => url.trim());
    const formattedData = {
      ...data,
      images: imagesArray,
    };

    try {
      await submitLostItem(formattedData).unwrap();
      reset();
      alert("Lost item reported successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to report lost item.");
    }
  };

  if (categoriesLoading) {
    return <div>Loading categories...</div>;
  }

  if (categoriesError) {
    return <div>Error fetching categories</div>;
  }

  if (lostLoading) {
    return <div>Loading lost items...</div>;
  }

  if (lostError) {
    return <div>Error fetching lost items</div>;
  }

  const handleDelete = async (id: string) => {
    console.log("Deleting item with ID:", id);
    try {
      const result = await deleteLostItem(id).unwrap();
      if (result?.error) {
        throw new Error(result.error);
        alert("something wrong");
      }
      if (deleteSuccess) {
        alert("Item deleted successfully!");
      }
      if (result === "undefined") {
        alert("something wrong");
      }
      console.log("Delete result:", result);
    } catch (err) {
      console.error("Failed to delete item:", err);
      alert("Failed to delete item.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Submit Lost Item</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            {...register("categoryId", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            {categoriesData?.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Lost Item Name
          </label>
          <input
            {...register("lostItemName", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            {...register("location", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contact Phone
          </label>
          <input
            {...register("contactInfo.phone", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contact Email
          </label>
          <input
            type="email"
            {...register("contactInfo.email", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Images (comma separated URLs)
          </label>
          <input
            {...register("images")}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="http://example.com/image1.jpg, http://example.com/image2.jpg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit Lost Item"}
        </button>
        {isError && (
          <p className="text-red-500 mt-2">Error: Failed to submit the item</p>
        )}
        {isSuccess && (
          <p className="text-green-500 mt-2">Item submitted successfully!</p>
        )}
      </form>

      <>
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">All Lost Items</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Location</th>
                <th className="py-2 px-4 border-b">Contact Info</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lostItemsData?.map((item: any) => (
                <tr key={item.id}>
                  <td className="py-2 px-4 border-b">{item.lostItemName}</td>
                  <td className="py-2 px-4 border-b">{item.description}</td>
                  <td className="py-2 px-4 border-b">{item.location}</td>
                  <td className="py-2 px-4 border-b">
                    Email: {item.contactInfo.email} <br />
                    Phone: {item.contactInfo.phone}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <Link href={`/dashboard/admin/lostItem/update/${item.id}`}>
                      <button className="text-blue-600 hover:underline mr-2">
                        Update
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    </div>
  );
}