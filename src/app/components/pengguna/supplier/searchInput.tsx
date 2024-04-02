"use client"

import useStore from "@/app/(public)/(main)/pengguna/supplier/store"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

const SearchInput = () => {
    const reset = useStore(state => state.reset)
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()
    const handleSearch = useDebouncedCallback((e: string) => {
        const params = new URLSearchParams(searchParams)
        params.set("search", e)
        reset()
        router.replace(`${pathName}/${params.size > 0 ? `?${params}` : ''}`)
    }, 300)

    return <input type="text" placeholder="Pencarian" className="input mt-5 bg-white text-gray-900 input-bordered w-full max-w-xs" defaultValue={searchParams.get('search') ?? ''} onChange={e => handleSearch(e.target.value)} />
}

export default SearchInput