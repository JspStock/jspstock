"use client"

import { deleteData } from "@/app/(public)/(main)/toko/action"
import useStore from "@/app/(public)/(main)/toko/store"
import { useState } from "react"
import Swal from "sweetalert2"

const DeleteButton = ({ id }: {
    id: string
}) => {
    const remove = useStore(state => state.remove)
    const [isLoading, setIsLoading] = useState<boolean>(false)
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
                text: 'Kesalahan pada server, silahkan coba kembali beberapa saat.',
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