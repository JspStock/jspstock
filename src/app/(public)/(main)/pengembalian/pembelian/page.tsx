import { Metadata } from "next"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Suspense } from "react"
import TableList from "@/app/components/pengembalian/pembelian/table"

const TableLoaderSkeleton = dynamic(() => import('@/app/components/tableLoadingSkeleton'))
const SearchForm = dynamic(() => import('@/app/components/searchForm'))
const PerPage = dynamic(() => import('@/app/components/perpage'))
const DeleteButton = dynamic(() => import('@/app/components/pengembalian/pembelian/deleteButton'))
const PrintButton = dynamic(() => import('@/app/components/pengembalian/pembelian/printButton'))

export const metadata: Metadata = {
    title: 'Pengembalian Pembelian'
}

export interface SearchParams{
    show?: string,
    search?: string,
    page?: string
}

export default function page({ searchParams }: { searchParams: SearchParams }) {
    return (
        <>
            <div className="flex max-lg:grid max-lg:space-y-2 lg:space-x-2">
                <Link href="/pengembalian/pembelian/tambah" className="text-white w-62 border-0 bg-green-500 btn">+ Tambah Pengembalian Pembelian</Link>
                <div className="max-lg:flex max-lg:space-x-2 lg:space-x-2">
                    <PrintButton />
                    <DeleteButton />
                </div>
            </div>
            <SearchForm />
            <PerPage />

            <Suspense key={`${searchParams.page}_${searchParams.search}_${searchParams.show}`} fallback={<TableLoaderSkeleton />}>
                <TableList searchParams={searchParams} />
            </Suspense>
        </>
    )
}