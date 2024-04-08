import { Metadata } from "next"
import dynamic from "next/dynamic"
import Link from "next/link"
import TableList from "@/app/components/penjualan/listpenjualan/table"
import { Suspense } from "react"

const TableLoadingSkeleton = dynamic(() => import('@/app/components/tableLoadingSkeleton'))
const Perpage = dynamic(() => import("@/app/components/perpage"))
const DatePicker = dynamic(() => import('@/app/components/datePicker'))
const SearchForm = dynamic(() => import('@/app/components/searchForm'))
const DeleteButton = dynamic(() => import('@/app/components/penjualan/listpenjualan/deleteButton'))
const PrintButton = dynamic(() => import('@/app/components/penjualan/listpenjualan/printButton'))

export interface SearchParams {
    show?: string,
    date?: string,
    search?: string,
    page?: string
}

export const metadata: Metadata = {
    title: 'Daftar penjualan'
}

export default function Listpenjualan({ searchParams }: { searchParams: SearchParams }) {
    return (
        <>
            <div className="lg:flex mb-5 w-full items-center justify-center p-5 bg-white rounded-lg space-x-2">
                <DatePicker />
            </div>

            <div className="flex max-lg:grid max-lg:space-y-2 lg:space-x-2">
                <Link href="/penjualan/tambahpenjualan" className="text-white w-62 border-0 bg-green-500 btn">+ Tambah List Penjualan</Link>
                <div className="max-lg:flex max-lg:space-x-2 lg:space-x-2">
                    <PrintButton />
                    <DeleteButton />
                </div>
            </div>
            <SearchForm />
            <Perpage />

            <Suspense key={`${searchParams.date}_${searchParams.page}_${searchParams.search}_${searchParams.show}`} fallback={<TableLoadingSkeleton />}>
                <TableList searchParams={searchParams} />
            </Suspense>
        </>
    )
}