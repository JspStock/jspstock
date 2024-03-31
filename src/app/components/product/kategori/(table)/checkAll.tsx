"use client"

import useStore from "@/app/(public)/(main)/produk/kategori/store"
import { Category } from "../table"

const CheckAll = ({ data }: { data: Array<Category> }) => {
    const select = useStore(state => state.select)
    const set = useStore(state => state.set)
    const reset = useStore(state => state.reset)

    const handleChecked = () => {
        if(data.length != select.length){
            set(data)
        }else{
            reset()
        }
    }

    return <label>
        <input type="checkbox" className="checkbox" onChange={handleChecked} checked={select.length == data.length && data.length != 0} />
    </label>
}

export default CheckAll