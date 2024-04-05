"use client"

import useStore, { Select } from "@/app/(public)/(main)/pembelian/listpembelian/store"

const Check = ({ data }: {
    data: Select
}) => {
    const select = useStore(state => state.select)
    const add = useStore(state => state.add)
    const remove = useStore(state => state.remove)
    const isChecked = select.find(e => e.id == data.id) ? true: false

    return <input
        type="checkbox"
        className="checkbox"
        checked={isChecked}
        onChange={() => isChecked ? remove(data.id) : add(data)} />
}

export default Check