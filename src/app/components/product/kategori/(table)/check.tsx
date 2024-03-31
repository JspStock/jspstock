"use client"

import useStore from "@/app/(public)/(main)/produk/kategori/store"
import { Category } from "../table"

const Check = ({ data }: { data: Category }) => {
    const select = useStore(state => state.select)
    const add = useStore(state => state.add)
    const remove = useStore(state => state.remove)

    const handleChecked = () => {
        if(select.find(e => e.id == data.id)){
            remove(data.id)
        }else{
            add(data)
        }
    }

    return <label>
        <input type="checkbox" className="checkbox" onChange={handleChecked} checked={select.find(e => e.id == data.id) != undefined ? true : false} />
    </label>
}

export default Check