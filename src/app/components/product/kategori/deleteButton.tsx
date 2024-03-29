"use client"

import { deleteCategories } from "@/app/(public)/(main)/produk/kategori/action"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import Swal from "sweetalert2"

const DeleteButton = ({ id }: {id: string}) => {
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const handleDelete = async() => {
        try{
            setIsLoading(true)
            await deleteCategories([id])
            setIsLoading(false)

            const params = new URLSearchParams(searchParams)
            if(params.has('select')){
                const selectedParams = params.get("select")?.split(",")
                selectedParams?.findIndex(val => val.trim() == '') != -1 ? selectedParams?.splice(selectedParams.findIndex(e => e.trim() == ''), 1) : null
                selectedParams?.includes(id) ? selectedParams.splice(selectedParams.findIndex(val => val.trim() == id), 1) : null
                params.set('select', selectedParams?.join(',')!)
                router.replace(`${pathName}${ params.size > 0 ? `?${params}` : ''}`)
            }
        }catch{
            Swal.fire({
                title: 'Kesalahan server!',
                text: 'Kesalahan saat menghapus data!. Coba lagi beberapa saat!',
                icon: 'error',
                confirmButtonText: 'OK!',
                preConfirm: () => setIsLoading(false)
            })
        }
    }

    return <button disabled={isLoading} onClick={handleDelete}>
        { isLoading ? <div className="loading"></div> : null }
        <span>hapus</span>
    </button>
}

export default DeleteButton