"use client"

import { deleteCategories } from "@/app/(public)/(main)/produk/kategori/action"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import Swal from "sweetalert2"

const DeleteCategoryButton = ({ disable, data }: {
    disable: boolean,
    data?: string
}) => {
    const [isLoading, setIsloading] = useState<boolean>()
    const router = useRouter()
    const pathName = usePathname()
    const searchQuery = useSearchParams()

    const handleDelete = async () => {
        if(data != undefined){
            const selectedCategories = data.split(',')
            selectedCategories.findIndex(e => e.trim() == '') != -1 ? selectedCategories.splice(selectedCategories.findIndex(e => e.trim() == ''), 1) : null

            try{
                setIsloading(true)
                await deleteCategories(selectedCategories)
                setIsloading(false)

                const params = new URLSearchParams(searchQuery)
                params.delete("select")
                router.replace(`${pathName}${ params.size > 0 ? `?${params}` : '' }`)
            }catch{
                Swal.fire({
                    icon: 'error',
                    title: 'Kesalahan saat menghapus!',
                    text: 'Kesalahan saat mengahpus kategori, silahkan coba lagi beberapa waktu!',
                    confirmButtonText: 'OK!',
                    preConfirm: () => setIsloading(false)
                })
            }
        }
    }

    return <button className="text-white w-20 border-0 bg-red-400 btn" disabled={disable || isLoading} onClick={handleDelete}>
        { isLoading ? <div className="loading"></div> : null }
        <span>Hapus</span>
    </button>
}

export default DeleteCategoryButton