import dynamic from "next/dynamic"
import Link from "next/link"
import TableList from "@/app/components/pengguna/grupcostomer/table"
import { Suspense } from "react"
import { Metadata } from "next"

const TableLoadingSkeleton = dynamic(() => import('@/app/components/tableLoadingSkeleton'))
const Perpage = dynamic(() => import("@/app/components/pengguna/grupcostomer/perpage"))
const PrintButton = dynamic(() => import('@/app/components/pengguna/grupcostomer/printButton'))
const DeleteButton = dynamic(() => import('@/app/components/pengguna/grupcostomer/deleteButton'))

export interface SearchParams {
    show?: string,
    page?: string
}

export const metadata: Metadata = {
    title: 'Grub kustomer'
}

export default function Grupcostomer({ searchParams }: { searchParams: SearchParams }) {
    return (
        <>
            <div className="flex max-lg:grid max-lg:space-y-2 lg:space-x-2">
                <Link href="/pengguna/grupcostomer/tambah" className="text-white w-62 border-0 bg-red-400 btn">+ Tambah Grup Costomer</Link>
                <div className="max-lg:flex max-lg:space-x-2 lg:space-x-2">
                    <PrintButton />
                    <DeleteButton />
                </div>
            </div>
            <Perpage />

            <Suspense fallback={<TableLoadingSkeleton />} key={`${searchParams.page}-${searchParams.show}`}>
                <TableList searchParams={searchParams} />
            </Suspense>
        </>
    )
}