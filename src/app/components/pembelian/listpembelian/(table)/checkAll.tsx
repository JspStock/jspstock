"use client"

import useStore, { Select } from "@/app/(public)/(main)/pembelian/listpembelian/store"

const CheckAll = ({ data }: {
    data: Array<Select>
}) => {
    const select = useStore(state => state.select)
    const set = useStore(state => state.set)
    const reset = useStore(state => state.reset)
    const isChecked = data.length == select.length && select.length > 0

    return <input 
        type="checkbox" 
        className="checkbox"
        checked={isChecked}
        onChange={() => isChecked ? reset() : set(data)} />
}

export default CheckAll