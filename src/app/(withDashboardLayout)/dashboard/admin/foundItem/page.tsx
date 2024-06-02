"use client";

import {
  useSubmitFoundItemMutation,
  useGetFoundItemCategoriesQuery,
  useGetAllFoundItemQuery,
  useDeleteFoundItemMutation,
} from "@/redux/api/foundItemApi";
import { uploadImage } from "@/utils/uploadImages";
import Link from "next/link";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  categoryId: string;
  foundItemName: string;
  description: string;
  location: string;
  dateFound: string;
  contactInfo: {
    phone: string;
    email: string;
  };
  images: FileList;
};

export default function SubmitFoundItem() {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [submitFoundItem, { isLoading, isError, isSuccess, error }] =
    useSubmitFoundItemMutation();
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetFoundItemCategoriesQuery({});

  const [deleteFountItem, { isError: deleteError, isSuccess: deleteSuccess }] =
    useDeleteFoundItemMutation();
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const uploadedImageUrls = await Promise.all(
      Array.from(data.images).map((file) => uploadImage(file))
    );

    const formattedData = {
      ...data,
      images: uploadedImageUrls,
      contactInfo: {
        phone: data.contactInfo.phone,
        email: data.contactInfo.email,
      },
    };

    try {
      await submitFoundItem(formattedData).unwrap();
      reset();
      setImageUrls([]);
      alert("Found item reported successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to report found item.");
    }
  };

  const {
    data,
    error: allItemError,
    isLoading: allItemLoading,
  } = useGetAllFoundItemQuery({});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading found items</div>;
  }

  const foundItems = data?.data || [];

  const handleDelete = async (id: string) => {
    console.log("Deleting item with ID:", id);
    try {
      const result = await deleteFountItem(id).unwrap();
      if (result?.error) {
        throw new Error(result.error);
      }
      console.log("Delete result:", result);
      alert("Item deleted successfully!");
    } catch (err) {
      console.error("Failed to delete item:", err);
      alert("Failed to delete item.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Submit Found Item</h2>
      <div className="text-center mt-6">
        <Link href="/dashboard/admin/foundItem/allFoundItem">
          <button className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg shadow hover:bg-indigo-700 transition duration-300">
            Found-Item
          </button>
        </Link>
      </div>
      {categoriesLoading ? (
        <div>Loading categories...</div>
      ) : categoriesError ? (
        <div>Error loading categories</div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              {...register("categoryId", { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select a category</option>
              {categoriesData?.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Found Item Name
            </label>
            <input
              {...register("foundItemName", { required: true })}
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
              Date Found
            </label>
            <input
              type="date"
              {...register("dateFound", { required: true })}
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
              Images
            </label>
            <input
              type="file"
              {...register("images")}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              accept="image/*"
              multiple
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Found Item"}
          </button>
          {isError && (
            <p className="text-red-500 mt-2">
              Error: Failed to submit the item
            </p>
          )}
          {isSuccess && (
            <p className="text-green-500 mt-2">Item submitted successfully!</p>
          )}
        </form>
      )}

      <>
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Found Items List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Description</th>
                  <th className="py-2 px-4 border-b">Location</th>
                  <th className="py-2 px-4 border-b">Date Found</th>
                  <th className="py-2 px-4 border-b">Contact Email</th>
                  <th className="py-2 px-4 border-b">Contact Phone</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {foundItems.map((item: any) => (
                  <tr key={item.id}>
                    <td className="py-2 px-4 border-b">{item.foundItemName}</td>
                    <td className="py-2 px-4 border-b">{item.description}</td>
                    <td className="py-2 px-4 border-b">{item.location}</td>
                    <td className="py-2 px-4 border-b">
                      {new Date(item.dateFound).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {item.contactInfo.email}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {item.contactInfo.phone}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <Link
                        href={`/dashboard/admin/foundItem/update/${item.id}`}
                      >
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
        </div>
      </>
    </div>
  );
}
