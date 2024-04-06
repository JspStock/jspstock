"use client"

import { removeData } from "@/app/(public)/(main)/pengguna/grupcostomer/action"
import useStore from "@/app/(public)/(main)/pengguna/grupcostomer/store"
import { useState } from "react"
import Swal from "sweetalert2"

const DeleteButton = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const select = useStore(state => state.select)
    const reset = useStore(state => state.reset)
    const handleClick = async () => {
        try{
            setIsLoading(true)
            await removeData(select.map(e => e.id))
            setIsLoading(false)
            reset()
        }catch{
            Swal.fire({
                icon: 'error',
                title: 'Terjadi kesalahan!',
                text: 'Kesalahan saat menghapus data, silahkan coba kembali beberapa saat dan pastikan jaringan internet terhubung.'
            })
        }
    }

    return <button className="text-white w-20 border-0 bg-red-400 btn" disabled={select.length == 0 || isLoading} onClick={handleClick}>
        { isLoading ? <div className="loading"></div> : null }
        <span>Hapus</span>
    </button>
}

export default DeleteButton