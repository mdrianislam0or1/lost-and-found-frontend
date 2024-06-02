"use client";

import { useState, useEffect } from "react";
import {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/profileApi";
import "tailwindcss/tailwind.css";
import Link from "next/link";

interface ProfileData {
  name: string;
  email: string;
  profile: {
    bio: string;
    age: string;
    profilePicture: string;
  };
}

export default function EditProfile() {
  const { data: profileData, isLoading } = useGetMyProfileQuery({});
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    age: "",
    profilePicture: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (profileData) {
      setFormData({
        name: profileData.name,
        email: profileData.email,
        bio: profileData.profile.bio,
        age: profileData.profile.age,
        profilePicture: profileData.profile.profilePicture,
      });
    }
  }, [profileData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let profilePictureUrl = formData.profilePicture;
    if (imageFile) {
      try {
        profilePictureUrl = await uploadImage(imageFile);
      } catch (error: any) {
        console.error("Failed to upload image:", error);
        alert(`Failed to upload image: ${error.message}`);
        return;
      }
    }

    try {
      await updateProfile({
        ...formData,
        profilePicture: profilePictureUrl,
      }).unwrap();
      alert("Profile updated successfully!");
    } catch (error: any) {
      console.error("Failed to update profile:", error);
      alert(`Failed to update profile: ${error.message}`);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Edit Profile
      </h2>
      <div className="text-center">
        <Link href="/changePassword">
          <button className="bg-black text-white font-bold py-2 px-4 rounded mt-4">
            Change Password
          </button>
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              required
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              required
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Bio:
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              required
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Profile Picture:
            <input
              type="file"
              name="profilePicture"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500"
              accept="image/*"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}

const uploadImage = async (imageFile: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API}`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.error.message || "Failed to upload image");
  }

  const data = await response.json();
  return data.data.url;
};
