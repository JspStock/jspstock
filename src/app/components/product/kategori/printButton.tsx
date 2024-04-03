"use client"

import Image from "next/image"
import { Category } from "./table"
import Logo from '@/assets/images/logo.png'
import { useRef, useState } from "react"
import { useReactToPrint } from 'react-to-print'
import useStore from "@/app/(public)/(main)/produk/kategori/store"

const PrintButton = () => {
    const select = useStore(state => state.select)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const printTableRef = useRef(null)
    const handlePrint = useReactToPrint({
        content: () => printTableRef.current,
        documentTitle: 'Kategori Produk',
        onBeforeGetContent: () => console.log('Before get content'),
        onBeforePrint: () => setIsLoading(true),
        onAfterPrint: () => setIsLoading(false)
    })

    return <>
        <div className="hidden">
            <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900" ref={printTableRef}>
                <h1 className="text-2xl font-semibold">Kategori Produk</h1>
                <table className="table mt-5 table-zebra">
                    <thead className=" text-gray-900">
                        <tr>
                            <th>Foto</th>
                            <th>Kategori</th>
                            <th>Parent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            select.map(e => <tr key={e.id}>
                                <td>
                                    <div className="avatar">
                                        <div className="w-20 rounded">
                                            <Image src={e.imagePath.trim() == '' ? Logo : e.imagePath} fill alt={e.name} quality={100} />
                                        </div>
                                    </div>
                                </td>
                                <td>{e.name}</td>
                                <td>{e.parent ? e.parent.name : 'N/A'}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>

        <button className="text-white w-20 border-0 bg-gray-400 btn" disabled={isLoading || select.length == 0} onClick={handlePrint}>
            { isLoading ? <div className="loading"></div> : null }
            <span> Print </span>
        </button>
    </>
}

export default PrintButton