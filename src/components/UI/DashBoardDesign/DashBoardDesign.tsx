"use client";
import { useState } from "react";
import SideBar from "./SideBar";

export default function DashBoardDesign({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64 bg-gray-200 p-4 transition-transform duration-200 ease-in-out fixed lg:static inset-y-0 left-0 z-30`}
      >
        <SideBar />
      </aside>

      <main className="flex-1 p-4 ">
        <header className="flex items-center justify-between mb-8">
          <button
            className="block lg:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
          <h2 className="text-xl font-bold">Good Morning...</h2>
          <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-full">
            A
          </div>
        </header>

        {/* <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-300 p-4 rounded-lg">Total lost claim</div>
          <div className="bg-gray-300 p-4 rounded-lg">Total lost found</div>
          <div className="bg-gray-300 p-4 rounded-lg">Unsolved lost</div>
          <div className="bg-gray-300 p-4 rounded-lg">Pending lost</div>
        </section> */}

        <section>
          {children}
          {/* <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg">
              <thead>
                <tr className="w-full bg-gray-200 text-gray-700">
                  <th className="p-2">Serial</th>
                  <th className="p-2">Lost Item</th>
                  <th className="p-2">Lost Date</th>
                  <th className="p-2">Time lost</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">View</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, index) => (
                  <tr key={index} className="text-center border-b">
                    <td className="p-2">---</td>
                    <td className="p-2">---</td>
                    <td className="p-2">---</td>
                    <td className="p-2">---</td>
                    <td className="p-2">---</td>
                    <td className="p-2">---</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
        </section>
      </main>
    </div>
  );
}
