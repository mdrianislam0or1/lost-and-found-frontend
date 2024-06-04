"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import {
  useSubmitLostItemMutation,
  useGetLostItemCategoriesQuery,
} from "@/redux/api/lostItemApi";
import Loading from "@/components/UI/StyleComponent/Loading";

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
  images: FileList;
};

export default function SubmitLostItem() {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [submitLostItem, { isLoading, isError, isSuccess }] =
    useSubmitLostItemMutation();
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetLostItemCategoriesQuery({});

  const [uploading, setUploading] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setUploading(true);
    const imageUrls = [];

    for (let i = 0; i < data.images.length; i++) {
      const file = data.images[i];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=468a47d5f64ecfb9b135bba4c38d559d`,
          formData
        );
        imageUrls.push(response.data.data.url);
      } catch (err) {
        console.error("Failed to upload image:", err);
        alert("Failed to upload image.");
        setUploading(false);
        return;
      }
    }

    const formattedData = {
      ...data,
      images: imageUrls,
    };

    try {
      await submitLostItem(formattedData).unwrap();
      reset();
      alert("Lost item reported successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to report lost item.");
    } finally {
      setUploading(false);
    }
  };

  if (categoriesLoading) {
    return (
      <div>
        {" "}
        <Loading />
      </div>
    );
  }

  if (categoriesError) {
    return <div>Error fetching categories</div>;
  }

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
            Images (Upload Files)
          </label>
          <input
            type="file"
            {...register("images")}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            multiple
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white font-bold py-2 px-4 rounded mt-4"
          disabled={isLoading || uploading}
        >
          {isLoading || uploading ? "Submitting..." : "Submit Lost Item"}
        </button>
        {isError && (
          <p className="text-red-500 mt-2">Error: Failed to submit the item</p>
        )}
        {isSuccess && (
          <p className="text-green-500 mt-2">Item submitted successfully!</p>
        )}
      </form>
    </div>
  );
}
