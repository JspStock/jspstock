"use client"

import useStore from "@/app/(public)/(main)/akutansi/rekeningnasabah/store"
import { currencyFormat } from "@/utils/utils"
import moment from "moment"
import { useRef } from "react"
import { useReactToPrint } from "react-to-print"

const PrintButton = () => {
    const select = useStore(state => state.select)
    const ref = useRef(null)
    const handlePrint = useReactToPrint({
        documentTitle: 'Rekening Nasabah',
        content: () => ref.current
    })

    return <>
        <button className="btn w-fit" disabled={select.length == 0} onClick={handlePrint}>Print</button>

        <div className="hidden">
            <section ref={ref} className="p-10">
                <h1 className="text-2xl font-semibold">Rekening Nasabah</h1>
                <table className="table w-full mt-5">
                    <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>Nomor Transaksi</th>
                            <th>Kredit</th>
                            <th>Debit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            select.map((e, index) => <tr key={index}>
                                <td>{moment(e.createdAt).format('DD-MM-YYYY')}</td>
                                <td>{e.reference}</td>
                                <td>{currencyFormat(e.credit)}</td>
                                <td>{currencyFormat(e.debit)}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </section>
        </div>
    </>
}

export default PrintButton