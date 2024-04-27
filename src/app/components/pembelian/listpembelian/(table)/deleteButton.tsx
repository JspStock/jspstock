"use client"

import { deleteData } from "@/app/(public)/(main)/pembelian/listpembelian/action"
import useStore from "@/app/(public)/(main)/pembelian/listpembelian/store"
import { passwordInputAlert } from "@/utils/alert/swal"
import { useState } from "react"
import Swal from "sweetalert2"

const DeleteButton = ({ id }: {
    id: string
}) => {
    const reset = useStore(state => state.reset)
    const [isLoading, setIsloading] = useState<boolean>(false)
    const handleClick = async () => {
        try{
            const confirmPassword = await passwordInputAlert()

            if(confirmPassword){
                setIsloading(true)
                await deleteData({ data: [id] })
                setIsloading(false)
                reset()
            }
        }catch{
            Swal.fire({
                icon: 'error',
                title: 'Terjadi kesalahan!',
                text: 'Kesalahan saat menghapus data, coba kembali beberapa saat dan pastikan koneksi jaringan terhubung.'
            })
        }
    }

    return <button disabled={isLoading} onClick={handleClick}>
        { isLoading ? <div className="loading"></div> : null }
        <span>Hapus</span>
    </button>
}

export default DeleteButton