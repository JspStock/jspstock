"use client"

import { deleteData } from "@/app/(public)/(main)/pemaketan/listpemaketan/action"
import useStore from "@/app/(public)/(main)/pemaketan/listpemaketan/store"
import { passwordInputAlert } from "@/utils/alert/swal"
import { useState } from "react"
import Swal from "sweetalert2"

const DeleteButton = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const select = useStore(state => state.select)
    const reset = useStore(state => state.reset)
    const handleClick = async () => {
        try{
            const confirmPassword = await passwordInputAlert()

            if(confirmPassword){
                setIsLoading(true)
                await deleteData(select.map(e => e.id))
                setIsLoading(false)
                reset()
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

    return <button 
        className="text-white w-20 border-0 bg-red-400 btn"
        disabled={isLoading || select.length == 0}
        onClick={handleClick}>
            { isLoading ? <div className="loading"></div> : null }
            <span>Hapus</span>
        </button>
}

export default DeleteButton