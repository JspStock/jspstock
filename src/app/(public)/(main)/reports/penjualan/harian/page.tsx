import { Metadata } from "next"
import dynamic from "next/dynamic"
import { getSales } from "./action"
import { currencyFormat } from "@/utils/utils"

const Calendar = dynamic(() => import('@/app/components/calendar'))

export const metadata: Metadata = {
    title: 'Laporan penjualan harian'
}

export interface SearchParams {
    month?: string,
    year?: string
}

export default async function page({ searchParams }: { searchParams: SearchParams }) {
    const data = await getSales({
        year: searchParams.year ? !isNaN(parseInt(searchParams.year)) ? parseInt(searchParams.year) : undefined : undefined,
        month: searchParams.month ? !isNaN(parseInt(searchParams.month)) ? parseInt(searchParams.month) : undefined : undefined,
    })

    return <div className="bg-white p-10 rounded-box overflow-x-auto">
        <Calendar
            data={data.map(e => ({
                year: e.createdAt.getFullYear(),
                day: e.createdAt.getDate(),
                month: e.createdAt.getMonth() + 1,
                content: <div className="space-y-2 text-start">
                    <article>
                        <h1 className="font-semibold">Diskon</h1>
                        <p>{currencyFormat(
                            data.filter(a => a.createdAt.getMonth() == e.createdAt.getMonth() && e.createdAt.getDate() == a.createdAt.getDate() && a.createdAt.getFullYear() == e.createdAt.getFullYear()).map(a => a.discount).reduce((val, prev) => val + prev)
                        )}</p>
                    </article>

                    <article>
                        <h1 className="font-semibold">Biaya Pengiriman</h1>
                        <p>{currencyFormat(
                            data.filter(a => a.createdAt.getMonth() == e.createdAt.getMonth() && e.createdAt.getDate() == a.createdAt.getDate() && a.createdAt.getFullYear() == e.createdAt.getFullYear()).map(a => a.shippingCost).reduce((val, prev) => val + prev)
                        )}</p>
                    </article>

                    <article>
                        <h1 className="font-semibold">Sub Total</h1>
                        <h1>{currencyFormat(
                            data.filter(a => a.createdAt.getMonth() == e.createdAt.getMonth() && e.createdAt.getDate() == a.createdAt.getDate() && a.createdAt.getFullYear() == e.createdAt.getFullYear()).map(a => a.saleOrder.map(b => b.qty * b.product.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev)
                        )}</h1>
                    </article>

                    <article>
                        <h1 className="font-semibold">Total</h1>
                        <h1>{currencyFormat(
                            data.filter(a => a.createdAt.getMonth() == e.createdAt.getMonth() && e.createdAt.getDate() == a.createdAt.getDate() && a.createdAt.getFullYear() == e.createdAt.getFullYear()).map(a => (a.shippingCost + a.saleOrder.map(b => b.qty * b.product.price).reduce((val, prev) => val + prev)) - a.discount).reduce((val, prev) => val + prev)
                        )}</h1>
                    </article>
                </div>
            }))} />
    </div>
}