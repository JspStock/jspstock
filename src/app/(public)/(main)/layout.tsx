import type { Metadata } from "next";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/app/components/navbar"))
const DrawerSide = dynamic(() => import("@/app/components/drawerside"))

export const metadata: Metadata = {
    title: "Dashboard",
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
                <Navbar />
                <div className="w-full flex flex-col justify-center px-5 md:px-10 mt-10 max-lg:mt-24">
                    {children}
                </div>
            </div>
            <DrawerSide />
        </div>
    );
}
