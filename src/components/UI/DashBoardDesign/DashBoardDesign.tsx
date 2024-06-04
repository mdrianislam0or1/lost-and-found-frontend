"use client";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/services/auth.service";
import { useGetMyProfileQuery } from "@/redux/api/profileApi";
import Image from "next/image";
import Loading from "../StyleComponent/Loading";
import dynamic from "next/dynamic";
export default function DashBoardDesign({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const userInfo = getUserInfo();
    setUserRole(userInfo);
  }, []);

  const { data, error, isLoading } = useGetMyProfileQuery({});

  const profile = data || null;

  const SideBar = dynamic(() => import("./SideBar"), { ssr: false });
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside
        className={`transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64 bg-purple-100 p-4 transition-transform duration-200 ease-in-out fixed lg:static inset-y-0 left-0 z-30`}
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
          <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-full overflow-hidden">
            {profile && profile.profile?.profilePicture ? (
              <Image
                width={40}
                height={40}
                src={profile.profile.profilePicture}
                alt="Profile Picture"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm">
                {isLoading ? "Loading..." : "No Image"}
              </div>
            )}
          </div>
        </header>

        <section>
          {isLoading ? (
            <Loading />
          ) : error ? (
            <div>Error loading profile data</div>
          ) : (
            children
          )}
        </section>
      </main>
    </div>
  );
}
