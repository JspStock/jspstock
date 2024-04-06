"use client"

import { removeData } from "@/app/(public)/(main)/pengguna/grupcostomer/action"
import useStore from "@/app/(public)/(main)/pengguna/grupcostomer/store"
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
            await removeData([id])
            setIsLoading(false)
            reset()
        }catch{
            Swal.fire({
                icon: 'error',
                title: 'Terjadi kesalahan!',
                text: 'Kesalahan saat menghapus data, coba lagi beberapa saat dan pastikan jaringan terkoneksi internet.'
            })
        }
    }

    return <button disabled={isLoading} onClick={handleClick}>
        { isLoading ? <div className="loading"></div> : null }
        <span>Hapus</span>
    </button>
}

export default DeleteButton