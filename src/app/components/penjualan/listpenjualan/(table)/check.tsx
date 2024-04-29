"use client"

import { GetDataPlayload } from "@/app/(public)/(main)/penjualan/listpenjualan/action"
import useStore from "@/app/(public)/(main)/penjualan/listpenjualan/store"

const Check = ({ data }: {
    data: GetDataPlayload
}) => {
    const select = useStore(state => state.select)
    const add = useStore(state => state.add)
    const remove = useStore(state => state.remove)
    const handleChecked = () => {
        if(select.find(e => e.id == data.id) != undefined){
            remove(data.id)
        }else{
            add(data)
        }
    }

    return <input 
        type="checkbox" 
        className="checkbox"
        checked={select.find(e => e.id == data.id) != undefined}
        onChange={handleChecked} />
}

export default Check