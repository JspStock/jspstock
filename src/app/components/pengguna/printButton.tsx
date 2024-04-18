"use client"

import useStore from "@/app/(public)/(main)/pengguna/store"
import { $Enums } from "@prisma/client"
import { useRef } from "react"
import { useReactToPrint } from "react-to-print"

const PrintButton = () => {
    const select = useStore(state => state.select)
    const ref = useRef(null)
    const handlePrint = useReactToPrint({
        documentTitle: 'Daftar Pengguna',
        content: () => ref.current
    })

    return <>
        <button className="text-white w-20 border-0 bg-gray-400 btn" disabled={select.length == 0} onClick={handlePrint}>
            Print
        </button>

        <div className="hidden">
            <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900" ref={ref}>
                <h1 className="text-2xl font-semibold">Daftar Pengguna</h1>
                <table className="table mt-5">
                    <thead className=" text-gray-900">
                        <tr>
                            <th>Nama Pengguna</th>
                            <th>Email</th>
                            <th>No WhatsApp</th>
                            <th>Role</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            select.map((e, index) => <tr key={index}>
                                <td>{e.name}</td>
                                <td>{e.email}</td>
                                <td>{e.noWa}</td>
                                <td className="capitalize">{e.role.split("_").join(" ").toLowerCase()}</td>
                                <td>
                                    <div className={`${e.status == $Enums.UserStatus.AKTIF ? 'bg-blue-900' : 'bg-red-400'} text-center text-xs w-20 p-1 rounded-lg font-semibold text-white`}>
                                        {e.status}
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