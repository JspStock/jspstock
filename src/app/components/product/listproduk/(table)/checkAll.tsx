"use client"

import { GetProductPayload } from "@/app/(public)/(main)/produk/listproduk/action"
import useStore from "@/app/(public)/(main)/produk/listproduk/store"

const CheckAll = ({ data }: {
    data: Array<GetProductPayload>
}) => {
    const select = useStore(state => state.select)
    const reset = useStore(state => state.reset)
    const set = useStore(state => state.set)

    const handleChecked = () => {
        if(select.length != data.length){
            set(data)
        }else{
            reset()
        }
    }

    return <input type="checkbox" className="checkbox" checked={select.length == data.length && data.length != 0} onChange={handleChecked} />
}

export default CheckAll