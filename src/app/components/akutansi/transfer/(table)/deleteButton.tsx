"use client"

import { deleteData } from "@/app/(public)/(main)/akutansi/transferuang/action"
import useStore from "@/app/(public)/(main)/akutansi/transferuang/store"
import { passwordInputAlert } from "@/utils/alert/swal"
import { useState } from "react"
import Swal from "sweetalert2"

const DeleteButton = ({ id }: {
    id: string
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const remove = useStore(state => state.remove)
    const handleClick = async () => {
        try{
            const confirmPassword = await passwordInputAlert()

            if(confirmPassword){
                setIsLoading(true)
                await deleteData([id])
                setIsLoading(false)
                remove(id)
            }
        }catch{
            Swal.fire({
                icon: 'error',
                title: 'Terjadi kesalahan!',
                text: 'Kesalahan pada server, silahkan coba kembali beberapa saat.',
                preConfirm: () => setIsLoading(false)
            })
        }
    }

    return <button disabled={isLoading} onClick={handleClick}>
        { isLoading ? <div className="loading"></div> : null }
        <span>Hapus</span>
    </button>
}

export default DeleteButton