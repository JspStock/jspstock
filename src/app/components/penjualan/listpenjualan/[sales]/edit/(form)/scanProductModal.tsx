"use client"

import { forwardRef } from "react"
import { Result, useZxing } from "react-zxing";

export type ScanProductModalRef = HTMLDialogElement
export interface ScanProductModalProps {
    onCapture: (val: Result) => void
}

const ScanProductModal = forwardRef<ScanProductModalRef, ScanProductModalProps>((props, ref) => {
    const { ref: refs } = useZxing({
        onDecodeResult: result => props.onCapture(result),
    })

    return <dialog ref={ref} className="modal">
        <div className="modal-box">
            <video ref={refs} />

            <div className="modal-action">
                <form method="dialog">
                    <button className="btn">Close</button>
                </form>
            </div>
        </div>
    </dialog>
})

ScanProductModal.displayName = "Scan Product Modal"
export default ScanProductModal
