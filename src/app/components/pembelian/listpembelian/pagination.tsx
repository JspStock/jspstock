"use client"

import useStore from "@/app/(public)/(main)/pembelian/listpembelian/store"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { PaginationResult } from "prisma-paginate"

const Pagination = async ({ pagination }: { pagination: {
    page: number,
    hasPrevPage: boolean,
    hasNextPage: boolean
} }) => {
    const reset = useStore(state => state.reset)
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)

    const previousClick = () => {
        reset()
        params.set("page", (pagination.page - 1).toString())
        router.replace(`${pathName}/${params.size > 0 ? `?${params}` : ''}`)
    }

    const nextClick = () => {
        reset()
        params.set("page", (pagination.page + 1).toString())
        router.replace(`${pathName}/${params.size > 0 ? `?${params}` : ''}`)
    }

    return (
        <div className="join mt-3">
            <button className="join-item btn bg-blue-900 text-white" disabled={!pagination.hasPrevPage} onClick={previousClick}>«</button>
            <button className="join-item btn text-gray-900">Halaman { pagination.page }</button>
            <button className="join-item btn bg-blue-900 text-white" disabled={!pagination.hasNextPage} onClick={nextClick}>»</button>
        </div>
    )
}
export default Pagination