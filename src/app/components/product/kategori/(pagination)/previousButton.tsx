"use client"

import useStore from "@/app/(public)/(main)/produk/kategori/store"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const PreviousButton = ({ page }: {
    page: number
}) => {
    const reset = useStore(state => state.reset)
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()

    const handleClick = () => {
        const params = new URLSearchParams(searchParams)
        params.set('page', (page - 1).toString())
        reset()
        router.replace(`${pathName}/${params.size > 0 ? `?${params}` : ''}`)
    }

    return <button className="join-item btn bg-blue-900 text-white" onClick={handleClick} disabled={page <= 1}>«</button>
}

export default PreviousButton