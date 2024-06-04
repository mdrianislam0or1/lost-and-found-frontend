import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/Providers/Providers";

export const metadata: Metadata = {
  title: "The-Missing-Place",
  description:
    "At Lost & Found, our mission is to reduce the stress and inconvenience of losing personal belongings. By leveraging the power of community and technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body>{children}</body>
      </html>
    </Providers>
  );
}
