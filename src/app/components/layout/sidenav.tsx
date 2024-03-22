"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LinkNav, linkNav } from "../../(public)/(main)/data"

const Sidenav = () => {
    const router = useRouter()
    const path = usePathname()

    const renderMenu = (items: Array<LinkNav>, sublink?: string) => items.map((e, index) => <li key={index}>
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
                <ul>
                    {renderMenu(e.subMenu, e.link)}
                </ul>
            </details>
        ) : (
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
        )}
    </li>)

    

    return (
        <div className="drawer-side z-20">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-72 min-h-full bg-blue-950 max-md:overflow-scroll text-white">
                {renderMenu(linkNav)}
            </ul>

        </div>
    )
}
export default Sidenav