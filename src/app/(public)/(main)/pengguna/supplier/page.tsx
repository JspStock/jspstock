import dynamic from "next/dynamic"
import Link from "next/link"

const TableList = dynamic(() => import("@/app/components/pengguna/supplier/table"))
const Pagination = dynamic(() => import("@/app/components/pengguna/supplier/pagination"))
const Perpage = dynamic(() => import("@/app/components/pengguna/supplier/perpage"))

export default function ListSupplier() {
    return (
        <>
            <div className="flex space-x-2">
                <Link href="/pengguna/supplier/tambah" className="text-white w-62 border-0 bg-green-500 btn">+ Tambah List Supplier</Link>
                <button className="text-white w-20 border-0 bg-gray-400 btn">Print</button>
            </div>
            <input type="text" placeholder="Pencarian" className="input mt-5 bg-white text-gray-900 input-bordered w-full max-w-xs" />
            <Perpage />
            <TableList />
            <Pagination />
        </>
    )
}