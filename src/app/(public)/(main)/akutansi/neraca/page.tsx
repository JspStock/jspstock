import { Metadata } from "next"
import dynamic from "next/dynamic"
import TableList from "@/app/components/akutansi/neraca/table"
import { Suspense } from "react"

const TableLoaderSkeleton = dynamic(() => import('@/app/components/tableLoadingSkeleton'))
const PerPage = dynamic(() => import('@/app/components/perpage'))
const SearchForm = dynamic(() => import('@/app/components/searchForm'))
const PrintButton = dynamic(() => import('@/app/components/akutansi/neraca/printButton'))

export const metadata: Metadata = {
    title: 'Neraca keuangan'
}

export interface SearchParams{
    search?: string,
    page?: string,
    show?: string
}

export default function page({ searchParams }: { searchParams: SearchParams }) {
    return (
        <>
            <PrintButton />
            <SearchForm />
            <PerPage />
            <Suspense key={`${searchParams.page}_${searchParams.search}_${searchParams.show}`} fallback={<TableLoaderSkeleton />}>
                <TableList searchParams={searchParams} />
            </Suspense>
        </>
    )
}