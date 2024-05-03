import { Metadata } from "next"
import dynamic from "next/dynamic"
import { GetSavingAccountsPayLoad, getSavingAccounts } from "./action"
import Table from '@/app/components/akutansi/rekeningnasabah/table'
import { Suspense } from "react"

const Form = dynamic(() => import("@/app/components/akutansi/rekeningnasabah/form"))
const TableLoaderSkeleton = dynamic(() => import('@/app/components/tableLoadingSkeleton'))
const SearchForm = dynamic(() => import('@/app/components/searchForm'))
const PrintButton = dynamic(() => import('@/app/components/akutansi/rekeningnasabah/printButton'))

export interface SearchParams {
    date?: string,
    account?: string,
    search?: string
}

export const metadata: Metadata = {
    title: 'Rekening Nasabah'
}

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
    const savingAccounts: Array<GetSavingAccountsPayLoad> = await getSavingAccounts()

    return (
        <main className="bg-white p-14 max-md:p-5 w-full">
            <h1 className="text-gray-900 font-semibold text-xl">Rekening Nasabah</h1>
            <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
            <Form
                savingAccounts={savingAccounts} />

            <div className="flex lg:justify-between max-lg:grid max-lg:space-y-5 items-center mb-10">
                <SearchForm />
                <PrintButton />
            </div>

            <Suspense fallback={<TableLoaderSkeleton />} key={`${searchParams.account}_${searchParams.date}_${searchParams.search}`}>
                {
                    searchParams.account && searchParams.date ? <Table
                        searchParams={searchParams} /> : null
                }

            </Suspense>
        </main>
    )
}
export default page