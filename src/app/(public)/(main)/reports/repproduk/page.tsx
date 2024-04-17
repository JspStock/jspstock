import { Metadata } from "next"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import TableList from "@/app/components/reports/reproduk/table"

const TableLoaderSkeleton = dynamic(() => import('@/app/components/tableLoadingSkeleton'))
const Perpage = dynamic(() => import("@/app/components/perpage"))
const Datepicker = dynamic(() => import("@/app/components/datePicker"))
const SearchForm = dynamic(() => import('@/app/components/searchForm'))
const PrintButton = dynamic(() => import('@/app/components/reports/reproduk/printButton'))

export interface SearchParams{
    date?: string,
    search?: string,
    page?: string,
    show?: string
}

export const metadata: Metadata = {
    title: 'Laporan Produk'
}

export default function page({ searchParams }: { searchParams: SearchParams }) {
    return (
        <>
            <div className="lg:flex mb-5 w-full items-center justify-center p-5 bg-white rounded-lg space-x-2">
                <Datepicker />
            </div>
            <div className="flex max-lg:grid max-lg:space-y-2 lg:space-x-2">
                <div className="max-lg:flex max-lg:space-x-2 lg:space-x-2">
                    <PrintButton />
                </div>
            </div>
            <SearchForm />
            <Perpage />

            <Suspense key={`${searchParams.date}_${searchParams.page}_${searchParams.search}_${searchParams.show}`} fallback={<TableLoaderSkeleton />}>
                <TableList
                    searchParams={searchParams} />
            </Suspense>
        </>
    )
}