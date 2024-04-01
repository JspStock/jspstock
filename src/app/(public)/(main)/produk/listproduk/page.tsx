import { Metadata } from "next"
import dynamic from "next/dynamic"
import Link from "next/link"
import { getCountProduct } from "./action"
import TableList from "@/app/components/product/listproduk/table"
import { Suspense } from "react"

const TableLoadingSkeleton = dynamic(() => import('@/app/components/tableLoadingSkeleton'))
const Pagination = dynamic(() => import("@/app/components/product/listproduk/pagination"))
const Perpage = dynamic(() => import("@/app/components/product/listproduk/perpage"))
const SearchForm = dynamic(() => import('@/app/components/product/listproduk/searchForm'))
const PrintButton = dynamic(() => import('@/app/components/product/listproduk/printButton'))
const DeleteButton = dynamic(() => import('@/app/components/product/listproduk/deleteButton'))

interface SearchParams {
    search?: string,
    show?: string,
    page?: string
}

export const metadata: Metadata = {
    title: 'Daftar produk'
}

export default async function Listproduk({ searchParams }: { searchParams: SearchParams }) {
    const countProduct = await getCountProduct(searchParams.search)

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
            <Perpage />
            <Suspense key={`${searchParams.page ?? '' + searchParams.search ?? '' + searchParams.show}`} fallback={<TableLoadingSkeleton />}>
                <TableList searchParams={searchParams} />
            </Suspense>
            <Pagination
                show={parseInt(searchParams.show ?? "10")}
                count={countProduct}
                page={parseInt(searchParams.page ?? "1")} />
        </>
    )
}