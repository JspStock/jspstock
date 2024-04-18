"use client"

import { GetUserPayload } from "@/app/(public)/(main)/pengguna/action"
import useStore from "@/app/(public)/(main)/pengguna/store"

const CheckAll = ({ data }: {
    data: Array<GetUserPayload>
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

    return <input type="checkbox" className="checkbox" checked={select.length == data.length && data.length > 0} onChange={handleChecked} />
}

export default CheckAll