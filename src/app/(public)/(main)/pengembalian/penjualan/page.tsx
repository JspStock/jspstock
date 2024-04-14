import { Metadata } from "next"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Suspense } from "react"
import TableList from "@/app/components/pengembalian/penjualan/table"

const TableLoaderSkeleton = dynamic(() => import('@/app/components/tableLoadingSkeleton'))
const SearchForm = dynamic(() => import('@/app/components/searchForm'))
const PerPage = dynamic(() => import('@/app/components/perpage'))
const DeleteButton = dynamic(() => import('@/app/components/pengembalian/penjualan/deleteButton'))
const PrintButton = dynamic(() => import('@/app/components/pengembalian/penjualan/printButton'))

export const metadata: Metadata = {
    title: 'Pengembalian Penjualan'
}

export interface SearchParams{
    show?: string,
    page?: string,
    search?: string
}

export default function page({ searchParams }: { searchParams: SearchParams }) {
    return (
        <>
            <div className="flex max-lg:grid max-lg:space-y-2 lg:space-x-2">
                <Link href="/pengembalian/penjualan/tambah" className="text-white w-62 border-0 bg-green-500 btn">+ Tambah Pengembalian Penjualan</Link>
                <div className="max-lg:flex max-lg:space-x-2 lg:space-x-2">
                    <PrintButton />
                    <DeleteButton />
                </div>
            </div>
            <SearchForm />
            <PerPage />

            <Suspense key={`${searchParams.page}_${searchParams.search}_${searchParams.show}`} fallback={<TableLoaderSkeleton />}>
                <TableList
                    searchParams={searchParams} />
            </Suspense>
        </>
    )
}