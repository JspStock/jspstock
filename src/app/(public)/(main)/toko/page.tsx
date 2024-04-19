import { Metadata } from "next"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Suspense } from "react"
import TableList from "@/app/components/toko/table"

const Perpage = dynamic(() => import("@/app/components/perpage"))
const SearchForm = dynamic(() => import('@/app/components/searchForm'))
const TableLoaderSkeleton = dynamic(() => import('@/app/components/tableLoadingSkeleton'))
const PrintButton = dynamic(() => import('@/app/components/toko/printButton'))
const DeleteButton = dynamic(() => import('@/app/components/toko/deleteButton'))

export const metadata: Metadata = {
    title: 'Toko'
}

export interface SearchParams{
    search?: string,
    page?: string,
    show?: string
}

export default function page({ searchParams }: { searchParams: SearchParams }) {
    return (
        <>
            <div className="flex max-lg:grid max-lg:space-y-2 lg:space-x-2">
                <Link href="/toko/tambah" className="text-white w-62 border-0 bg-green-500 btn">+ Tambah Toko</Link>
                <div className="max-lg:flex max-lg:space-x-2 lg:space-x-2">
                    <PrintButton />
                    <DeleteButton />
                </div>
            </div>
            <SearchForm />
            <Perpage />

            <Suspense key={`${searchParams.search}_${searchParams.page}_${searchParams.show}`} fallback={<TableLoaderSkeleton />}>
                <TableList searchParams={searchParams} />
            </Suspense>
        </>
    )
}