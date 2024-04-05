"use client"

import useStore from "@/app/(public)/(main)/pembelian/listpembelian/store"
import { currencyFormat } from "@/utils/utils"
import { $Enums } from "@prisma/client"
import { useRef, useState } from "react"
import { useReactToPrint } from "react-to-print"

const PrintButton = () => {
    const select = useStore(state => state.select)
    const [isLoading, setIsLoading] = useState(false)
    const ref = useRef(null)
    const handlePrint = useReactToPrint({
        documentTitle: 'Daftar Pembelian',
        content: () => ref.current,
        onBeforeGetContent: () => setIsLoading(true),
        onBeforePrint: () => setIsLoading(false)
    })
    const setColorPurchaseStatus = (color: $Enums.PurchaseStatus) => $Enums.PurchaseStatus.DITERIMA == color ? "bg-green-400"
        : $Enums.PurchaseStatus.SEBAGIAN == color ? "bg-yellow-400"
            : $Enums.PurchaseStatus.TERTUNDA == color ? "bg-blue-400" : "bg-red-400"

    return <>
        <button className="text-white w-20 border-0 bg-gray-400 btn" disabled={select.length == 0 || isLoading} onClick={handlePrint}>
            { isLoading ? <div className="loading"></div> : null }
            <span>Print</span>
        </button>

        <div className="hidden">
            <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900" ref={ref}>
            <h1 className="text-2xl semibold"> Daftar Produk </h1>
                <table className="table mt-5">
                    <thead className=" text-gray-900">
                        <tr>
                            <th>Tanggal</th>
                            <th>Referensi</th>
                            <th>Supplier</th>
                            <th>Status Pembelian</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {select.map(e => <tr key={e.id}>
                            <td> {e.date} </td>
                            <td>{e.id}</td>
                            <td>{e.supplier}</td>
                            <td>
                                <div className={`${setColorPurchaseStatus(e.purchaseStatus as keyof typeof $Enums.PurchaseStatus)} text-center text-xs w-20 p-1 rounded-lg font-semibold text-white`}>
                                    {e.purchaseStatus}
                                </div>
                            </td>
                            <td>{e.total}</td>
                        </tr>)}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Total</th>
                            <th></th>
                            <th></th>
                            <th>{currencyFormat( select.length > 0 ? select.map(e => e.total).reduce((val, prev) => val + prev) : 0 )}</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </>
}

export default PrintButton