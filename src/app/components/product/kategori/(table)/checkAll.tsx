"use client"

import useStore from "@/app/(public)/(main)/produk/kategori/store"
import { Category } from "../table"

const CheckAll = ({ data }: { data: Array<Category> }) => {
    const select = useStore(state => state.select)
    const add = useStore(state => state.add)
    const reset = useStore(state => state.reset)

    const handleChecked = () => {
        if(data.length != select.length){
            for(let row of data){
                add(row.id)
            }
        }else{
            reset()
        }
    }

    return <label>
        <input type="checkbox" className="checkbox" onChange={handleChecked} checked={select.length == data.length} />
    </label>
}

export default CheckAll