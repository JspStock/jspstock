"use client"

import useStore from "@/app/(public)/(main)/akutansi/neraca/store"
import { currencyFormat } from "@/utils/utils"
import { useRef, useState } from "react"
import { useReactToPrint } from "react-to-print"

const PrintButton = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const select = useStore(state => state.select)
    const ref = useRef(null)
    const handlePrint = useReactToPrint({
        documentTitle: 'Neraca Keuangan',
        content: () => ref.current,
        onBeforeGetContent: () => setIsLoading(true),
        onBeforePrint: () => setIsLoading(false)
    })

    return <>
        <button
            className="text-white w-20 border-0 bg-gray-400 btn"
            disabled={select.length == 0 || isLoading}
            onClick={handlePrint}>
            {isLoading ? <div className="loading"></div> : null}
            <span>Print</span>
        </button>

        <div className="hidden">
            <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900" ref={ref}>
                <table className="table">
                    <thead className=" text-gray-900">
                        <tr>
                            <th>Nama</th>
                            <th>Nomor Rekening</th>
                            <th>Kredit</th>
                            <th>Debit</th>
                            <th>Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            select.map((e, index) => <tr key={index}>
                                <td>{e.name}</td>
                                <td>{e.id}</td>
                                <td>{currencyFormat(
                                    (e.recipient.length > 0 ? e.recipient.map(a => a.total).reduce((val, prev) => val + prev) : 0) +
                                    (e.sales.length > 0 ? e.sales.map(a => a.saleOrder.map(b => b.qty * b.product.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) +
                                    (e.purchaseReturns.length > 0 ? e.purchaseReturns.map(a => a.purchaseReturnOrders.map(b => b.qty * b.product!.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0))}</td>
                                <td>-{currencyFormat(
                                    (e.sender.length > 0 ? e.sender.map(a => a.total).reduce((val, prev) => val + prev) : 0) +
                                    (e.purchase.length > 0 ? e.purchase.map(a => a.purchaseOrder.map(b => b.qty * b.product.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) +
                                    (e.saleReturns.length > 0 ? e.saleReturns.map(a => a.saleReturnOrders.map(b => b.qty * b.product!.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) +
                                    (e.expenditures.length > 0 ? e.expenditures.map(a => a.total).reduce((val, prev) => val + prev) : 0)
                                )}</td>
                                <td>{currencyFormat(
                                    e.startingBalance +
                                    (((e.recipient.length > 0 ? e.recipient.map(a => a.total).reduce((val, prev) => val + prev) : 0) +
                                        (e.sales.length > 0 ? e.sales.map(a => a.saleOrder.map(b => b.qty * b.product.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) +
                                        (e.purchaseReturns.length > 0 ? e.purchaseReturns.map(a => a.purchaseReturnOrders.map(b => b.qty * b.product!.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0)) -

                                        ((e.sender.length > 0 ? e.sender.map(a => a.total).reduce((val, prev) => val + prev) : 0) +
                                            (e.purchase.length > 0 ? e.purchase.map(a => a.purchaseOrder.map(b => b.qty * b.product.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) +
                                            (e.saleReturns.length > 0 ? e.saleReturns.map(a => a.saleReturnOrders.map(b => b.qty * b.product!.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) +
                                            (e.expenditures.length > 0 ? e.expenditures.map(a => a.total).reduce((val, prev) => val + prev) : 0)))
                                )}</td>
                            </tr>)
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Total</th>
                            <th></th>
                            <td>{currencyFormat(
                                select.length > 0 ? select.map(e =>
                                    (e.recipient.length > 0 ? e.recipient.map(a => a.total).reduce((val, prev) => val + prev) : 0) +
                                    (e.sales.length > 0 ? e.sales.map(a => a.saleOrder.map(b => b.qty * b.product.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) +
                                    (e.purchaseReturns.length > 0 ? e.purchaseReturns.map(a => a.purchaseReturnOrders.map(b => b.qty * b.product!.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0)
                                ).reduce((val, prev) => val + prev) : 0
                            )}</td>
                            <td>-{currencyFormat(
                                select.length > 0 ? select.map(e =>
                                    (e.sender.length > 0 ? e.sender.map(a => a.total).reduce((val, prev) => val + prev) : 0) +
                                    (e.purchase.length > 0 ? e.purchase.map(a => a.purchaseOrder.map(b => b.qty * b.product.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) +
                                    (e.saleReturns.length > 0 ? e.saleReturns.map(a => a.saleReturnOrders.map(b => b.qty * b.product!.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) +
                                    (e.expenditures.length > 0 ? e.expenditures.map(a => a.total).reduce((val, prev) => val + prev) : 0)
                                ).reduce((val, prev) => val + prev) : 0
                            )}</td>
                            <td>{currencyFormat(
                                select.length > 0 ? select.map(e =>
                                    e.startingBalance +
                                    (((e.recipient.length > 0 ? e.recipient.map(a => a.total).reduce((val, prev) => val + prev) : 0) +
                                        (e.sales.length > 0 ? e.sales.map(a => a.saleOrder.map(b => b.qty * b.product.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) +
                                        (e.purchaseReturns.length > 0 ? e.purchaseReturns.map(a => a.purchaseReturnOrders.map(b => b.qty * b.product!.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0)) -

                                        ((e.sender.length > 0 ? e.sender.map(a => a.total).reduce((val, prev) => val + prev) : 0) +
                                            (e.purchase.length > 0 ? e.purchase.map(a => a.purchaseOrder.map(b => b.qty * b.product.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) +
                                            (e.saleReturns.length > 0 ? e.saleReturns.map(a => a.saleReturnOrders.map(b => b.qty * b.product!.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) +
                                            (e.expenditures.length > 0 ? e.expenditures.map(a => a.total).reduce((val, prev) => val + prev) : 0)))
                                ).reduce((val, prev) => val + prev) : 0
                            )}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </>
}

export default PrintButton