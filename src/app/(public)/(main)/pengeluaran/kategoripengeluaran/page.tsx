import dynamic from "next/dynamic"
import Link from "next/link"

const TableKategori = dynamic(() => import("@/app/components/pengeluaran/kategori/table"))
const Pagination = dynamic(() => import("@/app/components/pengeluaran/kategori/pagination"))
const Perpage = dynamic(() => import("@/app/components/pengeluaran/kategori/perpage"))

export default function Kategoripengeluaran() {
    return (
        <>
            <div className="flex max-lg:grid max-lg:space-y-2 lg:space-x-2">
                <Link href="/pengeluaran/kategoripengeluaran/tambah" className="text-white w-64 border-0 bg-green-500 btn">+ Tambah Kategori Pengeluaran</Link>
                <div className="max-lg:flex max-lg:space-x-2 lg:space-x-2">
                    <button className="text-white w-20 border-0 bg-gray-400 btn">Print</button>
                    <button className="text-white w-20 border-0 bg-red-400 btn">Hapus</button>
                </div>
            </div>
            <input type="text" placeholder="Pencarian" className="input mt-5 bg-white text-gray-900 input-bordered w-full max-w-xs" />
            <Perpage />
            <TableKategori />
            <Pagination />
        </>
    )
}