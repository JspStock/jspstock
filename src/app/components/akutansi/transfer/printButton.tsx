"use client"

import useStore from "@/app/(public)/(main)/akutansi/transferuang/store"
import { currencyFormat } from "@/utils/utils"
import moment from "moment"
import { useRef, useState } from "react"
import { useReactToPrint } from "react-to-print"

const PrintButton = () => {
    const select = useStore(state => state.select)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const ref = useRef(null)
    const handlePrint = useReactToPrint({
        documentTitle: 'Transfer Uang',
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
                <h1 className="text-2xl font-semibold">Transfer Uang</h1>
                <table className="table mt-5">
                    <thead className=" text-gray-900">
                        <tr>
                            <th>Tanggal</th>
                            <th>No Referensi</th>
                            <th>Dari Rekening</th>
                            <th>Ke Rekening</th>
                            <th>Jumlah</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            select.map((e, index) => <tr key={index}>
                                <td>{moment(e.createdAt).format('DD-MM-YYYY')}</td>
                                <td>{e.id}</td>
                                <td>{`${e.fromSavingAccountRelation?.id}(${e.fromSavingAccountRelation?.name})`}</td>
                                <td>{`${e.toSavingAccountRelation?.id}(${e.toSavingAccountRelation?.name})`}</td>
                                <td>{currencyFormat(e.total)}</td>
                            </tr>)
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Total</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>{currencyFormat(select.length > 0 ? select.map(e => e.total).reduce((val, prev) => val + prev) : 0)}</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </>
}

export default PrintButton