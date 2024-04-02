"use client"

import { SearchParams } from "@/app/(public)/(main)/pengguna/supplier/page"
import useStore from "@/app/(public)/(main)/pengguna/supplier/store"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const NextButton = ({ searchParams, countData }: {
    searchParams: SearchParams,
    countData: number
}) => {
    const reset = useStore(state => state.reset)
    const router = useRouter()
    const pathName = usePathname()
    const urlSearchParams = useSearchParams()
    const isLastPage = (parseInt(searchParams.page ?? '1')) > (Math.ceil(countData / parseInt(searchParams.show ?? '10')) - 1)
    const handleClick = () => {
        reset()
        const params = new URLSearchParams(urlSearchParams)
        params.set('page', (parseInt(searchParams.page ?? '1') + 1).toString())
        router.replace(`${pathName}/${params.size > 0 ? `?${params}` : ''}`)
    }

    return <button className="join-item btn bg-blue-900 text-white" disabled={isLastPage} onClick={handleClick}>»</button>
}

export default NextButton