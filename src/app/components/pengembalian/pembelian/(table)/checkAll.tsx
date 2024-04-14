"use client"

import useStore from "@/app/(public)/(main)/pengembalian/pembelian/store"
import { PurchaseReturn } from "../table"

const CheckAll = ({ data }: {
    data: Array<PurchaseReturn>
}) => {
    const select = useStore(state => state.select)
    const set = useStore(state => state.set)
    const reset = useStore(state => state.reset)
    const handleChecked = () => {
        if(data.length == select.length){
            reset()
        }else{
            set(data)
        }
    }

    return <input 
        type="checkbox" 
        className="checkbox"
        checked={select.length == data.length && data.length > 0}
        onChange={handleChecked} />
}

export default CheckAll