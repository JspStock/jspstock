"use client"

import useStore from "@/app/(public)/(main)/akutansi/listrekening/store"
import { currencyFormat } from "@/utils/utils"
import { useRef, useState } from "react"
import { useReactToPrint } from "react-to-print"

const PrintButton = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const select = useStore(state => state.select)
    const ref = useRef(null)
    const handlePrint = useReactToPrint({
        documentTitle: 'Daftar Rekening',
        content: () => ref.current,
        onBeforeGetContent: () => setIsLoading(true),
        onBeforePrint: () => setIsLoading(false)
    })
    return <>
        <button className="text-white w-20 border-0 bg-gray-400 btn" disabled={isLoading || select.length == 0} onClick={handlePrint}>
            { isLoading ? <div className="loading"></div> : null }
            <span>Print</span>
        </button>

        <div className="hidden">
            <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900" ref={ref}>
                <h1 className="text-2xl font-semibold">Daftar Rekening</h1>
                <table className="table mt-5">
                    <thead className=" text-gray-900">
                        <tr>
                            <th>No Rekening</th>
                            <th>Nama</th>
                            <th>Saldo Total</th>
                            <th>Catatan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {select.map((e, index) => <tr key={index}>
                            <td>{e.id}</td>
                            <td>{e.name}</td>
                            <td>{currencyFormat(e.startingBalance)}</td>
                            <td>{e.notes}</td>
                        </tr>)}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Total</th>
                            <th>{currencyFormat(select.length > 0 ? select.map(e => e.startingBalance).reduce((val, prev) => val + prev) : 0)}</th>
                        </tr>
                    </tfoot>
                </table>
            </div>

        </div>
    </>
}

export default PrintButton