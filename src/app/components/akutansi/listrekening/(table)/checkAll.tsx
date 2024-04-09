"use client"

import useStore from "@/app/(public)/(main)/akutansi/listrekening/store"
import { SavingAccounts } from "../table"

const CheckAll = ({ data }: {
    data: Array<SavingAccounts>
}) => {
    const select = useStore(state => state.select)
    const set = useStore(state => state.set)
    const reset = useStore(state => state.reset)
    const handleChecked = () => {
        if(select.length == 0){
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