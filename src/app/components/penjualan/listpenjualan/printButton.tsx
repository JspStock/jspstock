"use client"

import { currencyFormat } from "@/utils/utils"
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
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            select.map((e, index) => <tr key={index}>
                                <td>{moment(e.createdAt).format('DD-MM-YYYY')}</td>
                                <td>{e.id}</td>
                                <td>{e.customerUser ? e.customerUser.name : 'N/A'}</td>
                                <td>{currencyFormat((e.shippingCost - e.saleOrder.map(val => val.qty * val.product.price).reduce((val, prev) => val + prev)) - e.discount)}</td>
                            </tr>)
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Total</th>
                            <th></th>
                            <th>{currencyFormat(select.length > 0 ? select.map(e => (e.shippingCost - e.saleOrder.map(val => val.qty * val.product.price).reduce((val, prev) => val + prev)) - e.discount).reduce((val, prev) => val + prev) : 0)}</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </>
}

export default PrintButton