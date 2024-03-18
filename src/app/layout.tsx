import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

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
      <body className={mulish.className}>
      <NextTopLoader color="#1e3a8a" />
        {children}
      </body>
    </html>
  );
}
