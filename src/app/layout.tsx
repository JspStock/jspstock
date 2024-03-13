import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";

const mulish = Mulish({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JSP",
  description: "test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="bg-gray-100" data-theme="light" lang="en">
      <body className={mulish.className}>{children}</body>
    </html>
  );
}
