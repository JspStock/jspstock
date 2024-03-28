import { Metadata } from "next"
import dynamic from "next/dynamic"
import Link from "next/link"
import { getAllCategories, getCountCategoryData } from "./action"

const TableKategori = dynamic(() => import("@/app/components/product/kategori/table"))
const Pagination = dynamic(() => import("@/app/components/product/kategori/pagination"))
const Perpage = dynamic(() => import("@/app/components/product/kategori/perpage"))

export const metadata: Metadata = {
    title: 'Kategori produk'
}

export default async function Kategori({ searchParams }: { searchParams: { show?: string, search?: string, page?: string } }) {
    const countAllCategories = await getCountCategoryData()
    const allCategories = await getAllCategories(searchParams.show, searchParams.search, searchParams.page)

    return (
        <>
            <div className="flex max-lg:grid max-lg:space-y-2 lg:space-x-2">
                <Link href="/produk/kategori/tambah" className="text-white w-62 border-0 bg-green-500 btn">+ Tambah Kategori</Link>
                <div className="max-lg:flex max-lg:space-x-2 lg:space-x-2">
                    <button className="text-white w-20 border-0 bg-gray-400 btn">Print</button>
                    <button className="text-white w-20 border-0 bg-red-400 btn">Hapus</button>
                </div>
            </div>
            <input type="text" placeholder="Pencarian" className="input mt-5 bg-white text-gray-900 input-bordered w-full max-w-xs" />
            <Perpage />
            <TableKategori data={allCategories} />
            <Pagination page={parseInt(searchParams.page ?? '1')} count={countAllCategories} show={parseInt(searchParams.show ?? '10')}/>
        </>
    )
}