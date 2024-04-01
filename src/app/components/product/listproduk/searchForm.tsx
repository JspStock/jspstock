"use client"

import useStore from "@/app/(public)/(main)/produk/listproduk/store"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

const SearchForm = () => {
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()
    const resetSelect = useStore(state => state.reset)

    const handleChange = useDebouncedCallback((e: string) => {
        const params = new URLSearchParams(searchParams)
        params.set('search', e)
        resetSelect()
        router.replace(`${pathName}${params.size > 0 ? `?${params}` : ''}`)
    }, 300)

    return <input
        type="text"
        placeholder="Pencarian"
        className="input mt-5 bg-white text-gray-900 input-bordered w-full max-w-xs"
        name="search"
        defaultValue={searchParams.get('search') ?? ''}
        onChange={(e => handleChange(e.target.value))} />
}

export default SearchForm