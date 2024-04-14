"use client"

import { deleteData } from "@/app/(public)/(main)/pengembalian/pembelian/action"
import useStore from "@/app/(public)/(main)/pengembalian/pembelian/store"
import { useState } from "react"
import Swal from "sweetalert2"

const DeleteButton = () => {
    const [isLoadiing, setIsLoading] = useState<boolean>(false)
    const select = useStore(state => state.select)
    const reset = useStore(state => state.reset)
    const handleClick = async () => {
        try{
            setIsLoading(true)
            await deleteData(select.map(e => e.id))
            setIsLoading(false)
            reset()
        }catch{
            Swal.fire({
                icon: 'error',
                title: 'Terjadi kesalahan!',
                text: 'Kesalahan pada server, silahkan coba lagi beberapa saat.',
                preConfirm: () => setIsLoading(false)
            })
        }
    }

    return <button 
        className="text-white w-20 border-0 bg-red-400 btn"
        disabled={select.length == 0 || isLoadiing}
        onClick={handleClick}>
            { isLoadiing ? <div className="loading"></div> : null }
            <span>Hapus</span>
        </button>
}

export default DeleteButton