"use client";

import { useState } from "react";
import { useChangePasswordMutation } from "@/redux/api/profileApi";
import { useRouter } from "next/navigation";
import { removeUser } from "@/services/auth.service";
import { deleteCookies } from "@/services/actions/deleteCookies";
import { authKey } from "@/constants/authKey";

export default function ChangePassword() {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleLogout = () => {
  //   removeUser();
  //   deleteCookies(authKey);
  //   router.refresh();
  //   router.push("/");
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      alert("New password and confirm new password do not match.");
      return;
    }

    try {
      await changePassword(formData).unwrap();
      // removeUser();
      // router.push("/");

      removeUser();
      deleteCookies(authKey);
      router.refresh();
      router.push("/");
      alert("Password changed successfully!");
    } catch (error: any) {
      console.error("Failed to change password:", error);
      alert(`Failed to change password: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto my-20 p-6 bg-white rounded-lg shadow-lg max-w-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Change Password
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current Password:
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              required
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Password:
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              required
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm New Password:
            <input
              type="password"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              required
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isLoading}
        >
          {isLoading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}
