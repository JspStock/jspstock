"use client"

import useStore from "@/app/(public)/(main)/produk/kategori/store"

const Check = ({ id }: { id: string }) => {
    const select = useStore(state => state.select)
    const add = useStore(state => state.add)
    const remove = useStore(state => state.remove)

    const handleChecked = () => {
        if(select.includes(id)){
            remove(id)
        }else{
            add(id)
        }
    }

    return <label>
        <input type="checkbox" className="checkbox" onChange={handleChecked} checked={select.includes(id)} />
    </label>
}

export default Check