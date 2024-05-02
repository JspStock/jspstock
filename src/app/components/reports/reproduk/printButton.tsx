"use client"

import { GetProductPayload } from "@/app/(public)/(main)/reports/repproduk/action"
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

    const saleQty = (e: GetProductPayload) => e.saleOrder.length > 0 ? e.saleOrder.map(a => a.qty).reduce((val, prev) => val + prev) : 0
    const saleTotal = (e: GetProductPayload) => e.saleOrder.length > 0 ? e.price * e.saleOrder.map(a => a.qty).reduce((val, prev) => val + prev) : 0
    const saleReturnQty = (e: GetProductPayload) => e.saleReturnOrders.length > 0 ? e.saleReturnOrders.map(a => a.qty).reduce((val, prev) => val + prev) : 0
    const saleReturnTotal = (e: GetProductPayload) => e.saleReturnOrders.length > 0 ? e.price * e.saleReturnOrders.map(a => a.qty).reduce((val, prev) => val + prev) : 0

    return <>
        <button className="text-white w-20 border-0 bg-gray-400 btn" onClick={handlePrint} disabled={select.length == 0}>Print</button>
        <div className="hidden">
            <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900" ref={ref}>
                <h1 className="text-2xl font-semibold">Laporan Produk</h1>
                <table className="table">
                <thead className=" text-gray-900">
                    <tr>
                        <th>Nama Produk</th>
                        <th>Terjual Qty</th>
                        <th>Jumlah yang Terjual</th>
                        <th>Pengembalian Penjualan Qty</th>
                        <th>Pengembalian Penjualan</th>
                        <th>Laba/Profit</th>
                        <th>Persediaan</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        select.map((e, index) => <tr key={index}>
                            <td>{e.name}</td>
                            <td>{saleQty(e)}</td>
                            <td>{currencyFormat(saleTotal(e))}</td>
                            <td>{saleReturnQty(e)}</td>
                            <td>{currencyFormat(saleReturnTotal(e))}</td>
                            <td>{currencyFormat(saleTotal(e) - saleReturnTotal(e))}</td>
                            <td>{e.qty + saleQty(e) - saleReturnQty(e)}</td>
                        </tr>)
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Total</th>
                        <th>{select.length > 0 ? select.map(e => saleQty(e)).reduce((val, prev) => val + prev) : 0}</th>
                        <th>{select.length > 0 ? currencyFormat(select.map(e => saleTotal(e)).reduce((val, prev) => val + prev)) : 0}</th>
                        <th>{select.length > 0 ? select.map(e => saleReturnQty(e)).reduce((val, prev) => val + prev) : 0}</th>
                        <th>{select.length > 0 ? currencyFormat(select.map(e => saleReturnTotal(e)).reduce((val, prev) => val + prev)) : 0}</th>
                        <th>{select.length > 0 ? currencyFormat(select.map(e => saleTotal(e) - saleReturnTotal(e)).reduce((val, prev) => val + prev)) : 0}</th>
                        <th>{select.length > 0 ? select.map(e => e.qty + saleQty(e) - saleReturnQty(e) ).reduce((val, prev) => val + prev) : 0}</th>
                    </tr>
                </tfoot>
            </table>
            </div>
        </div>
    </>
}

export default PrintButton