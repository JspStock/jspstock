"use client"

import { GetTransactionRecordPayload } from "@/app/(public)/(main)/akutansi/neraca/action"
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
    const sumCredit = (data: GetTransactionRecordPayload['transactionRecords']) => data.map(e => e.credit).reduce((val, prev) => val + prev)
    const sumDebit = (data: GetTransactionRecordPayload['transactionRecords']) => data.map(e => e.debit).reduce((val, prev) => val + prev)

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
                            <td>-{currencyFormat(sumCredit(e.transactionRecords))}</td>
                            <td>{currencyFormat(sumDebit(e.transactionRecords))}</td>
                            <td>{currencyFormat(e.startingBalance + sumDebit(e.transactionRecords) - sumCredit(e.transactionRecords))}</td>
                        </tr>)
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th>Total</th>
                        <th></th>
                        <td>-{currencyFormat(select.length > 0 ? select.map(e => sumCredit(e.transactionRecords)).reduce((val, prev) => val + prev) : 0)}</td>
                        <td>{currencyFormat(select.length > 0 ? select.map(e => sumDebit(e.transactionRecords)).reduce((val, prev) => val + prev) : 0)}</td>
                        <td>{currencyFormat(select.length > 0 ? select.map(e => e.startingBalance + sumDebit(e.transactionRecords) - sumCredit(e.transactionRecords)).reduce((val, prev) => val + prev) : 0)}</td>
                    </tr>
                </tfoot>
            </table>
            </div>
        </div>
    </>
}

export default PrintButton