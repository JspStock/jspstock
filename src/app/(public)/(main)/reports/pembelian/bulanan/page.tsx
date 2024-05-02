import dynamic from "next/dynamic"
import { getPurchase } from "./action"
import { currencyFormat } from "@/utils/utils"
import { Metadata } from "next"

const Calender = dynamic(() => import('@/app/components/calendar'))

interface SearchParams{
    year?: string,
    month?: string
}

export const metadata: Metadata = {
    title: 'Laporan pembelian bulanan'
}

export default async function page({ searchParams }: { searchParams: SearchParams }) {
    const sales = await getPurchase({
        year: searchParams.year ? !isNaN(parseInt(searchParams.year)) ? parseInt(searchParams.year) : undefined : undefined,
    })

    return <div className="bg-white p-10 overflow-auto">
        <Calender
            data={sales.map(e => ({
                year: e.createdAt.getFullYear(),
                day: e.createdAt.getDate(),
                month: e.createdAt.getMonth() + 1,
                content: <div className="space-y-2 text-start">
                    <article>
                        <h1 className="font-semibold">Total</h1>
                        <h1>{currencyFormat(
                            sales.filter(a => a.createdAt.getMonth() == e.createdAt.getMonth() && a.createdAt.getFullYear() == e.createdAt.getFullYear()).map(a => a.total).reduce((val, prev) => val + prev)
                        )}</h1>
                    </article>
                </div>
            }))}
            views="year" />
    </div>
}