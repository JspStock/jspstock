"use client"

import useStore from "@/app/(public)/(main)/reports/repproduk/store"
import { currencyFormat } from "@/utils/utils"
import { useRef } from "react"
import { useReactToPrint } from "react-to-print"

const PrintButton = () => {
    const select = useStore(state => state.select)
    const ref = useRef(null)
    const handlePrint = useReactToPrint({
        documentTitle: "Laporan Produk",
        content: () => ref.current,
    })

    return <>
        <button className="text-white w-20 border-0 bg-gray-400 btn" onClick={handlePrint} disabled={select.length == 0}>Print</button>
        <div className="hidden">
            <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900" ref={ref}>
                <h1 className="text-2xl font-semibold">Laporan Produk</h1>
                <table className="table mt-5">
                    <thead className=" text-gray-900">
                        <tr>
                            <th>Nama Produk</th>
                            <th>Dibeli Qty</th>
                            <th>Jumlah yang dibeli</th>
                            <th>Terjual Qty</th>
                            <th>Jumlah yang Terjual</th>
                            <th>Pengembalian Penjualan Qty</th>
                            <th>Pengembalian Penjualan</th>
                            <th>Pengembalian pembelian</th>
                            <th>Pengembalian pembelian Qty</th>
                            <th>Laba/Profit</th>
                            <th>Persediaan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            select.map((e, index) => <tr key={index}>
                                <td>{e.name}</td>
                                <td>{e.purchaseOrder.map(e => e.qty).reduce((val, prev) => val + prev)}</td>
                                <td>{currencyFormat(e.price * e.purchaseOrder.map(e => e.qty).reduce((val, prev) => val + prev))}</td>
                                <td>{e.saleOrder.map(e => e.qty).reduce((val, prev) => val + prev)}</td>
                                <td>{currencyFormat(e.price * e.saleOrder.map(a => a.qty).reduce((val, prev) => val + prev))}</td>
                                <td>{e.saleReturnOrders.map(e => e.qty).reduce((val, prev) => val + prev)}</td>
                                <td>{currencyFormat(e.price * e.saleReturnOrders.map(a => a.qty).reduce((val, prev) => val + prev))}</td>
                                <td>{e.purchaseReturnOrders.map(a => a.qty).reduce((val, prev) => val + prev)}</td>
                                <td>{currencyFormat(e.price * e.purchaseReturnOrders.map(a => a.qty).reduce((val, prev) => val + prev))}</td>
                                <td>{currencyFormat(
                                    (e.price * e.saleOrder.map(e => e.qty).reduce((val, prev) => val + prev)) -
                                    (e.price * e.purchaseOrder.map(e => e.qty).reduce((val, prev) => val + prev)) +
                                    (e.price * e.purchaseReturnOrders.map(e => e.qty).reduce((val, prev) => val + prev)) -
                                    (e.price * e.saleReturnOrders.map(e => e.qty).reduce((val, prev) => val + prev))
                                )}</td>
                                <td>{
                                    (e.purchaseOrder.map(e => e.qty).reduce((val, prev) => val + prev)) -
                                    (e.saleOrder.map(e => e.qty).reduce((val, prev) => val + prev)) -
                                    (e.purchaseReturnOrders.map(e => e.qty).reduce((val, prev) => val + prev)) +
                                    (e.saleReturnOrders.map(e => e.qty).reduce((val, prev) => val + prev))
                                }</td>
                            </tr>)
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Total</th>
                            <th>{select.length > 0 ? select.map(e => e.purchaseOrder.map(a => a.qty).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0}</th>
                            <th>{select.length > 0 ? currencyFormat(select.map(e => e.price * e.purchaseOrder.map(e => e.qty).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev)) : 0}</th>
                            <th>{select.length > 0 ? select.map(e => e.saleOrder.map(e => e.qty).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0}</th>
                            <th>{select.length > 0 ? currencyFormat(select.map(e => e.price * e.saleOrder.map(a => a.qty).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev)) : 0}</th>
                            <th>{select.length > 0 ? select.map(e => e.saleReturnOrders.map(e => e.qty).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0}</th>
                            <th>{select.length > 0 ? currencyFormat(select.map(e => e.price * e.saleReturnOrders.map(a => a.qty).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev)) : 0}</th>
                            <th>{select.length > 0 ? select.map(e => e.purchaseReturnOrders.map(a => a.qty).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0}</th>
                            <th>{select.length > 0 ? currencyFormat(select.map(e => e.price * e.purchaseReturnOrders.map(a => a.qty).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev)) : 0}</th>
                            <th>{select.length > 0 ? currencyFormat(select.map(e =>
                                (e.price * e.saleOrder.map(e => e.qty).reduce((val, prev) => val + prev)) -
                                (e.price * e.purchaseOrder.map(e => e.qty).reduce((val, prev) => val + prev)) +
                                (e.price * e.purchaseReturnOrders.map(e => e.qty).reduce((val, prev) => val + prev)) -
                                (e.price * e.saleReturnOrders.map(e => e.qty).reduce((val, prev) => val + prev))
                            ).reduce((val, prev) => val + prev)) : 0}</th>
                            <th>{select.length > 0 ? select.map(e =>
                                (e.purchaseOrder.map(e => e.qty).reduce((val, prev) => val + prev)) -
                                (e.saleOrder.map(e => e.qty).reduce((val, prev) => val + prev)) -
                                (e.purchaseReturnOrders.map(e => e.qty).reduce((val, prev) => val + prev)) +
                                (e.saleReturnOrders.map(e => e.qty).reduce((val, prev) => val + prev))
                            ).reduce((val, prev) => val + prev) : 0}</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </>
}

export default PrintButton