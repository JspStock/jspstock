"use client"

import useStore from "@/app/(public)/(main)/pembelian/listpembelian/store"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

const SearchForm = () => {
    const reset = useStore(state => state.reset)
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)

    const handleChange = useDebouncedCallback((e: string) => {
        params.set("search", e)
        reset()
        router.replace(`${pathName}/${params.size > 0 ? `?${params}` : ''}`)
    }, 300)

    return <input 
        type="text" 
        placeholder="Pencarian" 
        className="input mt-5 bg-white text-gray-900 input-bordered w-full max-w-xs"
        defaultValue={params.get('search') ?? ''}
        onChange={e => handleChange(e.target.value)} />
}

export default SearchForm