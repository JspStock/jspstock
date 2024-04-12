import { Metadata } from "next"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Suspense } from "react"
import TableList from "@/app/components/pengeluaran/listpengeluaran/table"

const TableLoadingSkeleton = dynamic(() => import('@/app/components/tableLoadingSkeleton'))
const Datepicker = dynamic(() => import("@/app/components/datePicker"))
const SearchForm = dynamic(() => import('@/app/components/searchForm'))
const PerPage = dynamic(() => import('@/app/components/perpage'))
const DeleteButton = dynamic(() => import('@/app/components/pengeluaran/listpengeluaran/deleteButton'))
const PrintButton = dynamic(() => import('@/app/components/pengeluaran/listpengeluaran/printButton'))

export interface SearchParams {
    show?: string,
    date?: string,
    search?: string,
    page?: string
}

export const metadata: Metadata = {
    title: 'Daftar pengeluaran'
}

export default function Listpenngeluaran({ searchParams }: { searchParams: SearchParams }) {
    return (
        <>
            <div className="lg:flex mb-5 w-full items-center justify-center p-5 bg-white rounded-lg space-x-2">
                <Datepicker />
            </div>
            <div className="flex max-lg:grid max-lg:space-y-2 lg:space-x-2">
                <Link href="/pengeluaran/listpengeluaran/tambah" className="text-white w-62 border-0 bg-green-500 btn">+ Tambah List Pengeluaran</Link>
                <div className="max-lg:flex max-lg:space-x-2 lg:space-x-2">
                    <PrintButton />
                    <DeleteButton />
                </div>
            </div>
            <SearchForm />
            <PerPage />
            <Suspense fallback={<TableLoadingSkeleton />} key={`${searchParams.date}_${searchParams.page}_${searchParams.search}_${searchParams.show}`}>
                <TableList searchParams={searchParams} />
            </Suspense>
        </>
    )
}