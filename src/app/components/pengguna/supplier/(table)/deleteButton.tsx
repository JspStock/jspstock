"use client"

import { deleteSupplier } from "@/app/(public)/(main)/pengguna/supplier/action"
import useStore from "@/app/(public)/(main)/pengguna/supplier/store"
import { useState } from "react"
import Swal from "sweetalert2"

const DeleteButton = ({ id }: { id: string }) => {
    const reset = useStore(state => state.reset)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const handleClick = async () => {
        try{
            setIsLoading(true)
            await deleteSupplier([id])
            setIsLoading(false)
            reset()
        }catch{
            Swal.fire({
                icon: 'error',
                title: 'Terjadi kesalahan!',
                text: 'Kesalahan saat menghapus Supplier. Silahkan coba kembali beberapa saat dan pastikan jaringan koneksi internet stabil.',
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