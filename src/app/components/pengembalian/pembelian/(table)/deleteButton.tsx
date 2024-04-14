"use client"

import { deleteData } from "@/app/(public)/(main)/pengembalian/pembelian/action"
import useStore from "@/app/(public)/(main)/pengembalian/pembelian/store"
import { useState } from "react"
import Swal from "sweetalert2"

const DeleteButton = ({ id }: {
    id: string
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const remove = useStore(state => state.remove)
    const handleClick = async () => {
        try{
            setIsLoading(true)
            await deleteData([id])
            setIsLoading(false)
            remove(id)
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
        { isLoading ? <div className="loading"></div> : null }
        <span>Hapus</span>
    </button>
}

export default DeleteButton