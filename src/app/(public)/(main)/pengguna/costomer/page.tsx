import dynamic from "next/dynamic"
import Link from "next/link"
import TableList from "@/app/components/pengguna/costomer/table"
import { Suspense } from "react"
import { Metadata } from "next"

const TableLoadingSkeleton = dynamic(() => import('@/app/components/tableLoadingSkeleton'))
const Perpage = dynamic(() => import("@/app/components/perpage"))
const PrintButton = dynamic(() => import('@/app/components/pengguna/costomer/printButton'))
const DeleteButton = dynamic(() => import('@/app/components/pengguna/costomer/deleteButton'))
const SearchForm = dynamic(() => import('@/app/components/searchForm'))

export interface SearchParams{
    show?: string,
    search?: string,
    page?: string
}

export const metadata: Metadata = {
    title: 'Daftar kustomer'
}

export default function Listcostomer({ searchParams }: { searchParams: SearchParams }) {
    return (
        <>
            <div className="flex max-lg:grid max-lg:space-y-2 lg:space-x-2">
                <Link href="/pengguna/costomer/tambah" className="text-white w-62 border-0 bg-green-400 btn">+ Tambah List Costomer</Link>
                <div className="max-lg:flex max-lg:space-x-2 lg:space-x-2">
                    <PrintButton />
                    <DeleteButton />
                </div>
            </div>
            <SearchForm />
            <Perpage />

            <Suspense key={`${searchParams.page}_${searchParams.search}_${searchParams.show}`} fallback={<TableLoadingSkeleton />}>
                <TableList searchParams={searchParams} />
            </Suspense>
        </>
    )
}