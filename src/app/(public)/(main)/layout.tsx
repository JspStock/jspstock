import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NextTopLoader from "nextjs-toploader";

const Navbar = dynamic(() => import("@/app/components/navbar"))
const DrawerSide = dynamic(() => import("@/app/components/layout/sidenav"))

export default function AllLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const store = cookies().has("store")
    !store ? redirect('/auth/signin') : null

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content justify-center relative">
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
