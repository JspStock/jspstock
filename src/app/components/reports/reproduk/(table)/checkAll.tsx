"use client"

import { GetProductPayload } from "@/app/(public)/(main)/reports/repproduk/action"
import useStore from "@/app/(public)/(main)/reports/repproduk/store"

const CheckAll = ({ data }: {
    data: Array<GetProductPayload>
}) => {
    const select = useStore(state => state.select)
    const reset = useStore(state => state.reset)
    const set = useStore(state => state.set)
    const handleChecked = () => {
        if(data.length == select.length){
            reset()
        }else{
            set(data)
        }
    }

    return <input type="checkbox" className="checkbox" checked={data.length == select.length && data.length > 0} onChange={handleChecked} />
}

export default CheckAll