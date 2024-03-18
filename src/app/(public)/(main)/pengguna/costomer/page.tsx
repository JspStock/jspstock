import dynamic from "next/dynamic"
import Link from "next/link"

const TableList = dynamic(() => import("@/app/components/pengguna/costomer/table"))
const Pagination = dynamic(() => import("@/app/components/pengguna/costomer/pagination"))
const Perpage = dynamic(() => import("@/app/components/pengguna/costomer/perpage"))

export default function Listcostomer() {
    return (
        <>
            <div className="flex max-lg:grid max-lg:space-y-2 lg:space-x-2">
                <Link href="/pengguna/costomer/tambah" className="text-white w-62 border-0 bg-green-400 btn">+ Tambah List Costomer</Link>
                <div className="max-lg:flex max-lg:space-x-2 lg:space-x-2">
                    <button className="text-white w-20 border-0 bg-gray-400 btn">Print</button>
                    <button className="text-white w-20 border-0 bg-red-400 btn">Hapus</button>
                </div>
            </div>
            <input type="text" placeholder="Pencarian" className="input mt-5 bg-white text-gray-900 input-bordered w-full max-w-xs" />
            <Perpage />
            <TableList />
            <Pagination />
        </>
    )
}