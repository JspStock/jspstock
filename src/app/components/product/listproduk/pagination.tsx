"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

const Pagination = ({ show, count, page }: {
    show: number,
    count: number,
    page: number
}) => {
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)

    const isFirst = page <= 1
    const isLast = page > (Math.ceil(count / show) - 1)

    const handleNextPage = () => {
        params.set("page", (page + 1).toString())
        router.replace(`${pathName}${params.size > 0 ? `?${params}` : ""}`)
    }

    const handlePrevious = () => {
        params.set("page", (page - 1).toString())
        router.replace(`${pathName}${params.size > 0 ? `?${params}` : ""}`)
    }

    return (
        <div className="join mt-3">
            <button className="join-item btn bg-blue-900 text-white" disabled={isFirst} onClick={handlePrevious}>«</button>
            <button className="join-item btn text-gray-900">Halaman { page }</button>
            <button className="join-item btn bg-blue-900 text-white" disabled={isLast} onClick={handleNextPage}>»</button>
        </div>
    )
}
export default Pagination