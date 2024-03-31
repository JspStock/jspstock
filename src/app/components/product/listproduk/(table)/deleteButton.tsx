"use client"

import { deleteProducts } from "@/app/(public)/(main)/produk/listproduk/action"
import useStore from "@/app/(public)/(main)/produk/listproduk/store"
import { useState } from "react"
import Swal from "sweetalert2"

const DeleteButton = ({ id }: { id: string }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const reset = useStore(state => state.reset)
    const handleDelete = async () => {
        try{
            setIsLoading(true)
            await deleteProducts([id])
            setIsLoading(false)
            reset()
        }catch{
            Swal.fire({
                icon: 'error',
                title: 'Gagal menghapus!',
                text: 'Kesalahan saat menghapus produk, coba lagi nanti!',
                preConfirm: () => setIsLoading(false)
            })
        }
    }

    return <button disabled={isLoading} onClick={handleDelete}>
        { isLoading ? <div className="loading"></div> : null }
        <span>Hapus</span>
    </button>
}

export default DeleteButton