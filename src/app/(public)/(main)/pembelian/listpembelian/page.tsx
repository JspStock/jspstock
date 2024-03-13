import dynamic from "next/dynamic"
import Link from "next/link"

const TableList = dynamic(() => import("@/app/components/pembelian/listpembelian/table"))
const Pagination = dynamic(() => import("@/app/components/pembelian/listpembelian/pagination"))
const Perpage = dynamic(() => import("@/app/components/pembelian/listpembelian/perpage"))

export default function Listpembelian() {
    return (
        <>
            <div className="flex space-x-2">
                <Link href="/" className="text-white w-48 border-0 bg-red-400 btn">+ Tambah List Pembelian</Link>
                <button className="text-white w-20 border-0 bg-gray-400 btn">Print</button>
            </div>
            <input type="text" placeholder="Pencarian" className="input mt-5 bg-white text-gray-900 input-bordered w-full max-w-xs" />
            <Perpage />
            <TableList />
            <Pagination />
        </>
    )
}