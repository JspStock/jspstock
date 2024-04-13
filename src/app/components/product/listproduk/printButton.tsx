"use client"

import useStore from "@/app/(public)/(main)/produk/listproduk/store"
import { currencyFormat } from "@/utils/utils"
import Image from "next/image"
import { useRef, useState } from "react"
import { useReactToPrint } from "react-to-print"

const PrintButton = () => {
    const [isLoading, setIsloading] = useState<boolean>()
    const selected = useStore(state => state.select)
    const printRef = useRef(null)
    const handlePrint = useReactToPrint({
        documentTitle: 'Daftar Produk',
        onBeforeGetContent: () => setIsloading(true),
        onBeforePrint: () => setIsloading(false),
        content: () => printRef.current
    })

    return <>
        <div className="hidden">
            <div className="bg-white p-10 my-5 text-gray-900" ref={printRef}>
                <h1 className="text-2xl semibold"> Daftar Produk </h1>
                <table className="table mt-5 table-zebra">
                    <thead className=" text-gray-900">
                        <tr>
                            <th>Foto</th>
                            <th>Nama</th>
                            <th>Kode</th>
                            <th>Kategori</th>
                            <th>Quantity</th>
                            <th>Harga</th>
                            <th>Biaya</th>
                            <th>Nilai Pasti(Harga - Biaya)</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            selected.map(e => <tr key={e.id}>
                                <td>
                                    <div className="avatar">
                                        <div className="w-20 rounded">
                                            <Image
                                                src={e.imagePath}
                                                width={0}
                                                height={0}
                                                sizes="100vw"
                                                className="w-full h-auto"
                                                quality={100}
                                                alt={e.name} />
                                        </div>
                                    </div>
                                </td>
                                <td>{e.name}</td>
                                <td>{e.id.split("_")[1]}</td>
                                <td>{e.productCategories ? e.productCategories.name : 'N/A'}</td>
                                <td>{
                                    (e.purchaseOrder.length > 0 ? e.purchaseOrder.map(a => a.qty - (a.purchase.purchaseReturns.length > 0 ? a.purchase.purchaseReturns.map(b => b.qty).reduce((val, prev) => val + prev) : 0)).reduce((val, prev) => val + prev) : 0) -
                                    (e.saleOrder.length > 0 ? e.saleOrder.map(a => a.qty + (a.sale.saleReturns.length > 0 ? a.sale.saleReturns.map(b => b.qty).reduce((val, prev) => val + prev) : 0)).reduce((val, prev) => val + prev) : 0)
                                }</td>
                                <td>{currencyFormat(e.price)}</td>
                                <td>{currencyFormat(e.cost)}</td>
                                <td>{currencyFormat(e.price - e.cost)}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
        <button className="text-white w-20 border-0 bg-gray-400 btn" disabled={isLoading || selected.length == 0} onClick={handlePrint}>
            {isLoading ? <div className="loading"></div> : null}
            <span>Print</span>
        </button>
    </>
}

export default PrintButton