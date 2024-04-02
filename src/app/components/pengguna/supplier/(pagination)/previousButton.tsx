"use client"

import { SearchParams } from "@/app/(public)/(main)/pengguna/supplier/page"
import useStore from "@/app/(public)/(main)/pengguna/supplier/store"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const PreviousButton = ({ searchParams }: {
    searchParams: SearchParams
}) => {
    const reset = useStore(state => state.reset)
    const router = useRouter()
    const pathName = usePathname()
    const searchParamas = useSearchParams()

    const handleClick = () => {
        const params = new URLSearchParams(searchParamas)
        params.set('page', (parseInt(searchParams.page ?? '1') - 1).toString())
        reset()
        router.replace(`${pathName}/${params.size > 0 ? `?${params.toString()}`: ""}`)
    }

    return <button className="join-item btn bg-blue-900 text-white" disabled={ parseInt(searchParamas.get('page') ?? "1") <= 1 } onClick={handleClick}>«</button>
}

export default PreviousButton