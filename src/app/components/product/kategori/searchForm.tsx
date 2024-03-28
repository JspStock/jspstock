"use client"

import { generateSearchParams } from "@/utils/produk/kategori/utils"
import { useRouter } from "next/navigation"

const SearchForm = () => {
    const router = useRouter()
    return <input type="text" placeholder="Pencarian" className="input mt-5 bg-white text-gray-900 input-bordered w-full max-w-xs" onChange={e => router.replace(`/produk/kategori?${generateSearchParams({ search: e.target.value })}`)} />
}

export default SearchForm