"use client"

import { deleteCategories } from "@/app/(public)/(main)/produk/kategori/action"
import useStore from "@/app/(public)/(main)/produk/kategori/store"
import { useState } from "react"
import Swal from "sweetalert2"

const DeleteButton = ({ id }: { id: string }) => {
    const remove = useStore(state => state.remove)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const handleDelete = async () => {
        try {
            setIsLoading(true)
            await deleteCategories([id])
            setIsLoading(false)
            remove
        }catch{
            Swal.fire({
                title: 'Terjadi kesalahan!',
                text: 'Kesalahan saat menhapus kategori, coba kembali beberapa saat!',
                preConfirm: () => setIsLoading(false)
            })
        }
    }

    return <button disabled={isLoading} onClick={handleDelete}>
        {isLoading ? <div className="loading"></div> : null}
        <span>hapus</span>
    </button>
}

export default DeleteButton