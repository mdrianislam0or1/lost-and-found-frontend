"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import {
  useSubmitLostItemMutation,
  useGetLostItemCategoriesQuery,
  useGetAllLostItemQuery,
  useDeleteLostItemMutation,
  useIsFoundUpdateMutation,
} from "@/redux/api/lostItemApi";
import Link from "next/link";
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
    data: lostItemsData,
    isLoading: lostLoading,
    isError: lostError,
  } = useGetAllLostItemQuery({});
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetLostItemCategoriesQuery({});
  const [deleteLostItem, { isError: deleteError, isSuccess: deleteSuccess }] =
    useDeleteLostItemMutation();
  const [isFoundUpdate] = useIsFoundUpdateMutation();

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
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API}`,
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

  if (lostLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (lostError) {
    return <div>Error fetching lost items</div>;
  }

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteLostItem(id).unwrap();
      alert("Item deleted successfully!");
    } catch (err) {
      console.error("Failed to delete item:", err);
      alert("Failed to delete item.");
    }
  };

  const handleToggleFoundStatus = async (
    id: string,
    currentStatus: boolean
  ) => {
    try {
      const response = await isFoundUpdate({
        id,
        isFound: !currentStatus,
      }).unwrap();

      if (response) {
        alert("Item status updated successfully!");
        console.log("isfoutd", currentStatus, !currentStatus, id);
      } else {
        throw new Error("Failed to update item status.");
      }
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update item status.");
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
                    <button className="text-blue600 hover:underline mr-2">
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:underline mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() =>
                      handleToggleFoundStatus(item.id, item.isFound)
                    }
                    className={`text-white font-bold py-1 px-2 rounded ${
                      item.isFound
                        ? "bg-pink-600 hover:underline mr-2"
                        : "bg-purple-600 hover:underline mr-2"
                    }`}
                  >
                    {item.isFound ? "Mark as Not Found" : "Mark as Found"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
