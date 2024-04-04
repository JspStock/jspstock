import { getServerSession } from "next-auth"
import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"

const Navbar = async () => {
    const session = await getServerSession()

    return (
        <div className="navbar max-lg:fixed px-32 z-10 max-lg:px-10 max-md:px-5 bg-white text-gray-900">
            <label htmlFor="my-drawer-2" className="btn bg-white text-gray-900 shadow-none btn-circle border-0 drawer-button lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            <div className="flex-1">
                <Image
                    alt="logo"
                    src="https://res.cloudinary.com/dblroye9s/image/upload/v1710783474/logo_qo4fss.png"
                    height={100}
                    width={100}
                    className="w-20"
                />
            </div>
            {
                ['owner'].includes(cookies().get('role')!.value.toLowerCase()) ? <div className="flex-none">
                    <Link href="/beralihtoko" className="btn btn-ghost btn-circle">
                        <Image
                            alt="beralih toko"
                            src="https://res.cloudinary.com/dblroye9s/image/upload/v1711270728/jspstock/beralihtoko_r9rzzc.svg"
                            height={100}
                            width={100}
                            className="w-5 h-5"
                        />
                    </Link>
                </div> : null
            }
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div className="btn btn-ghost btn-circle">
                        <Link href="/pemaketan/listpemaketan/input" className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        </Link>
                    </div>

                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <Image
                                src={`https://ui-avatars.com/api/?name=${session ? session.user ? session.user.name ? session.user.name.toLowerCase() == 'default' ? 'JSP' : session.user.name : 'JSP' : 'JSP' : 'JSP'}`} 
                                alt={`Profile ${session?.user?.name}`}
                                width={0}
                                height={0}
                                sizes="100vw"/>
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white text-gray-900 rounded-box w-52">
                        <li>
                            <Link href="/pengaturan/profil">
                                Profil pengaturan
                            </Link>
                        </li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Navbar