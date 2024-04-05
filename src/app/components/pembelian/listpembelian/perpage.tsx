"use client"

import useStore from "@/app/(public)/(main)/pembelian/listpembelian/store"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const Perpage = () => {
    const reset = useStore(state => state.reset)
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)

    const handleClick = (e: string) => {
        params.set("show", e)
        reset()
        router.replace(`${pathName}/${params.size > 0 ? `?${params}` : ''}`)
    }

    return (
        <div className="flex items-center mt-3">
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1">{ params.get('show') ?? 10 }</div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box">
                    <li><button onClick={() => handleClick("10")}>10</button></li>
                    <li><button onClick={() => handleClick("50")}>50</button></li>
                    <li><button onClick={() => handleClick("all")}>all</button></li>
                </ul>
            </div>

            <h1>Per halaman</h1>
        </div>
    )
}
export default Perpage