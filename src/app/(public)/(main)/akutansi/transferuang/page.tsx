import dynamic from "next/dynamic"
import Link from "next/link"
import TableList from "@/app/components/akutansi/transfer/table"
import { Suspense } from "react"
import { Metadata } from "next"

const TableLoaderSkeleton = dynamic(() => import('@/app/components/tableLoadingSkeleton'))
const PerPage = dynamic(() => import('@/app/components/perpage'))
const SearchForm = dynamic(() => import('@/app/components/searchForm'))
const DeleteButton = dynamic(() => import('@/app/components/akutansi/transfer/deleteButton'))
const PrintButton = dynamic(() => import('@/app/components/akutansi/transfer/printButton'))

export interface SearchParams {
    show?: string,
    page?: string,
    search?: string
}

export const metadata: Metadata = {
    title: 'Transfer Uang'
}

export default function page({ searchParams }: { searchParams: SearchParams }) {
    return (
        <>
            <div className="flex max-lg:grid max-lg:space-y-2 lg:space-x-2">
                <Link href="/akutansi/transferuang/tambah" className="text-white w-62 border-0 bg-green-500 btn">+ Tambah Transfer Uang</Link>
                <div className="max-lg:flex max-lg:space-x-2 lg:space-x-2">
                    <PrintButton />
                    <DeleteButton />
                </div>
            </div>
            <SearchForm />
            <PerPage />
            <Suspense fallback={<TableLoaderSkeleton />} key={`${searchParams.page}_${searchParams.search}_${searchParams.show}`}>
                <TableList
                    searchParams={searchParams} />
            </Suspense>
        </>
    )
}