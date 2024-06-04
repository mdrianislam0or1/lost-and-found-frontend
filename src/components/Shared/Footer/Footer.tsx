import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <h5 className="font-bold text-lg">Contact Information</h5>
            <p>
              Email:{" "}
              <a href="mailto:info@lostandfound.com" className="text-white">
                info@lostandfound.com
              </a>
            </p>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-white hover:text-indigo-500">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.56v14.88c0 .9-.73 1.64-1.63 1.64H1.63A1.64 1.64 0 010 19.44V4.56C0 3.66.73 2.92 1.63 2.92h20.74c.9 0 1.63.74 1.63 1.64zm-4.93 1.41c-.61-.26-1.27-.43-1.94-.51-.66-.08-1.33-.1-2-.1h-8c-.67 0-1.34.02-2 .1-.67.08-1.33.25-1.94.51a3.59 3.59 0 00-2.08 2.08c-.26.61-.43 1.27-.51 1.94-.08.66-.1 1.33-.1 2v8c0 .67.02 1.34.1 2 .08.67.25 1.33.51 1.94a3.59 3.59 0 002.08 2.08c.61.26 1.27.43 1.94.51.66.08 1.33.1 2 .1h8c.67 0 1.34-.02 2-.1.67-.08 1.33-.25 1.94-.51a3.59 3.59 0 002.08-2.08c.26-.61.43-1.27.51-1.94.08-.66.1-1.33.1-2v-8c0-.67-.02-1.34-.1-2-.08-.67-.25-1.33-.51-1.94a3.59 3.59 0 00-2.08-2.08zm-7.87 5.95v7.46h-2.65v-7.46h2.65zm-1.32-3.6c-.87 0-1.57.71-1.57 1.57s.7 1.57 1.57 1.57c.87 0 1.57-.7 1.57-1.57s-.7-1.57-1.57-1.57zm6.64 3.6v7.46h-2.65v-3.77c0-.68-.56-1.23-1.23-1.23s-1.23.55-1.23 1.23v3.77h-2.65v-7.46h2.65v.96c.53-.68 1.34-1.1 2.23-1.1 1.5 0 2.7 1.2 2.7 2.7v4.9h-.01z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-inidigo-500">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.23 0H1.77C.79 0 0 .8 0 1.78v20.44C0 23.21.79 24 1.77 24H12.81v-9.28H9.69v-3.62h3.12V8.41c0-3.1 1.9-4.79 4.66-4.79 1.32 0 2.45.1 2.78.14v3.22h-1.91c-1.5 0-1.79.72-1.79 1.76v2.31h3.58l-.47 3.62h-3.11V24h6.1c.98 0 1.77-.79 1.77-1.77V1.77C24 .79 23.21 0 22.23 0" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-inidigo-500">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .288C5.403.288 0 5.69 0 12.306c0 5.302 3.438 9.8 8.206 11.385.6.11.82-.258.82-.575 0-.285-.01-1.041-.016-2.044-3.338.727-4.042-1.608-4.042-1.608-.545-1.383-1.332-1.75-1.332-1.75-1.09-.745.082-.73.082-.73 1.204.084 1.837 1.236 1.837 1.236 1.07 1.835 2.807 1.305 3.49.997.108-.775.418-1.305.76-1.605-2.665-.305-5.465-1.335-5.465-5.933 0-1.31.47-2.382 1.235-3.22-.123-.303-.536-1.527.117-3.182 0 0 1.008-.323 3.3 1.23a11.527 11.527 0 013.006-.403c1.02.004 2.046.138 3.005.404 2.29-1.554 3.297-1.23 3.297-1.23.655 1.655.242 2.88.12 3.183.77.837 1.234 1.91 1.234 3.22 0 4.61-2.803 5.625-5.476 5.92.43.372.812 1.102.812 2.222 0 1.606-.015 2.902-.015 3.297 0 .319.22.691.825.574C20.565 22.102 24 17.604 24 12.306 24 5.69 18.598.288 12 .288z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <div className="mt-4 md:mt-0">
              <h5 className="font-bold text-lg">Additional Links</h5>
              <Link href="/terms">
                <p className="text-white hover:text-inidigo-500 block mt-2">
                  Terms of Use
                </p>
              </Link>
              <Link href="/privacy">
                <p className="text-white hover:text-inidigo-500 block mt-2">
                  Privacy Policy
                </p>
              </Link>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-500">
                &copy; 2024 Lost & Found. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
