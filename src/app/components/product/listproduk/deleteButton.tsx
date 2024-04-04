"use client"

import { deleteProducts } from "@/app/(public)/(main)/produk/listproduk/action"
import useStore from "@/app/(public)/(main)/produk/listproduk/store"
import { useState } from "react"
import Swal from "sweetalert2"

const DeleteButton = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const selected = useStore(state => state.select)
    const reset = useStore(state => state.reset)
    const handleDelete = async () => {
        try {
            setIsLoading(true)
            await deleteProducts(selected.map(e => e.id))
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

    return <button className="text-white w-20 border-0 bg-red-400 btn" disabled={isLoading || selected.length == 0} onClick={handleDelete}>
        {isLoading ? <div className="loading"></div> : null}
        <span>Hapus</span>
    </button>
}

export default DeleteButton