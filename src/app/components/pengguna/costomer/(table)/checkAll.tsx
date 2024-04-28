"use client"

import { GetAllDataCustomerUserPayload } from "@/app/(public)/(main)/pengguna/costomer/action"
import useStore from "@/app/(public)/(main)/pengguna/costomer/store"

const CheckAll = ({ data }: {
    data: Array<GetAllDataCustomerUserPayload>
}) => {
    const select = useStore(state => state.select)
    const set = useStore(state => state.set)
    const reset = useStore(state => state.reset)
    const handleChecked = () => {
        if(data.length != select.length && data.length > 0){
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