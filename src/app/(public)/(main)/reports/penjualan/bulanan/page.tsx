import dynamic from "next/dynamic"

const TableList = dynamic(() => import("@/app/components/reports/penjualan/bulanan/table"))
const Pagination = dynamic(() => import("@/app/components/reports/penjualan/bulanan/pagination"))

export default function Penjualanbulanan() {
    return (
        <>
            <div className="flex max-lg:grid max-lg:space-y-2 lg:space-x-2">
                <div className="max-lg:flex max-lg:space-x-2 lg:space-x-2">
                    <button className="text-white w-20 border-0 bg-gray-400 btn">Print</button>
                    <button className="text-white w-20 border-0 bg-red-400 btn">Hapus</button>
                </div>
            </div>
            <input type="text" placeholder="Pencarian" className="input mt-5 bg-white text-gray-900 input-bordered w-full max-w-xs" />
            <Pagination />
            <div className="lg:flex w-full items-center mt-5 justify-center p-5 bg-white rounded-lg space-x-2">
                <h1 className="text-xl font-semibold">Tahun 2024</h1>
            </div>
            <TableList />
        </>
    )
}