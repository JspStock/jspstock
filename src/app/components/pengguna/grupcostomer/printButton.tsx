"use client"

import useStore from "@/app/(public)/(main)/pengguna/grupcostomer/store"
import { useRef, useState } from "react"
import { useReactToPrint } from "react-to-print"

const PrintButton = () => {
    const [isLoading, setIsloading] = useState<boolean>(false)
    const select = useStore(state => state.select)
    const ref = useRef(null)
    const handlePrint = useReactToPrint({
        documentTitle: "Grub Kustomer",
        content: () => ref.current,
        onBeforeGetContent: () => setIsloading(true),
        onBeforePrint: () => setIsloading(false)
    })

    return <>
        <button className="text-white w-20 border-0 bg-gray-400 btn" disabled={select.length == 0 || isLoading} onClick={handlePrint}>
            { isLoading ? <div className="loading"></div> : null }
            <span>Print</span>
        </button>

        <div className="hidden">
            <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900" ref={ref}>
                <h1 className="text-2xl font-semibold">Grub Kustomer</h1>
                <table className="table mt-5">
                    <thead className=" text-gray-900">
                        <tr>
                            <th>Nama Grup</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            select.map((e, index) => <tr key={index}>
                                <td>{e.name}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </>
}

export default PrintButton