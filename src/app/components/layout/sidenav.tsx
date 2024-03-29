"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LinkNav, linkNav } from "../../(public)/(main)/data"
import { signOut } from "next-auth/react"

const Sidenav = ({ role }: { role: string }) => {
    const path = usePathname()

    const renderMenu = (items: Array<LinkNav>, sublink?: string) => items.map((e, index) =>
        e.isShow == undefined || e.isShow == true ? <li key={index}>
            {e.subMenu ? (
                <details open={path.startsWith(`${sublink ?? ''}${e.link}`)}>
                    <summary className={`hover:bg-gray-400 focus:bg-blue-950 focus:text-white p-3`}>
                        {
                            e.icon ? <Image
                                src={e.icon}
                                alt={e.text}
                                height={0}
                                className="w-4"
                                width={0}
                            /> : null
                        }

                        <span>{e.text}</span>
                    </summary>
                    {
                        e.isShow == undefined || e.isShow == true ? <ul>
                            {renderMenu(e.subMenu, `${sublink ?? ''}${e.link}`)}
                        </ul> : null
                    }

                </details>
            ) : e.isShow == undefined || e.isShow == true ? (
                <Link href={`${sublink ?? ''}${e.link}`} className={`hover:bg-gray-400 focus:bg-gray-400 focus:text-white p-3 ${path == `${sublink ?? ''}${e.link}` ? 'bg-gray-400' : ''}`}>
                    {
                        e.icon ? <Image
                            src={e.icon}
                            alt={e.text}
                            height={0}
                            className="w-4"
                            width={0}
                        /> : null
                    }

                    <span>{e.text}</span>
                </Link>
            ) : null}
        </li> : null
    )



    return (
        <div className="drawer-side z-20">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-72 min-h-full bg-blue-950 max-md:overflow-scroll text-white">
                {renderMenu(linkNav({ role: role }))}
                <li>
                    <button className="hover:bg-gray-400 focus:bg-gray-400 focus:text-white p-3" onClick={() => signOut()}>keluar</button>
                </li>
            </ul>

        </div>
    )
}
export default Sidenav