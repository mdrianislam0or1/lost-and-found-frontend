"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSubmitLostItemCategoriesMutation } from "@/redux/api/lostItemApi";

type FormValues = {
  name: string;
};

export default function SubmitLostItemCategory() {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [submitLostItemCategory, { isLoading, isError, isSuccess, error }] =
    useSubmitLostItemCategoriesMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await submitLostItemCategory(data).unwrap();
      reset();
      alert("Lost item category created successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to create lost item category.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Submit Lost Item Category</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category Name
          </label>
          <input
            {...register("name", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter category name"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white font-bold py-2 px-4 rounded mt-4"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit Category"}
        </button>
        {isError && (
          <p className="text-red-500 mt-2">
            Error: Failed to submit the category
          </p>
        )}
        {isSuccess && (
          <p className="text-green-500 mt-2">
            Category submitted successfully!
          </p>
        )}
      </form>
    </div>
  );
}
