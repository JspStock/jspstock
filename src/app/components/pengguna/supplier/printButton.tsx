"use client"

import useStore from "@/app/(public)/(main)/pengguna/supplier/store"
import { useRef, useState } from "react"
import { useReactToPrint } from "react-to-print"

const PrintButton = () => {
    const select = useStore(state => state.select)
    const [isLoading, setIsLoading] = useState<boolean>()
    const tableRef = useRef(null)
    const handleClick = useReactToPrint({
        documentTitle: 'Supplier',
        onBeforeGetContent: () => setIsLoading(true),
        onBeforePrint: () => setIsLoading(false),
        content: () => tableRef.current
    })

    return <>
        <div className="hidden">
            <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900" ref={tableRef}>
                <h1 className="text-2xl font-semibold">Supplier</h1>
                <table className="table mt-5 table-zebra">
                    <thead className=" text-gray-900">
                        <tr>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>No WhatsApp</th>
                            <th>Alamat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            select.map(e => <tr key={e.id}>
                                <td>{e.name}</td>
                                <td>{e.email}</td>
                                <td>{e.noWa}</td>
                                <td>{e.address}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>

        <button className="text-white w-20 border-0 bg-gray-400 btn" disabled={select.length == 0 || isLoading} onClick={handleClick}>
            { isLoading ? <div className="loading"></div> : null }
            <span>Print</span>
        </button>
    </>
}

export default PrintButton