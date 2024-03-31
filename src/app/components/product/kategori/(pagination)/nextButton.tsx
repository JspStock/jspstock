"use client"

import useStore from "@/app/(public)/(main)/produk/kategori/store"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const PreviousButton = ({ page, count, show }: {
    page: number,
    count: number,
    show: number
}) => {
    const reset = useStore(state => state.reset)
    const isLast = page > (Math.ceil(count / show) - 1) 
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()

    const handleClick = () => {
        const params = new URLSearchParams(searchParams)
        params.set('page', (page + 1).toString())
        reset()
        router.replace(`${pathName}/${params.size > 0 ? `?${params}` : ''}`)
    }

    return <button className="join-item btn bg-blue-900 text-white" onClick={handleClick} disabled={isLast}>»</button>
}

export default PreviousButton