"use client"

import { AllProduct } from "@/app/(public)/(main)/produk/listproduk/page"
import useStore from "@/app/(public)/(main)/produk/listproduk/store"
import { FormEvent, useEffect, useState } from "react"

const CheckAll = ({ data }: {
    data: Array<AllProduct>
}) => {
    const [checked, setChecked] = useState<boolean>()
    const selected = useStore(state => state.select)
    const add = useStore(state => state.add)
    const reset = useStore(state => state.reset)

    const handleCheked = (e: FormEvent<HTMLInputElement>) => {
        if(e.currentTarget.checked){
            for(let i = 0; i < data.length; i++){
                add(data[i].id)
            }
        }else{
            reset()
        }
    }

    useEffect(() => {
        if(data.length > 0){
            selected.length == data.length ? setChecked(true) : setChecked(false)
        }else{
            setChecked(false)
        }
    }, [data, selected])

    return <input type="checkbox" className="checkbox" checked={checked} onChange={handleCheked} />
}

export default CheckAll