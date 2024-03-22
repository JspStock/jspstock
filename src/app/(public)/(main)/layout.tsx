import type { Metadata } from "next";
import dynamic from "next/dynamic";
import NextTopLoader from "nextjs-toploader";

const Navbar = dynamic(() => import("@/app/components/navbar"))
const DrawerSide = dynamic(() => import("@/app/components/layout/sidenav"))

export const metadata: Metadata = {
    title: "JSP",
};

export default function AllLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content justify-center">
                <NextTopLoader color="#1e3a8a" />
                <Navbar />
                <div className="w-full flex flex-col justify-center px-5 md:px-10 mt-10 max-lg:mt-24">
                    {children}
                </div>
            </div>
            <DrawerSide />
        </div>
    );
}
