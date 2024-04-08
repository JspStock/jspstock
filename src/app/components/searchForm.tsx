"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import useStore from "../(public)/(main)/store"

const SearchForm = () => {
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const handleChange = useDebouncedCallback((val: string) => {
        params.set('search', val)
        router.replace(`${pathName}/${params.size > 0 ? `?${params}` : ''}`)
        useStore.getState().reset()
    }, 300)

    return <input 
        type="text" 
        placeholder="Pencarian" 
        className="input mt-5 bg-white text-gray-900 input-bordered w-full max-w-xs"
        defaultValue={searchParams.get('search') ?? ''}
        onChange={e => handleChange(e.target.value)} />
}

export default SearchForm