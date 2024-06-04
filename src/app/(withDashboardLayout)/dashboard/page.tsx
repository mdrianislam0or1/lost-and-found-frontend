"use client";
/* eslint-disable react/no-unescaped-entities */
import React from "react";

export default function DashboardHomePage() {
  return (
    <div>
      <main className="flex-1 bg-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-100 p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2 text-blue-800">
              Our Mission
            </h2>
            <p className="text-blue-700">
              At Lost & Found, our mission is to reduce the stress and
              inconvenience of losing personal belongings. By leveraging the
              power of community and technology, we aim to increase the chances
              of lost items being returned to their rightful owners.
            </p>
          </div>
          <div className="bg-green-100 p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2 text-green-800">
              Report Lost Items
            </h2>
            <p className="text-green-700">
              Easily report items you've lost through our user-friendly
              interface. Provide detailed descriptions and photos to help others
              identify your lost belongings.
            </p>
          </div>
          <div className="bg-yellow-100 p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2 text-yellow-800">
              Verify Ownership
            </h2>
            <p className="text-yellow-700">
              Our platform includes a secure process for verifying ownership of
              found items, ensuring that they are returned to their rightful
              owners efficiently and safely.
            </p>
          </div>
          <div className="bg-red-100 p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2 text-red-800">
              User Profiles
            </h2>
            <p className="text-red-700">
              Create and manage your user profile to keep track of reported and
              found items. Stay updated on the status of your lost items and
              manage your account settings.
            </p>
          </div>
          <div className="bg-purple-100 p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2 text-purple-800">
              Community Support
            </h2>
            <p className="text-purple-700">
              Join a community of individuals dedicated to helping each other.
              Browse reported items and assist others in finding their lost
              belongings.
            </p>
          </div>
          <div className="bg-indigo-100 p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2 text-indigo-800">
              Admin Tools
            </h2>
            <p className="text-indigo-700">
              Our platform includes administrative tools for overseeing site
              activity and user management, ensuring a smooth and efficient
              experience for all users.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
