"use client"

import useStore from "@/app/(public)/(main)/pengembalian/pembelian/store"
import { currencyFormat } from "@/utils/utils"
import moment from "moment"
import { useRef, useState } from "react"
import { useReactToPrint } from "react-to-print"

const PrintButton = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const select = useStore(state => state.select)
    const ref = useRef(null)
    const handlePrint = useReactToPrint({
        documentTitle: 'Pengembalian Pembelian',
        onBeforeGetContent: () => setIsLoading(true),
        onBeforePrint: () => setIsLoading(false),
        content: () => ref.current
    })

    return <>
        <button className="text-white w-20 border-0 bg-gray-400 btn" disabled={isLoading || select.length == 0} onClick={handlePrint}>
            { isLoading ? <div className="loading"></div> : null }
            <span>Print</span>
        </button>

        <div className="hidden">
            <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900" ref={ref}>
                <h1 className="text-2xl font-semibold">Pengembalian Pembelian</h1>
                <table className="table mt-5">
                    <thead className=" text-gray-900">
                        <tr>
                            <th>Tanggal</th>
                            <th>Referensi</th>
                            <th>Supplier</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            select.map((e, index) => <tr key={index}>
                                <td>{moment(e.createdAt).format('DD-MM-YYYY')}</td>
                                <td>{e.id}</td>
                                <td>{e.supplier?.name}</td>
                                <td>{currencyFormat(e.purchaseReturnOrders.length > 0 ? e.purchaseReturnOrders.map(a => a.qty * a.product!.price).reduce((val, prev) => val + prev) : 0)}</td>
                            </tr>)
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Total</th>
                            <th></th>
                            <th></th>
                            <th>{currencyFormat(select.length > 0 ? select.map(e => e.purchaseReturnOrders.map(a => a.qty * a.product!.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0)}</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </>
}

export default PrintButton