"use client";
export default function Error() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-100 to-red-200">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <svg
          className="mx-auto mb-4 w-16 h-16 text-red-500"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 002 0V6zm-1 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
            clipRule="evenodd"
          />
        </svg>
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Oops! Something went wrong
        </h2>
        <p className="text-gray-700 mb-4">
          An unexpected error has occurred. Please try again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-300 text-white rounded hover:bg-red-400"
        >
          Reload
        </button>
      </div>
    </div>
  );
}
