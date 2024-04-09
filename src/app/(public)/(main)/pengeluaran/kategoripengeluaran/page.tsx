import { Metadata } from "next"
import dynamic from "next/dynamic"
import Link from "next/link"
import Table from "@/app/components/pengeluaran/kategori/table"
import { Suspense } from "react"

const Perpage = dynamic(() => import("@/app/components/perpage"))
const SearchForm = dynamic(() => import('@/app/components/searchForm'))
const LoadingTableSkeleton = dynamic(() => import('@/app/components/tableLoadingSkeleton'))
const DeleteButton = dynamic(() => import('@/app/components/pengeluaran/kategori/deleteButton'))
const PrintButton = dynamic(() => import('@/app/components/pengeluaran/kategori/printButton'))

export interface SearchParams {
    search?: string,
    show?: string,
    page?: string
}

export const metadata: Metadata = {
    title: 'Kategori pengeluaran'
}

export default function Kategoripengeluaran({ searchParams }: { searchParams: SearchParams }) {
    return (
        <>
            <div className="flex max-lg:grid max-lg:space-y-2 lg:space-x-2">
                <Link href="/pengeluaran/kategoripengeluaran/tambah" className="text-white w-64 border-0 bg-green-500 btn">+ Tambah Kategori Pengeluaran</Link>
                <div className="max-lg:flex max-lg:space-x-2 lg:space-x-2">
                    <PrintButton />
                    <DeleteButton />
                </div>
            </div>
            <SearchForm />
            <Perpage />

            <Suspense fallback={<LoadingTableSkeleton />} key={`${searchParams.page}_${searchParams.search}_${searchParams.show}`}>
                <Table
                    searchParams={searchParams} />
            </Suspense>
        </>
    )
}