"use client"

import dynamic from "next/dynamic"
import { useRef } from "react"
import { useReactToPrint } from "react-to-print"

const Barcode = dynamic(() => import('react-barcode'))

const PrintBarcode = ({ value }: {
    value: string
}) => {
    const ref = useRef(null)
    const handlePrint = useReactToPrint({
        documentTitle: 'Barcode produk',
        content: () => ref.current
    })

    return <>
        <button onClick={handlePrint}>Print Barcode</button>
        <div className="hidden">
            <section ref={ref}>
                <Barcode value={value} displayValue={true} />
            </section>
        </div>
    </>
}

export default PrintBarcode