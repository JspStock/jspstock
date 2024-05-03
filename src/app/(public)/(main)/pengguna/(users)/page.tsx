import { Metadata } from "next"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Suspense } from "react"
import TableList from "@/app/components/pengguna/table"

const SearchForm = dynamic(() => import('@/app/components/searchForm'))
const PerPage = dynamic(() => import('@/app/components/perpage'))
const TableLoaderSkeleton = dynamic(() => import('@/app/components/tableLoadingSkeleton'))
const PrintButton = dynamic(() => import('@/app/components/pengguna/printButton'))
const DeleteButton = dynamic(() => import('@/app/components/pengguna/deleteButton'))

export const metadata: Metadata = {
    title: 'Daftar Pengguna'
}

export interface SearchParams {
    search?: string,
    page?: string,
    show?: string
}

export default function page({ searchParams }: { searchParams: SearchParams }) {
    return (
        <>
            <div className="flex max-lg:grid max-lg:space-y-2 lg:space-x-2">
                <Link href="/pengguna/tambah" className="text-white w-62 border-0 bg-green-400 btn">+ Tambah List Pengguna</Link>
                <div className="max-lg:flex max-lg:space-x-2 lg:space-x-2">
                    <PrintButton />
                    <DeleteButton />
                </div>
            </div>
            <SearchForm />
            <PerPage />
            <Suspense fallback={<TableLoaderSkeleton />} key={`${searchParams.search}_${searchParams.page}_${searchParams.show}`}>
                <TableList searchParams={searchParams} />
            </Suspense>
        </>
    )
}