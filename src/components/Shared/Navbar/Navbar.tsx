"use client";
import { getUserInfo, removeUser } from "@/services/auth.service";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const AuthButton = dynamic(
    () => import("@/components/UI/AuthButton/AuthButton"),
    { ssr: false }
  );

  return (
    <nav className="bg-gray-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold">Logo</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/dashboard">
                  <p className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium">
                    Dashboard
                  </p>
                </Link>
                <Link href="/about">
                  <p className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium">
                    About Us
                  </p>
                </Link>
                <Link href="/login">
                  <p className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium">
                    Login
                  </p>
                </Link>
                <Link href="/register">
                  <p className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium">
                    Register
                  </p>
                </Link>
                <Link href="/foundItem">
                  <p className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium">
                    Found Item
                  </p>
                </Link>

                <Link href="/profile">
                  <p className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium">
                    My Profile
                  </p>
                </Link>
                <Link href="/search">
                  <p className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium">
                    Search
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <AuthButton />
              <button className="bg-black text-white px-3 py-2 rounded-md text-sm font-medium ml-2">
                Sign up
              </button>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu*/}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/">
            <p className="text-gray-700 hover:text-black block px-3 py-2 rounded-md text-base font-medium">
              Home
            </p>
          </Link>
          <Link href="/about">
            <p className="text-gray-700 hover:text-black block px-3 py-2 rounded-md text-base font-medium">
              About Us
            </p>
          </Link>
          <Link href="/login">
            <p className="text-gray-700 hover:text-black block px-3 py-2 rounded-md text-base font-medium">
              Login
            </p>
          </Link>
          <Link href="/register">
            <p className="text-gray-700 hover:text-black block px-3 py-2 rounded-md text-base font-medium">
              Register
            </p>
          </Link>
          <Link href="/foundItem">
            <p className="text-gray-700 hover:text-black block px-3 py-2 rounded-md text-base font-medium">
              Found Item
            </p>
          </Link>
          <Link href="/profile">
            <p className="text-gray-700 hover:text-black block px-3 py-2 rounded-md text-base font-medium">
              My Profile
            </p>
          </Link>
          <Link href="/search">
            <p className="text-gray-700 hover:text-black block px-3 py-2 rounded-md text-base font-medium">
              Search
            </p>
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <button className="bg-gray-300 text-black px-3 py-2 rounded-md text-sm font-medium">
                Sign in
              </button>
            </div>
            <div className="ml-3">
              <button className="bg-black text-white px-3 py-2 rounded-md text-sm font-medium ml-2">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
