"use client"

import useStore from "@/app/(public)/(main)/produk/listproduk/store"
import { useFormik } from "formik"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface Form{
    search: string
}

const SearchForm = () => {
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()
    const resetSelect = useStore(state => state.reset)

    const form = useFormik<Form>({
        initialValues: {
            search: searchParams.has('search') ? searchParams.get('search')! : ""
        },
        onSubmit: async e => {
            const params = new URLSearchParams(searchParams)
            params.set("search", e.search)
            resetSelect()
            router.replace(`${pathName}${ params.size > 0 ? `?${params}` : '' }`)
        }
    })

    const { values, handleChange, handleSubmit, isSubmitting } = form
    return <form className="flex items-end gap-x-2" onSubmit={handleSubmit}>
        <input type="text" placeholder="Pencarian" className="input mt-5 bg-white text-gray-900 input-bordered w-full max-w-xs" name="search" value={values.search} onChange={handleChange} />
        <button type="submit" className="btn bg-blue-900 text-white" disabled={isSubmitting}>
            { isSubmitting ? <div className="loading"></div> : null }
            <span>Cari</span>
        </button>
    </form>
}

export default SearchForm