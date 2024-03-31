import { Metadata } from "next"
import dynamic from "next/dynamic"
import Link from "next/link"
import { getAllProduct, getCountProduct } from "./action"

const TableList = dynamic(() => import("@/app/components/product/listproduk/table"))
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

export interface AllProduct {
    name: string;
    id: string;
    imagePath: string;
    qty: number;
    price: number;
    cost: number;
    productCategories: {
        name: string
    } | null;
}

export const metadata: Metadata = {
    title: 'Daftar produk'
}

export default async function Listproduk({ searchParams }: { searchParams: SearchParams }) {
    const countProduct = await getCountProduct(searchParams.search)
    const allProduct = await getAllProduct({
        search: searchParams.search,
        show: searchParams.show,
        page: searchParams.page ? parseInt(searchParams.page) : undefined
    })

    return (
        <>
            <div className="flex max-lg:grid max-lg:space-y-2 lg:space-x-2">
                <Link href="/produk/tambahproduk" className="text-white w-48 border-0 bg-green-500 btn">+ Tambah List Produk</Link>
                <div className="max-lg:flex max-lg:space-x-2 lg:space-x-2">
                    <PrintButton data={allProduct} />
                    <DeleteButton />
                </div>
            </div>
            <SearchForm />
            <Perpage />
            <TableList data={allProduct} />
            <Pagination 
                show={parseInt(searchParams.show ?? "10")}
                count={countProduct}
                page={parseInt(searchParams.page ?? "1")} />
        </>
    )
}