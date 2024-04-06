"use client"

import useStore from "@/app/(public)/(main)/pengguna/grupcostomer/store"
import { CustomerGroup } from "../table"

const CheckAll = ({ data }: {
    data: Array<CustomerGroup>
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
        checked={data.length == select.length && data.length > 0}
        onChange={handleChecked} />
}

export default CheckAll