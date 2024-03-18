import dynamic from "next/dynamic"
import Link from "next/link"

const TableList = dynamic(() => import("@/app/components/pengguna/role/table"))
const Pagination = dynamic(() => import("@/app/components/pengguna/role/pagination"))
const Perpage = dynamic(() => import("@/app/components/pengguna/role/perpage"))

export default function Role() {
    return (
        <>
            <div className="flex space-x-2">
                <Link href="/pengguna/role/tambah" className="text-white w-62 border-0 bg-green-500 btn">+ Tambah Role</Link>
                <button className="text-white w-20 border-0 bg-gray-400 btn">Print</button>
            </div>
            <Perpage />
            <TableList />
            <Pagination />
        </>
    )
}