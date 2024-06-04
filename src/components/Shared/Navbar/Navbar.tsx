"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const AuthButton = dynamic(
    () => import("@/components/UI/AuthButton/AuthButton"),
    { ssr: false }
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold">
                <Link href="/">
                  <Image
                    className=" "
                    height={40}
                    width={40}
                    alt="logo"
                    src="/img/logo.png"
                  />
                </Link>
              </h1>
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
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
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
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16m-8 6h8"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/">
              <p className="text-gray-700 hover:text-black block px-3 py-2 rounded-md text-base font-medium">
                Home
              </p>
            </Link>
            <Link href="/dashboard">
              <p className="text-gray-700 hover:text-black block px-3 py-2 rounded-md text-base font-medium">
                Dashboard
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
                <AuthButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
