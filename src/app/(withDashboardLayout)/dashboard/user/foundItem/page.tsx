"use client";
import {
  useSubmitFoundItemMutation,
  useGetFoundItemCategoriesQuery,
} from "@/redux/api/foundItemApi";
import React from "react";
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
  images: string;
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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const imagesArray = data.images.split(",").map((url) => url.trim());
    const formattedData = {
      ...data,
      images: imagesArray,
    };

    try {
      await submitFoundItem(formattedData).unwrap();
      reset();
      alert("Found item reported successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to report found item.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Submit Found Item</h2>
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
              Images (comma separated URLs)
            </label>
            <input
              {...register("images")}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
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
    </div>
  );
}
