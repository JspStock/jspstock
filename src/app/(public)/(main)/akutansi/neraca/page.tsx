import dynamic from "next/dynamic"
import Link from "next/link"

const TableList = dynamic(() => import("@/app/components/akutansi/neraca/table"))
const Pagination = dynamic(() => import("@/app/components/akutansi/neraca/pagination"))
const Perpage = dynamic(() => import("@/app/components/akutansi/neraca/perpage"))

export default function Neraca() {
    return (
        <>
            <input type="text" placeholder="Pencarian" className="input mt-5 bg-white text-gray-900 input-bordered w-full max-w-xs" />
            <Perpage />
            <TableList />
            <Pagination />
        </>
    )
}