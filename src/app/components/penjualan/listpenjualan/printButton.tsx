"use client"

import { currencyFormat } from "@/utils/utils"
import { $Enums } from "@prisma/client"
import moment from "moment"
import useStore from "@/app/(public)/(main)/penjualan/listpenjualan/store"
import { useRef, useState } from "react"
import { useReactToPrint } from "react-to-print"

const PrintButton = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const select = useStore(state => state.select)
    const ref = useRef(null)
    const handlePrint = useReactToPrint({
        documentTitle: 'Daftar Penjualan',
        content: () => ref.current,
        onBeforeGetContent: () => setIsLoading(true),
        onBeforePrint: () => setIsLoading(false)
    })

    const generateBackColorForSaleStatus = (val: $Enums.SaleStatus) => $Enums.SaleStatus.SELESAI == val ? 'bg-green-400' : 'bg-red-400'
    const generateBackColorForPurchaseStatus = (color: $Enums.SalePurchaseStatus) => $Enums.SalePurchaseStatus.DIBAYAR == color ? "bg-green-400"
        : $Enums.PurchaseStatus.SEBAGIAN && $Enums.SalePurchaseStatus.TERTUNDA == color ? "bg-yellow-400"
            : $Enums.PurchaseStatus.TERTUNDA == color ? "bg-blue-400" : "bg-red-400"

    return <>
        <button className="text-white w-20 border-0 bg-gray-400 btn" disabled={select.length == 0 || isLoading} onClick={handlePrint}>
            { isLoading ? <div className="loading"></div> : null }
            <span>Print</span>
        </button>

        <div className="hidden">
            <div className="bg-white p-10 my-5 text-gray-900" ref={ref}>
                <h1 className="text-2xl font-semibold">Daftar Penjualan</h1>
                <table className="table mt-5">
                    <thead className=" text-gray-900">
                        <tr>
                            <th>Tanggal</th>
                            <th>Referensi</th>
                            <th>Costomer</th>
                            <th>Status Penjualan</th>
                            <th>Status Pembayaran</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            select.map((e, index) => <tr key={index}>
                                <td>{moment(e.createdAt).format('DD-MM-YYYY')}</td>
                                <td>{e.id}</td>
                                <td>{e.customerUser ? e.customerUser.name : 'N/A'}</td>
                                <td>
                                    <div className={`${generateBackColorForSaleStatus(e.saleStatus)} text-center text-xs w-20 p-1 rounded-lg font-semibold text-white`}>
                                        {e.saleStatus}
                                    </div>
                                </td>
                                <td>
                                    <div className={`${generateBackColorForPurchaseStatus(e.purchaseStatus)} text-center text-xs w-20 p-1 rounded-lg font-semibold text-white`}>
                                        {e.purchaseStatus}
                                    </div>
                                </td>
                                <td>{currencyFormat(e.saleOrder.map(val => val.qty * val.product.price).reduce((val, prev) => val + prev))}</td>
                            </tr>)
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Total</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>{currencyFormat(select.length > 0 ? select.map(e => (e.shippingCost + e.saleOrder.map(val => val.qty * val.product.price).reduce((val, prev) => val + prev)) - e.discount).reduce((val, prev) => val + prev) : 0)}</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </>
}

export default PrintButton