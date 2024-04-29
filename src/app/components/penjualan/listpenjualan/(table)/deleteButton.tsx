"use client"

import { deleteData } from "@/app/(public)/(main)/penjualan/listpenjualan/action"
import useStore from "@/app/(public)/(main)/store"
import { passwordInputAlert } from "@/utils/alert/swal"
import { useState } from "react"
import Swal from "sweetalert2"

const DeleteButton = ({ id }: {
    id: string
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const reset = useStore(state => state.reset)
    const handleClick = async() => {
        try{
            const confirmPassword = await passwordInputAlert()

            if(confirmPassword){
                setIsLoading(true)
                await deleteData([id])
                setIsLoading(false)
                reset()
            }
        }catch{
            Swal.fire({
                icon: 'error',
                title: 'Terjadi kesalahan!',
                text: 'Kesalahan saat menghapus data, coba kembali beberapa saat dan pastikan jaringan terhubung internet.'
            })
        }
    }
    return <button disabled={isLoading} onClick={handleClick}>
        { isLoading ? <div className="loading"></div> : null }
        <span>Hapus</span>
    </button>
}

export default DeleteButton