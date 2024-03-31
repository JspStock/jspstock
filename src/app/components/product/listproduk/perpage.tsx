"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

const Perpage = () => {
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()

    const handleClick = (val: string) => {
        const params = new URLSearchParams(searchParams)
        params.set("show", val)
        router.replace(`${pathName}${ params.size > 0 ? `?${params.toString()}` : '' }`)
    }

    return (
        <div className="flex items-center mt-3">
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1">{ searchParams.get("page") || 10 }</div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-fit">
                    <li><button onClick={() => handleClick("10")}>10</button></li>
                    <li><button onClick={() => handleClick("50")}>50</button></li>
                    <li><button onClick={() => handleClick("all")}>ALL</button></li>
                </ul>
            </div>
            <h1>Per halaman</h1>
        </div>
    )
}
export default Perpage