"use client"

import { deleteProducts } from "@/app/(public)/(main)/produk/listproduk/action"
import useStore from "@/app/(public)/(main)/produk/listproduk/store"
import { errorAlert, passwordInputAlert } from "@/utils/alert/swal"
import { useState } from "react"

const DeleteButton = ({ id }: { id: string }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const reset = useStore(state => state.reset)
    const handleDelete = async () => {
        try{
            const validatePass = await passwordInputAlert()

            if(validatePass){
                setIsLoading(true)
                await deleteProducts([id])
                setIsLoading(false)
                reset()
            }
        }catch{
            errorAlert(() => setIsLoading(false))
        }
    }

    return <button disabled={isLoading} onClick={handleDelete}>
        { isLoading ? <div className="loading"></div> : null }
        <span>Hapus</span>
    </button>
}

export default DeleteButton