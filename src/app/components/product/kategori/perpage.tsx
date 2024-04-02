"use client"

import useStore from "@/app/(public)/(main)/produk/kategori/store"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const Perpage = ({ show }: { show?: string }) => {
    const reset = useStore(state => state.reset)
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()

    const changeContentShow = (value: number | string) => {
        const params = new URLSearchParams(searchParams)
        params.set("show", value.toString())
        reset()
        router.replace(`${pathName}/${params.size > 0 ? `?${params}` : ''}`)
    }

    return (
        <div className="flex items-center mt-3">
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1">{ show ? show : 10 }</div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 bg-base-100 rounded-box w-52 shadow-xl">
                    <li><button onClick={() => changeContentShow(10)}>10</button></li>
                    <li><button onClick={() => changeContentShow(50)}>50</button></li>
                    <li><button onClick={() => changeContentShow('all')}>ALL</button></li>
                </ul>
            </div>
            <h1>Per halaman</h1>
        </div>
    )
}
export default Perpage