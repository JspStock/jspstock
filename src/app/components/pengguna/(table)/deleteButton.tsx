"use client"

import { GetUserPayload, removeData } from "@/app/(public)/(main)/pengguna/action"
import useStore from "@/app/(public)/(main)/pengguna/store"
import { useState } from "react"
import Swal from "sweetalert2"

const DeleteButton = ({ data }: {
    data: GetUserPayload
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const remove = useStore(state => state.remove)
    const handleClick = async () => {
        try{
            setIsLoading(true)
            await removeData([data.id])
            setIsLoading(false)
            remove(data)
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