import dynamic from "next/dynamic"
import Link from "next/link"

const TableList = dynamic(() => import("@/app/components/pemaketan/listpemaketan/table"))
const Pagination = dynamic(() => import("@/app/components/pemaketan/listpemaketan/pagination"))
const Perpage = dynamic(() => import("@/app/components/pemaketan/listpemaketan/perpage"))
const Datepicker = dynamic(() => import("@/app/components/pemaketan/listpemaketan/datepicker"))
const TabsList = dynamic(() => import("@/app/components/pemaketan/listpemaketan/tablist"))

export default function Listpemaketan() {
    return (
        <>
            <div className="lg:flex mb-5 w-full items-center justify-center p-5 bg-white rounded-lg space-x-2">
                <Datepicker />
                <button className="btn bg-blue-900 mt-9 text-white">Submit</button>
            </div>
            <div className="flex max-lg:grid max-lg:space-y-2 lg:space-x-2">
                <Link href="/pemaketan/listpemaketan/input" className="text-white w-64 border-0 bg-green-500 btn">+ Tambah List Pemaketan</Link>
                <div className="max-lg:flex max-lg:space-x-2 lg:space-x-2">
                    <button className="text-white w-20 border-0 bg-gray-400 btn">Print</button>
                    <button className="text-white w-20 border-0 bg-red-400 btn">Hapus</button>
                </div>
            </div>
            <input type="text" placeholder="Pencarian" className="input mt-5 bg-white text-gray-900 input-bordered w-full max-w-xs" />
            <Perpage />
            <TabsList />
            <TableList />
            <Pagination />
        </>
    )
}