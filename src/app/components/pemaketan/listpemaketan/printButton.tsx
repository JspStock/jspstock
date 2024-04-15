"use client"

import useStore from "@/app/(public)/(main)/pemaketan/listpemaketan/store"
import { $Enums } from "@prisma/client"
import moment from "moment"
import { useRef, useState } from "react"
import QRCode from "react-qr-code"
import { useReactToPrint } from "react-to-print"

const PrintButton = ({ BASE_URL }: {
    BASE_URL: string
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const ref = useRef(null)
    const select = useStore(state => state.select)
    const handlePrint = useReactToPrint({
        documentTitle: 'Daftar Pemaketan',
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
                <h1 className="text-2xl font-semibold">Daftar Pemaketan</h1>
                <table className="table mt-5">
                    <thead className=" text-gray-900">
                        <tr>
                            <th>Barcode</th>
                            <th>Tanggal</th>
                            <th>Referensi</th>
                            <th>Costomer</th>
                            <th>Status Pemaketan</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            select.map((e, index) => <tr key={index}>
                                <td>
                                    <QRCode
                                        value={`${BASE_URL}/package/${e.id}`}
                                        size={50} />
                                </td>
                                <td>{moment(e.createdAt).format("DD-MM-YYYY")}</td>
                                <td>{e.id}</td>
                                <td>{e.customerUser?.name}</td>
                                <td>
                                    <div className={`${e.status == $Enums.PackagingStatus.SEDANG_MENGIRIM ? 'bg-blue-400' : 'bg-green-400'} text-center text-xs max-w-fit p-1 rounded-lg font-semibold text-white`}>
                                        {e.status.split("_").join(" ")}
                                    </div>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </>
}

export default PrintButton