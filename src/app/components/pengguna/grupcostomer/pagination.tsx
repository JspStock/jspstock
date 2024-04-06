"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

const Pagination = ({ hasNextPage, hasPrevPage, page }: {
    hasNextPage: boolean,
    hasPrevPage: boolean,
    page: number
}) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathName = usePathname()
    const params = new URLSearchParams(searchParams)
    const handlePrevPage = () => {
        params.set('page', (page - 1).toString())
        router.replace(`${pathName}/${params.size > 0 ? `?${params}` : ''}`)
    }

    const handleNextPage = () => {
        params.set('page', (page + 1).toString())
        router.replace(`${pathName}/${params.size > 0 ? `?${params}` : ''}`)
    }

    return (
        <div className="join mt-3">
            <button className="join-item btn bg-blue-900 text-white" disabled={!hasPrevPage} onClick={handlePrevPage}>«</button>
            <button className="join-item btn text-gray-900">Halaman {page}</button>
            <button className="join-item btn bg-blue-900 text-white" disabled={!hasNextPage} onClick={handleNextPage}>»</button>
        </div>
    )
}
export default Pagination