"use client"

import useStore from "@/app/(public)/(main)/produk/listproduk/store"
import { FormEvent, useEffect, useState } from "react"

const Check = ({ id }: {
    id: string
}) => {
    const [isSelected, setIsSelected] = useState<boolean>()
    const select = useStore(state => state.select)
    const add = useStore(state => state.add)
    const remove = useStore(state => state.remove)
    const handleChecked = (e: FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.checked) {
            add(id)
        } else {
            remove(id)
        }
    }

    useEffect(() =>{
        setIsSelected(select.includes(id))
    }, [select, id])

    return <input type="checkbox" className="checkbox" checked={isSelected} onChange={handleChecked} />
}

export default Check