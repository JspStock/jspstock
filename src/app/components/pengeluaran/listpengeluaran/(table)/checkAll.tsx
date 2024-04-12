"use client"

import useStore from "@/app/(public)/(main)/pengeluaran/listpengeluaran/store"
import { Expenditures } from "../table"

const CheckAll = ({ data }: {
    data: Array<Expenditures>
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
        checked={select.length == data.length && data.length > 0}
        onChange={handleChecked} />
}

export default CheckAll