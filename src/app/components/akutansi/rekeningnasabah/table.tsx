import { getMutation } from "@/app/(public)/(main)/akutansi/rekeningnasabah/action"
import { SearchParams } from "@/app/(public)/(main)/akutansi/rekeningnasabah/page"
import { currencyFormat } from "@/utils/utils"
import moment from "moment"
import dynamic from "next/dynamic"

const CheckAll = dynamic(() => import('./(table)/checkAll'))
const Check = dynamic(() => import('./(table)/check'))

export interface Mutation {
    date: Date,
    ref: string,
    credit: number,
    debit: number
}

const Table = async ({ searchParams }: {
    searchParams: SearchParams
}) => {
    const data: Array<Mutation> = []
    const mutation = await getMutation(searchParams)

    mutation!.sales.map(e => {
        data.push({
            ref: e.id,
            credit: (e.shippingCost + e.saleOrder.map(a => a.qty * a.product.price).reduce((val, prev) => val + prev)) - e.discount,
            debit: 0,
            date: e.createdAt
        })
    })

    mutation!.saleReturns.map(e => {
        data.push({
            ref: e.id,
            debit: e.saleReturnOrders.map(a => a.qty * a.product!.price).reduce((val, prev) => val + prev),
            credit: 0,
            date: e.createdAt
        })
    })

    mutation!.purchase.map(e => {
        data.push({
            ref: e.id,
            debit: (e.shippingCost + e.purchaseOrder.map(a => a.qty * a.product.price).reduce((val, prev) => val + prev)) - e.discount,
            credit: 0,
            date: e.createdAt
        })
    })

    mutation!.purchaseReturns.map(e => {
        data.push({
            ref: e.id,
            credit: e.purchaseReturnOrders.map(a => a.qty * a.product!.price).reduce((val, prev) => val + prev),
            debit: 0,
            date: e.createdAt
        })
    })

    mutation!.recipient.map(e => {
        data.push({
            ref: e.id,
            credit: e.total,
            debit: 0,
            date: e.createdAt
        })
    })

    mutation!.sender.map(e => {
        data.push({
            ref: e.id,
            debit: e.total,
            credit: 0,
            date: e.createdAt
        })
    })

    data.sort((a, b) => b.date.getTime() - a.date.getTime())
    return <table className="table w-full">
        <thead>
            <tr>
                <th><CheckAll data={data} /></th>
                <th>Tanggal</th>
                <th>Nomor Transaksi</th>
                <th>Kredit</th>
                <th>Debit</th>
            </tr>
        </thead>
        <tbody>
            {
                data.map((e, index) => <tr key={index}>
                    <td><Check data={e} /></td>
                    <td>{moment(e.date).format('DD-MM-YYYY')}</td>
                    <td>{e.ref}</td>
                    <td>{currencyFormat(e.credit)}</td>
                    <td>{currencyFormat(e.debit)}</td>
                </tr>)
            }
        </tbody>
    </table>
}

export default Table