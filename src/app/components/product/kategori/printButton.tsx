"use client"

import Image from "next/image"
import { Category } from "./table"
import Logo from '@/assets/images/logo.png'
import { useRef, useState } from "react"
import { useReactToPrint } from 'react-to-print'
import { useSearchParams } from "next/navigation"

const PrintButton = ({ disable, data }: {
    disable: boolean,
    data: Array<Category>
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const searchParams = useSearchParams()
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
                <table className="table mt-5">
                    <thead className=" text-gray-900">
                        <tr>
                            <th>Foto</th>
                            <th>Kategori</th>
                            <th>Parent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(e => searchParams.get('select')?.includes(e.id) ? <tr key={e.id}>
                                <td>
                                    <div className="avatar">
                                        <div className="w-20 rounded">
                                            <Image src={e.imagePath.trim() == '' ? Logo : e.imagePath} fill alt={e.name} quality={100} />
                                        </div>
                                    </div>
                                </td>
                                <td>{e.name}</td>
                                <td>{e.parent ? e.parent.name : 'N/A'}</td>
                            </tr> : null)
                        }
                    </tbody>
                </table>
            </div>
        </div>

        <button className="text-white w-20 border-0 bg-gray-400 btn" disabled={disable || isLoading} onClick={handlePrint}>
            { isLoading ? <div className="loading"></div> : null }
            <span> Print </span>
        </button>
    </>
}

export default PrintButton