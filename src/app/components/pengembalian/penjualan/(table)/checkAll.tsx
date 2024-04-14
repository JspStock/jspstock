"use client"

import useStore from "@/app/(public)/(main)/pengembalian/penjualan/store"
import { SaleReturns } from "../table"

const CheckAll = ({ data }: {
    data: Array<SaleReturns>
}) => {
    const select = useStore(state => state.select)
    const set = useStore(state => state.set)
    const reset = useStore(state => state.reset)
    const handleChecked = () => {
        if(select.length == data.length){
            reset()
        }else{
            set(data)
        }
    }

    return <input 
        type="checkbox" 
        className="checkbox"
        checked={data.length == select.length && data.length > 0}
        onChange={handleChecked} />
}

export default CheckAll