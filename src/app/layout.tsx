import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { Session } from "next-auth";
import Provider from "./components/provider";

const mulish = Mulish({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'JSP',
    template: '%s - JSP'
  }
};

export default function RootLayout({
  children,
  params: { session }
}: Readonly<{
  children: React.ReactNode;
  params: { session: Session }
}>) {
  return (
    <html className="bg-gray-100" data-theme="light" lang="en">
      <body className={mulish.className}>
        <Provider session={session}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
