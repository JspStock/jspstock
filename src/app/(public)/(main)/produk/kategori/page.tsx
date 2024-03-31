import { Metadata } from "next"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Suspense } from "react"

const TableKategori = dynamic(() => import("@/app/components/product/kategori/table"))
const Pagination = dynamic(() => import("@/app/components/product/kategori/pagination"))
const Perpage = dynamic(() => import("@/app/components/product/kategori/perpage"))
const SearchForm = dynamic(() => import('@/app/components/product/kategori/searchForm'))
const TableLoadingSkeleton = dynamic(() => import('@/app/components/tableLoadingSkeleton'))
const DeleteButton = dynamic(() => import('@/app/components/product/kategori/deleteCategoryButton'))
const PrintButton = dynamic(() => import('@/app/components/product/kategori/printButton'))

export interface SearchParams {
    show?: string, 
    search?: string, 
    page?: string
}

export const metadata: Metadata = {
    title: 'Kategori produk'
}

export default async function Kategori({ searchParams }: { searchParams: SearchParams }) {
    return (
        <>
            <div className="flex max-lg:grid max-lg:space-y-2 lg:space-x-2">
                <Link href="/produk/kategori/tambah" className="text-white w-62 border-0 bg-green-500 btn">+ Tambah Kategori</Link>
                <div className="max-lg:flex max-lg:space-x-2 lg:space-x-2">
                    <PrintButton />
                    <DeleteButton />
                </div>
            </div>
            <SearchForm />
            <Perpage show={searchParams.show} />
            <Suspense key={searchParams.page + (searchParams.search ?? '') + searchParams.show} fallback={<TableLoadingSkeleton />}>
                <TableKategori searchParams={searchParams} />
            </Suspense>
            <Pagination searchParams={searchParams} />
        </>
    )
}