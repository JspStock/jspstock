import { Metadata } from "next"
import dynamic from "next/dynamic"
import Link from "next/link"
import TableList from "@/app/components/product/listproduk/table"
import { Suspense } from "react"

const TableLoadingSkeleton = dynamic(() => import('@/app/components/tableLoadingSkeleton'))
const PrintButton = dynamic(() => import('@/app/components/product/listproduk/printButton'))
const DeleteButton = dynamic(() => import('@/app/components/product/listproduk/deleteButton'))
const SearchForm = dynamic(() => import('@/app/components/searchForm'))
const PerPage = dynamic(() => import('@/app/components/perpage'))

export interface SearchParams {
    search?: string,
    show?: string,
    page?: string
}

export const metadata: Metadata = {
    title: 'Daftar produk'
}

export default async function Listproduk({ searchParams }: { searchParams: SearchParams }) {
    return (
        <>
            <div className="flex max-lg:grid max-lg:space-y-2 lg:space-x-2">
                <Link href="/produk/tambahproduk" className="text-white w-48 border-0 bg-green-500 btn">+ Tambah List Produk</Link>
                <div className="max-lg:flex max-lg:space-x-2 lg:space-x-2">
                    <PrintButton />
                    <DeleteButton />
                </div>
            </div>
            <SearchForm />
            <PerPage />
            <Suspense key={`${searchParams.page ?? '' + searchParams.search ?? '' + searchParams.show}`} fallback={<TableLoadingSkeleton />}>
                <TableList searchParams={searchParams} />
            </Suspense>
        </>
    )
}