"use client"

import { deleteSupplier } from "@/app/(public)/(main)/pengguna/supplier/action"
import useStore from "@/app/(public)/(main)/pengguna/supplier/store"
import { useState } from "react"
import Swal from "sweetalert2"

const DeleteButton = () => {
    const reset = useStore(state => state.reset)
    const select = useStore(state => state.select)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const handleClick = async () => {
        try{
            setIsLoading(true)
            await deleteSupplier(select.map(e => e.id))
            setIsLoading(false)
            reset()
        }catch{
            Swal.fire({
                icon: 'error',
                title: 'Terjadi kesalahan!',
                text: 'Kesalahan saat menghapus data. Silahkan coba kembali beberapa saat dan pastikan koneksi jaringan stabil.',
                preConfirm: () => setIsLoading(false)
            })
        }
    }

    return <button className="text-white w-20 border-0 bg-red-400 btn" disabled={select.length == 0 || isLoading} onClick={handleClick}>
        { isLoading ? <div className="loading"></div> : null }
        <span>Hapus</span>
    </button>
}

export default DeleteButton