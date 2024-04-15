import { Metadata } from "next"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Suspense } from "react"
import TableList from "@/app/components/pemaketan/listpemaketan/table"

const TableLoaderSkeleton = dynamic(() => import('@/app/components/tableLoadingSkeleton'))
const DatePicker = dynamic(() => import('@/app/components/datePicker'))
const SearchForm = dynamic(() => import('@/app/components/searchForm'))
const PerPage = dynamic(() => import('@/app/components/perpage'))
const DeleteButton = dynamic(() => import('@/app/components/pemaketan/listpemaketan/deleteButton'))
const PrintButton = dynamic(() => import('@/app/components/pemaketan/listpemaketan/printButton'))
const PrintLabelButton = dynamic(() => import('@/app/components/pemaketan/listpemaketan/printLabelButton'))

export const metadata: Metadata = {
    title: 'Daftar Pemaketan'
}

export interface SearchParams{
    show?: string,
    date?: string,
    page?: string,
    search?: string
}

export default function page({ searchParams }: { searchParams: SearchParams }) {
    return (
        <>
            <div className="lg:flex mb-5 w-full items-center justify-center p-5 bg-white rounded-lg space-x-2">
                <DatePicker />
            </div>
            <div className="flex max-lg:grid max-lg:space-y-2 lg:space-x-2">
                <Link href="/pemaketan/listpemaketan/input" className="text-white w-64 border-0 bg-green-500 btn">+ Tambah List Pemaketan</Link>
                <div className="max-lg:flex max-lg:space-x-2 lg:space-x-2">
                    <PrintLabelButton BASE_URL={process.env.BASE_URL ?? ''} />
                    <PrintButton BASE_URL={process.env.BASE_URL ?? ''} />
                    <DeleteButton />
                </div>
            </div>
            <SearchForm />
            <PerPage />

            <Suspense fallback={<TableLoaderSkeleton />} key={`${searchParams.date}_${searchParams.page}_${searchParams.search}_${searchParams.show}`}>
                <TableList searchParams={searchParams} />
            </Suspense>
        </>
    )
}