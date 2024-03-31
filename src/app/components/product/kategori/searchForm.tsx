"use client"

import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { useDebouncedCallback } from 'use-debounce'

interface Form {
    search: string
}

const SearchForm = () => {
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()

    const handleSearch = useDebouncedCallback((e: string) => {
        const params = new URLSearchParams(searchParams)
        params.set('search', e)
        router.replace(`${pathName}/${params.size > 0 ? `?${params}` : ''}`)
    }, 300)

    return <div className="form-control">
        <input type="text" placeholder="Pencarian" className="input mt-5 bg-white text-gray-900 input-bordered w-full max-w-xs" name="search" defaultValue={searchParams.get('search')?.toString()} onChange={e => handleSearch(e.target.value)} />
    </div>
}

export default SearchForm