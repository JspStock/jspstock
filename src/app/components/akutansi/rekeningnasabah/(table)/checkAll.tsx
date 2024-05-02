"use client"

import { GetMutationPayload } from "@/app/(public)/(main)/akutansi/rekeningnasabah/action"
import useStore from "@/app/(public)/(main)/akutansi/rekeningnasabah/store"

const CheckAll = ({ data }: {
    data: Array<GetMutationPayload>
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