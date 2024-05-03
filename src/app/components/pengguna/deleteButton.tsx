"use client"

import { useState } from "react"
import useStore from "../../(public)/(main)/pengguna/(users)/store"
import Swal from "sweetalert2"
import { removeData } from "@/app/(public)/(main)/pengguna/(users)/action"

const DeleteButton = () => {
    const select = useStore(state => state.select)
    const [isLoading, setIsLoading] = useState<boolean>(false)
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
                text: 'Kesalahan pada server, silahkan coba kembali beberapa saat.',
                preConfirm: () => setIsLoading(false)
            })
        }
    }

    return <button className="text-white w-20 border-0 bg-red-400 btn" disabled={isLoading || select.length == 0} onClick={handleClick}>
        { isLoading ? <div className="loading"></div> : null }
        <span>hapus</span>
    </button>
}

export default DeleteButton