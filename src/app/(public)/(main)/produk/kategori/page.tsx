import dynamic from "next/dynamic"

const TableKategori = dynamic(() => import("@/app/components/product/kategori/table"))
const Pagination = dynamic(() => import("@/app/components/product/kategori/pagination"))
const Perpage = dynamic(() => import("@/app/components/product/kategori/perpage"))

export default function Kategori() {
    return (
        <>
            <div className="flex space-x-2">
                <button className="text-white w-40 border-0 bg-red-400 btn">+ Tambah Kategori</button>
                <button className="text-white w-20 border-0 bg-gray-400 btn">Print</button>
            </div>
            <input type="text" placeholder="Pencarian" className="input mt-5 bg-white text-gray-900 input-bordered w-full max-w-xs" />
            <Perpage />
            <TableKategori />
            <Pagination />
        </>
    )
}