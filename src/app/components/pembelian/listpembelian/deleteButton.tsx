"use client"

import { deleteData } from "@/app/(public)/(main)/pembelian/listpembelian/action"
import useStore from "@/app/(public)/(main)/pembelian/listpembelian/store"
import { useState } from "react"
import Swal from "sweetalert2"

const DeleteButton = () => {
    const reset = useStore(state => state.reset)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const select = useStore(state => state.select)
    const handleClick = async () => {
        try{
            setIsLoading(true)
            await deleteData({data: select.map(e => e.id)})
            setIsLoading(false)
            reset()
        }catch{
            Swal.fire({
                icon: 'error',
                title: 'Terjadi kesalahan!',
                text: 'Kesalahan saat menghapus data, silahkan coba kembali beberapa saat dan pastikan koneksi jaringan stabil.',
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