import { Metadata } from "next"
import dynamic from "next/dynamic"
import Link from "next/link"

const TableList = dynamic(() => import("@/app/components/pembelian/listpembelian/table"))
const Pagination = dynamic(() => import("@/app/components/pembelian/listpembelian/pagination"))
const Perpage = dynamic(() => import("@/app/components/pembelian/listpembelian/perpage"))
const Datepicker = dynamic(() => import("@/app/components/pembelian/listpembelian/datepicker"))
const TabsList = dynamic(() => import("@/app/components/pembelian/listpembelian/tablist"))

export const metadata: Metadata = {
    title: "Daftar pembelian"
}

export default function Listpembelian() {
    return (
        <>
            <div className="lg:flex mb-5 w-full items-center justify-center p-5 bg-white rounded-lg space-x-2">
                <Datepicker />
            </div>
            <div className="flex max-lg:grid max-lg:space-y-2 lg:space-x-2">
                <Link href="/pembelian/tambahpembelian" className="text-white w-62 border-0 bg-green-500 btn">+ Tambah List Pembelian</Link>
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