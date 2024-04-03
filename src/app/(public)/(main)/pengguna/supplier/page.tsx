import dynamic from "next/dynamic"
import Link from "next/link"
import { Suspense } from "react"
import TableList from "@/app/components/pengguna/supplier/table"
import { Metadata } from "next"

const TableLoadingSkeleton = dynamic(() => import('@/app/components/tableLoadingSkeleton'))
const Pagination = dynamic(() => import("@/app/components/pengguna/supplier/pagination"))
const Perpage = dynamic(() => import("@/app/components/pengguna/supplier/perpage"))
const SearchInput = dynamic(() => import('@/app/components/pengguna/supplier/searchInput'))
const DeleteButton = dynamic(() => import('@/app/components/pengguna/supplier/deleteButton'))
const PrintButton = dynamic(() => import('@/app/components/pengguna/supplier/printButton'))

export interface SearchParams{
    search?: string,
    show?: string,
    page?: string
}

export const metadata: Metadata = {
    title: 'Supplier'
}

export default function ListSupplier({ searchParams }: { searchParams: SearchParams }) {
    return (
        <>
            <div className="flex space-x-2">
                <Link href="/pengguna/supplier/tambah" className="text-white w-62 border-0 bg-green-500 btn">+ Tambah List Supplier</Link>
                <PrintButton />
                <DeleteButton />
            </div>
            <Perpage />
            <SearchInput />
            <Suspense fallback={<TableLoadingSkeleton />}>
                <TableList searchParams={searchParams} />
            </Suspense>
            <Pagination searchParams={searchParams} />
        </>
    )
}