"use client"

import useStore from "@/app/(public)/(main)/pengguna/costomer/store"
import { useRef, useState } from "react"
import { useReactToPrint } from "react-to-print"

const PrintButton = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const select = useStore(state => state.select)
    const ref = useRef(null)
    const handlePrint = useReactToPrint({
        documentTitle: 'Daftar kustomer',
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
                <h1 className="text-2xl font-semibold">Daftar kustomer</h1>
                <table className="table mt-5">
                    <thead className=" text-gray-900">
                        <tr>
                            <th>Grup Costomer</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>No WhatsApp</th>
                            <th>Alamat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            select.map(e => <tr key={e.id}>
                                <td>{e.customerGroup ? e.customerGroup.name : 'N/A'}</td>
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
    </>
}

export default PrintButton