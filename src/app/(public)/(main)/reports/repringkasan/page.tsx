import { Metadata } from "next"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import WrapContent from "@/app/components/reports/ringkasan/wrapContent"

const Datepicker = dynamic(() => import("@/app/components/datePicker"))
const WrapContentLoader = dynamic(() => import('@/app/components/reports/ringkasan/loader'))

export const metadata: Metadata = {
    title: 'Laporan Ringkasan'
}

export interface SearchParams {
    date?: string
}

export default function page({ searchParams }: { searchParams: SearchParams }) {
    return (
        <>
            <div className="lg:flex mb-5 w-full items-center justify-center p-5 bg-white rounded-lg space-x-2">
                <Datepicker />
            </div>
            <Suspense key={searchParams.date} fallback={<WrapContentLoader />}>
                <WrapContent
                    searchParams={searchParams} />
            </Suspense>
        </>
    )
}