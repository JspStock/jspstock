"use client"

import { deleteCategories } from "@/app/(public)/(main)/produk/kategori/action"
import useStore from "@/app/(public)/(main)/produk/kategori/store"
import { useState } from "react"
import Swal from "sweetalert2"

const DeleteCategoryButton = () => {
    const select = useStore(state => state.select)
    const remove = useStore(state => state.remove)
    const [isLoading, setIsloading] = useState<boolean>()

    const handleDelete = async () => {
        try{
            setIsloading(true)
            await deleteCategories(select)
            setIsloading(false)
            select.forEach(e => remove(e))
        }catch{
            Swal.fire({
                title: 'Terjadi kesalahan!',
                text: 'Kesalahan saat menghapus kategori, silahkan coba kembali  beberapa saat!',
                preConfirm: () => setIsloading(false)
            })
        }
    }

    return <button className="text-white w-20 border-0 bg-red-400 btn" disabled={isLoading || select.length == 0} onClick={handleDelete}>
        { isLoading ? <div className="loading"></div> : null }
        <span>Hapus</span>
    </button>
}

export default DeleteCategoryButton