"use client";
import { useSubmitFoundItemCategoriesMutation } from "@/redux/api/foundItemApi";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  name: string;
};

export default function CreateCategory() {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [submitFoundItemCategories, { isLoading, isError, isSuccess, error }] =
    useSubmitFoundItemCategoriesMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await submitFoundItemCategories(data).unwrap();
      reset();
      alert("Category created successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to create category.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create New Category</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category Name
          </label>
          <input
            {...register("name", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white font-bold py-2 px-4 rounded mt-4"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Create Category"}
        </button>
        {isError && (
          <p className="text-red-500 mt-2">Error: Failed to create category</p>
        )}
        {isSuccess && (
          <p className="text-green-500 mt-2">Category created successfully!</p>
        )}
      </form>
    </div>
  );
}
