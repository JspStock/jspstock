"use client"

import { deleteData } from "@/app/(public)/(main)/pengeluaran/kategoripengeluaran/action"
import useStore from "@/app/(public)/(main)/pengeluaran/kategoripengeluaran/store"
import { useState } from "react"
import Swal from "sweetalert2"

const DeleteButton = ({ id }: {
    id: string
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const reset = useStore(state => state.reset)
    const handleClick = async () => {
        try{
            setIsLoading(true)
            await deleteData([id])
            setIsLoading(true)
            reset()
        }catch{
            Swal.fire({
                icon: 'error',
                title: 'Terjadi kesalahan!',
                text: 'Kesalahan pada server, coba kembali beberapa saat.',
                preConfirm: () => setIsLoading(false)
            })
        }
    }

    return <button disabled={isLoading} onClick={handleClick}>
        {isLoading ? <div className="loading"></div> : null }
        <span>Hapus</span>
    </button>
}

export default DeleteButton