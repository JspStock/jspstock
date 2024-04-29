"use client"

import { forwardRef, useEffect, useRef, useState } from "react"
import Scanner from 'qr-scanner'
import Swal from "sweetalert2"

export type ScanProductModalRef = HTMLDialogElement
export interface ScanProductModalProps {
}

const ScanProductModal = forwardRef<ScanProductModalRef, ScanProductModalProps>((_, ref) => {
    const scanner = useRef<Scanner>()
    const videoEl = useRef<HTMLVideoElement>(null)
    const [qr, setQr] = useState<boolean>(true)

    const onScanSuccess = (result: Scanner.ScanResult) => {
        console.log(result)
    }

    useEffect(() => {
        if (videoEl.current && ref) {
            scanner.current = new Scanner(videoEl.current, onScanSuccess, {
            })

            scanner.current.start()
                .then(() => setQr(true))
                .catch(() => setQr(false))
        }

        return () => {
            if (!videoEl.current) {
                scanner.current?.stop()
            }
        }
    })

    useEffect(() => {
        if (!qr && !videoEl.current) {
            Swal.fire({
                icon: 'error',
                title: 'Terjadi kesalahan!',
                text: 'Gagal membuka kamera mohon izinkan browser untuk mengakses kamera!'
            })
        }
    }, [qr])

    return <dialog ref={ref} className="modal">
        <div className="modal-box">
            <video ref={videoEl}></video>

            <div className="modal-action">
                <form method="dialog">
                    <button className="btn">Close</button>
                </form>
            </div>
        </div>
    </dialog>
})

export default ScanProductModal