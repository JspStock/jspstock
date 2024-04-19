"use client"

import { GetStorePayload } from "@/app/(public)/(main)/toko/action"
import useStore from "@/app/(public)/(main)/toko/store"

const CheckAll = ({ data }: {
    data: Array<GetStorePayload>
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

    return <input type="checkbox" className="checkbox" checked={select.length == data.length} onChange={handleChecked} />
}

export default CheckAll