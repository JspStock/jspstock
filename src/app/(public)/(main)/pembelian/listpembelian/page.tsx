import { Metadata } from "next"
import dynamic from "next/dynamic"
import Link from "next/link"
import TableList from "@/app/components/pembelian/listpembelian/table"
import { Suspense } from "react"

const PrintButton = dynamic(() => import('@/app/components/pembelian/listpembelian/printButton'))
const DeleteButton = dynamic(() => import('@/app/components/pembelian/listpembelian/deleteButton'))
const TableLoadingSkeleton = dynamic(() => import('@/app/components/tableLoadingSkeleton'))
const Perpage = dynamic(() => import("@/app/components/perpage"))
const Datepicker = dynamic(() => import("@/app/components/datePicker"))
const SearchForm = dynamic(() => import('@/app/components/searchForm'))

export interface SearchParams {
    show?: string,
    date?: string,
    page?: string,
    search?: string
}

export const metadata: Metadata = {
    title: "Daftar pembelian"
}

export default function Listpembelian({ searchParams }: { searchParams: SearchParams }) {
    return (
        <>
            <div className="lg:flex mb-5 w-full items-center justify-center p-5 bg-white rounded-lg space-x-2">
                <Datepicker />
            </div>
            <div className="flex max-lg:grid max-lg:space-y-2 lg:space-x-2">
                <Link href="/pembelian/tambahpembelian" className="text-white w-62 border-0 bg-green-500 btn">+ Tambah List Pembelian</Link>
                <div className="max-lg:flex max-lg:space-x-2 lg:space-x-2">
                    <PrintButton />
                    <DeleteButton />
                </div>
            </div>
            <SearchForm />
            <Perpage />
            <Suspense key={`${searchParams.show}-${searchParams.date}-${searchParams.page}-${searchParams.search}`} fallback={<TableLoadingSkeleton />}>
                <TableList searchParams={searchParams} />
            </Suspense>
        </>
    )
}