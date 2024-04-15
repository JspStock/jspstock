"use client"

import { updateStatus } from "@/app/package/[package]/action"
import { useState } from "react"
import Swal from "sweetalert2"

const ConfirmButton = ({ id }: {
    id: string
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const handleClick = async () => {
        try{
            setIsLoading(true)
            await updateStatus(id)
            setIsLoading(false)
        }catch{
            Swal.fire({
                icon: 'error',
                title: 'Terjadi kesalahan!',
                text: 'Kesalahan pada server, silahkan coba kembali beberapa saat.',
                preConfirm: () => setIsLoading(false)
            })
        }
    }

    return <button className="btn bg-blue-900 text-white" disabled={isLoading} onClick={handleClick}>
        { isLoading ? <div className="loading"></div> : null }
        <span>Konfirmasi paket telah sampai</span>
    </button>
}

export default ConfirmButton