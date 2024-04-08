"use client"

import useStore from "@/app/(public)/(main)/penjualan/listpenjualan/store"
import { Sales } from "../table"

const CheckAll = ({ data }: {
    data: Array<Sales>
}) => {
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

    return <input 
        type="checkbox" 
        className="checkbox"
        checked={select.length == data.length && data.length > 0}
        onChange={handleChecked} />
}

export default CheckAll