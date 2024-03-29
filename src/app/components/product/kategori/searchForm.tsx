"use client"

import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"

const SearchForm = () => {
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()
    const [search, setSearch] = useState<string>(searchParams.get("search") || '')

    const generateSearchParams = (val: string) => {
        setSearch(val)
        const params = new URLSearchParams(searchParams)
        params.delete('select')
        params.set('search', val)
        router.replace(`${pathName}${params.size > 0 ? `?${params}` : ''}`)
    }

    return <input type="text" placeholder="Pencarian" className="input mt-5 bg-white text-gray-900 input-bordered w-full max-w-xs" value={search} onChange={e => generateSearchParams(e.target.value)} />
}

export default SearchForm