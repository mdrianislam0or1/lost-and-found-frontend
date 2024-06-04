"use client";
import Navbar from "@/components/Shared/Navbar/Navbar";
import { register } from "@/services/actions/register";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  bio: string;
  age: number | "";
  profilePicture: string;
}

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterForm>({
    name: "",
    email: "a@gmail.com",
    password: "",
    confirmPassword: "",
    bio: "",
    age: "",
    profilePicture: "",
  });
  const router = useRouter();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "age" ? Number(value) : value,
    });
  };

  const handleProfilePictureChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formDataCopy = { ...formData };
      const formDataWithProfilePicture = {
        ...formDataCopy,
        profilePicture: "",
      };

      const formDataToUpdate = new FormData();
      formDataToUpdate.append("image", file);

      try {
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=468a47d5f64ecfb9b135bba4c38d559d`,
          {
            method: "POST",
            body: formDataToUpdate,
          }
        );
        const data = await response.json();
        if (data.data && data.data.url) {
          formDataWithProfilePicture.profilePicture = data.data.url;
          setFormData(formDataWithProfilePicture);
        }
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await register(formData);
      console.log("Registration response:", res);

      if (res.success) {
        const result = await userLogin({
          password: formData.password,
          usernameOrEmail: formData.email,
        });

        if (result?.data?.token) {
          storeUserInfo({ accessToken: result.data.token });
          router.push("/dashboard");
        }
      } else {
        console.error("Registration error:", res.message);
      }
    } catch (err) {
      console.error("Error during registration:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen my-2 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-8">
            Registration with Blood Donation Company Name
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="bio">
                Bio
              </label>
              <textarea
                name="bio"
                id="bio"
                value={formData.bio}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="age">
                Age
              </label>
              <input
                type="number"
                name="age"
                id="age"
                value={formData.age}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="profilePicture">
                Profile Picture
              </label>
              <input
                type="file"
                name="profilePicture"
                id="profilePicture"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-black text-white rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Registration Button
              </button>
            </div>
          </form>
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
