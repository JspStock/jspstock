"use client"

import useStore from "@/app/(public)/(main)/toko/store"
import { useRef } from "react"
import { useReactToPrint } from "react-to-print"

const PrintButton = () => {
    const select = useStore(state => state.select)
    const ref = useRef(null)
    const handlePrint = useReactToPrint({
        documentTitle: 'Daftar Toko',
        content: () => ref.current
    })

    return <>
        <button className="text-white w-20 border-0 bg-gray-400 btn" disabled={select.length == 0} onClick={handlePrint}>Print</button>

        <div className="hidden">
            <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900" ref={ref}>
                <h1 className="text-2xl font-semibold">Daftar Toko</h1>
                <table className="table mt-5">
                    <thead className=" text-gray-900">
                        <tr>
                            <th>Toko</th>
                            <th>No WhatsApp</th>
                            <th>Email</th>
                            <th>Alamat</th>
                            <th>Jumlah Produk</th>
                            <th>Quantity Stok</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            select.map((e, index) => <tr key={index}>
                                <td>{e.name}</td>
                                <td>{e.noWa}</td>
                                <td>{e.email}</td>
                                <td>{e.address}</td>
                                <td>{e.product.length}</td>
                                <td>{e.product.length > 0 ? e.product.map(a =>
                                    (a.purchaseOrder.length > 0 ? a.purchaseOrder.map(a => a.qty).reduce((val, prev) => val + prev) : 0) -
                                    (a.saleOrder.length > 0 ? a.saleOrder.map(a => a.qty).reduce((val, prev) => val + prev) : 0) +
                                    (a.saleReturnOrders.length > 0 ? a.saleReturnOrders.map(a => a.qty).reduce((val, prev) => val + prev) : 0) -
                                    (a.purchaseReturnOrders.length > 0 ? a.purchaseReturnOrders.map(a => a.qty).reduce((val, prev) => val + prev) : 0)
                                ) : 0}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </>
}

export default PrintButton