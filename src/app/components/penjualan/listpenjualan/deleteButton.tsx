"use client"

import { deleteData } from "@/app/(public)/(main)/penjualan/listpenjualan/action"
import useStoreGlobal from "@/app/(public)/(main)/store"
import { useState } from "react"
import Swal from "sweetalert2"
import useStore from "@/app/(public)/(main)/penjualan/listpenjualan/store"

const DeleteButton = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const select = useStore(state => state.select)
    const reset = useStoreGlobal(state => state.reset)
    const handleClick = async () => {
        try{
            setIsLoading(true)
            await deleteData(select.map(e => e.id))
            setIsLoading(false)
            reset()
        }catch{
            Swal.fire({
                title: 'Terjadi kesalahan!',
                text: 'Kesalahan saat menghapus data, coba kembali beberapa saat dan pastikan jaringan terhubung internet',
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