import dynamic from "next/dynamic"
import Link from "next/link"

const TableList = dynamic(() => import("@/app/components/pengguna/grupcostomer/table"))
const Pagination = dynamic(() => import("@/app/components/pengguna/grupcostomer/pagination"))
const Perpage = dynamic(() => import("@/app/components/pengguna/grupcostomer/perpage"))

export default function Grupcostomer() {
    return (
        <>
            <div className="flex max-lg:grid max-lg:space-y-2 lg:space-x-2">
                <Link href="/pengguna/grupcostomer/tambah" className="text-white w-62 border-0 bg-red-400 btn">+ Tambah Grup Costomer</Link>
                <div className="max-lg:flex max-lg:space-x-2 lg:space-x-2">
                    <button className="text-white w-20 border-0 bg-gray-400 btn">Print</button>
                    <button className="text-white w-20 border-0 bg-red-400 btn">Hapus</button>
                </div>
            </div>
            <Perpage />
            <TableList />
            <Pagination />
        </>
    )
}