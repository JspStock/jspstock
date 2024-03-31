"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

const Pagination = ({ page, count, show }: { page?: number, count: number, show?: number }) => {
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)

    const isFirst = ( page ?? 1 ) == 1 || page == 0
    const isLast = ( page ?? 1 ) > (Math.ceil(count / (show ? show : 10)) - 1)

    const nextPage = () => {
        if(!isLast){
            params.set("page", ((page ?? 1) + 1).toString())
            router.replace(`${pathName}/${params.size > 0 ? `?${params}` : ''}`)
        }
    }

    const previousPage = () => {
        if(!isFirst){
            params.set("page", ((page ?? 1) - 1).toString())
            router.replace(`${pathName}/${params.size > 0 ? `?${params}` : ''}`)
        }
    }

    return (
        <div className="join mt-3">
            <button className="join-item btn bg-blue-900 text-white" onClick={previousPage} disabled={isFirst}>«</button>
            <button className="join-item btn text-gray-900">Halaman { page }</button>
            <button className="join-item btn bg-blue-900 text-white" onClick={nextPage} disabled={isLast}>»</button>
        </div>
    )
}
export default Pagination