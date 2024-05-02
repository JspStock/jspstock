"use client"

import { GetProductPayload } from "@/app/(public)/(main)/produk/listproduk/action"
import { currencyFormat } from "@/utils/utils"
import dynamic from "next/dynamic"
import { useRef, useState } from "react"
import { useReactToPrint } from "react-to-print"
import Swal from "sweetalert2"

const Barcode = dynamic(() => import('react-barcode'))

const PrintBarcode = ({ data }: {
    data: GetProductPayload
}) => {
    const ref = useRef(null)
    const [loop, setLoop] = useState<number>(1)
    const handlePrint = useReactToPrint({
        documentTitle: 'Barcode produk',
        content: () => ref.current,
        onBeforeGetContent: async () => {
            const { value } = await Swal.fire({
                title: 'Jumlah label',
                input: "number",
                inputValue: loop
            })
    
            setLoop(value)
        }
    })

    return <>
        <button onClick={handlePrint}>Print Barcode</button>
        <div className="hidden">
            <section ref={ref} className="grid grid-cols-2 justify-center gap-y-[14px]">
                {
                    Array.from({ length: loop }).map((_, index) => <div className="transform max-w-min p-3" key={index}>
                        <div className="flex items-center justify-between">
                            <p className="text-xs">{data.name}</p>
                            <div className="badge bg-black text-white badge-xs">{currencyFormat(data.price)}</div>
                        </div>
                        <Barcode value={data.code} displayValue={true} fontSize={12} height={50} width={1.4} />
                    </div>)
                }
            </section>
        </div>
    </>
}

export default PrintBarcode