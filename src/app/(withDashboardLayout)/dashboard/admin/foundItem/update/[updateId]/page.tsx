"use client";

import { useState, useEffect } from "react";
import {
  useGetFoundItemByIdQuery,
  useUpdateFoundItemMutation,
} from "@/redux/api/foundItemApi";
import "tailwindcss/tailwind.css";
import Loading from "@/components/UI/StyleComponent/Loading";

type TParams = {
  params: {
    updateId: string;
  };
};

export default function UpdateFoundItem({ params }: TParams) {
  const { data: foundItemData, isLoading } = useGetFoundItemByIdQuery(
    params.updateId
  );
  const [updateFoundItem, { isLoading: isUpdating }] =
    useUpdateFoundItemMutation();

  const [formData, setFormData] = useState({
    categoryId: "",
    foundItemName: "",
    description: "",
    location: "",
    dateFound: "",
    contactInfo: {
      phone: "",
      email: "",
    },
    images: [] as string[],
  });

  useEffect(() => {
    if (foundItemData) {
      setFormData({
        categoryId: foundItemData.categoryId,
        foundItemName: foundItemData.foundItemName,
        description: foundItemData.description,
        location: foundItemData.location,
        dateFound: new Date(foundItemData.dateFound).toISOString().slice(0, 19),
        contactInfo: foundItemData.contactInfo,
        images: foundItemData.images,
      });
    }
  }, [foundItemData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.includes("contactInfo")) {
      const contactField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        contactInfo: {
          ...prevData.contactInfo,
          [contactField]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await updateFoundItem({
        id: params.updateId,
        data: formData,
      }).unwrap();
      if (response && response.count > 0) {
        alert("Found item updated successfully!");
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      console.error("Failed to update found item:", error);
      alert("Failed to update found item. Please try again.");
    }
  };

  if (isLoading)
    return (
      <div>
        {" "}
        <Loading />
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Update Found Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category ID:
            <input
              type="text"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Found Item Name:
            <input
              type="text"
              name="foundItemName"
              value={formData.foundItemName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date Found:
            <input
              type="datetime-local"
              name="dateFound"
              value={formData.dateFound}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone:
            <input
              type="text"
              name="contactInfo.phone"
              value={formData.contactInfo.phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email:
            <input
              type="email"
              name="contactInfo.email"
              value={formData.contactInfo.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Images:
            <textarea
              name="images"
              value={formData.images.join(", ")}
              onChange={(e) =>
                setFormData({ ...formData, images: e.target.value.split(", ") })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Found Item"}
        </button>
      </form>
    </div>
  );
}
