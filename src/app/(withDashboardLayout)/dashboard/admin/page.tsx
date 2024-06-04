"use client";
import Error from "@/components/UI/StyleComponent/Error";
import Loading from "@/components/UI/StyleComponent/Loading";
import {
  useGetWebsiteMetricsQuery,
  useGetAllUserQuery,
  useUpdateUserStatusMutation,
} from "@/redux/api/claimApi";
import { useDeleteUserProfileMutation } from "@/redux/api/profileApi";
import Image from "next/image";
import React from "react";

export default function Admin() {
  const {
    data: metricsData,
    error: metricsError,
    isLoading: metricsLoading,
  } = useGetWebsiteMetricsQuery({});
  const {
    data: usersData,
    error: usersError,
    isLoading: usersLoading,
  } = useGetAllUserQuery({});
  const [updateUserStatus] = useUpdateUserStatusMutation();

  const toggleUserStatus = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    await updateUserStatus({ id: userId, status: newStatus });
  };

  const [deleteProfile] = useDeleteUserProfileMutation();

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteProfile(userId);
    } catch (error) {
      console.error("Failed to delete user profile:", error);
    }
  };

  if (metricsLoading || usersLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (metricsError || usersError) {
    return (
      <>
        <Error />
      </>
    );
  }

  return (
    <div className="container mx-auto ">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">
          Website Activity Metrics
        </h2>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">Total Lost Claims</h3>
            <p className="text-2xl font-bold">{metricsData?.numberOfClaims}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">Total Found Items</h3>
            <p className="text-2xl font-bold">
              {metricsData?.numberOfFoundItems}
            </p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">Total Lost Items</h3>
            <p className="text-2xl font-bold">
              {metricsData?.totalNumberOfLostItems}
            </p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">Total Reported Items</h3>
            <p className="text-2xl font-bold">
              {metricsData?.totalNumberOfReportedItems}
            </p>
          </div>
        </section>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">User List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Profile Image
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Name
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Email
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Role
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Status
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Created At
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Updated At
                </th>

                <th className="py-2 px-4 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {usersData?.map((user: any) => (
                <tr key={user.id}>
                  <td className="py-2 px-4 border-b border-gray-300">
                    <Image
                      src={user?.profile?.profilePicture}
                      height={40}
                      width={40}
                      alt={user?.profile?.profilePicture}
                    />
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {user.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {user.email}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {user.role}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    <button
                      onClick={() => toggleUserStatus(user.id, user.status)}
                      className={`px-3 py-1 rounded-full ${
                        user.status === "active"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {user.status}
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </td>

                  <td className="py-2 px-4 border-b border-gray-300">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="px-3 py-1 rounded-full bg-red-500 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
