"use client"

import useStore from "@/app/(public)/(main)/pemaketan/listpemaketan/store"
import dynamic from "next/dynamic"
import { useRef, useState } from "react"
import { useReactToPrint } from "react-to-print"

const PackageLabel = dynamic(() => import('@/app/components/packageLabel'))

const PrintLabelButton = ({ BASE_URL }: {
    BASE_URL: string
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const select = useStore(state => state.select)
    const ref = useRef(null)
    const handlePrint = useReactToPrint({
        documentTitle: "Label Pemaketan",
        content: () => ref.current,
        onBeforeGetContent: () => setIsLoading(true),
        onBeforePrint: () => setIsLoading(false)
    })

    return <>
        <button className="text-white w-fit border-0 bg-blue-400 btn" disabled={isLoading || select.length == 0} onClick={handlePrint}>
            { isLoading ? <div className="loading"></div> : null }
            <span>Print Label</span>
        </button>

        <div className="hidden">
            <div className="grid grid-cols-2 justify-center items-center" ref={ref}>
                {
                    select.map((e, index) => <PackageLabel key={index} content={e.address} linkQr={`${BASE_URL}/package/${e.id}`}/>)
                }
            </div>
        </div>
    </>
}

export default PrintLabelButton