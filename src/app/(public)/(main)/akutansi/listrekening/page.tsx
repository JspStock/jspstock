import dynamic from "next/dynamic"
import Link from "next/link"
import { Suspense } from "react"
import TableList from "@/app/components/akutansi/listrekening/table"
import { Metadata } from "next"

const SearchForm = dynamic(() => import('@/app/components/searchForm'))
const PerPage = dynamic(() => import('@/app/components/perpage'))
const TableLoadingSkeleton = dynamic(() => import('@/app/components/tableLoadingSkeleton'))
const DeleteButton = dynamic(() => import('@/app/components/akutansi/listrekening/deleteButton'))
const PrintButton = dynamic(() => import('@/app/components/akutansi/listrekening/printButton'))

export interface SearchParams{
    show?: string,
    page?: string,
    search?: string
}

export const metadata: Metadata = {
    title: 'Daftar rekening'
}

export default function Listrekening({ searchParams }: { searchParams: SearchParams }) {
    return (
        <>
            <div className="flex max-lg:grid max-lg:space-y-2 lg:space-x-2">
                <Link href="/akutansi/listrekening/tambah" className="text-white w-64 border-0 bg-green-500 btn">+ Tambah List Rekening</Link>
                <div className="max-lg:flex max-lg:space-x-2 lg:space-x-2">
                    <PrintButton />
                    <DeleteButton />
                </div>
            </div>
            <SearchForm />
            <PerPage />

            <Suspense fallback={<TableLoadingSkeleton />} key={`${searchParams.page}_${searchParams.search}_${searchParams.show}`}>
                <TableList searchParams={searchParams} />
            </Suspense>
        </>
    )
}