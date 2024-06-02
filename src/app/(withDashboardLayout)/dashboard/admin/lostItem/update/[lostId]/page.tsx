"use client";

import { useState, useEffect } from "react";
import {
  useGetLostItemByIdQuery,
  useGetLostItemCategoriesQuery,
  useUpdateLostItemMutation,
} from "@/redux/api/lostItemApi";

type TParams = {
  params: {
    lostId: string;
  };
};

export default function UpdateLostItem({ params }: TParams) {
  const { data: lostItemData, isLoading: isLoadingLostItem } =
    useGetLostItemByIdQuery(params.lostId);
  const { data: categoriesData, isLoading: isLoadingCategories } =
    useGetLostItemCategoriesQuery({});
  const [updateLostItem, { isLoading: isUpdating }] =
    useUpdateLostItemMutation();

  const [formData, setFormData] = useState({
    categoryId: "",
    lostItemName: "",
    description: "",
    location: "",
    contactInfo: {
      phone: "",
      email: "",
    },
    images: [] as string[],
  });

  useEffect(() => {
    if (lostItemData) {
      setFormData({
        categoryId: lostItemData.categoryId || "",
        lostItemName: lostItemData.lostItemName || "",
        description: lostItemData.description || "",
        location: lostItemData.location || "",
        contactInfo: lostItemData.contactInfo || { phone: "", email: "" },
        images: lostItemData.images || [],
      });
    }
  }, [lostItemData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
      const response = await updateLostItem({
        id: params.lostId,
        data: formData,
      }).unwrap();
      if (response && response.count > 0) {
        alert("Lost item updated successfully!");
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      console.error("Failed to update lost item:", error);
      alert("Failed to update lost item. Please try again.");
    }
  };

  if (isLoadingLostItem || isLoadingCategories) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Update Lost Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category ID:
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            >
              <option value="">Select Category</option>
              {categoriesData &&
                categoriesData.map((category: any) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Lost Item Name:
            <input
              type="text"
              name="lostItemName"
              value={formData.lostItemName}
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
          {isUpdating ? "Updating..." : "Update Lost Item"}
        </button>
      </form>
    </div>
  );
}
