"use client";
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex space-x-2">
        <div className="w-6 h-6 bg-indigo-300 rounded-full animate-pulse"></div>
        <div className="w-6 h-6 bg-pink-300 rounded-full animate-pulse delay-200"></div>
        <div className="w-6 h-6 bg-red-300 rounded-full animate-pulse delay-400"></div>
      </div>
    </div>
  );
}
