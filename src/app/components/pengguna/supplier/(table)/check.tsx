"use client"

import useStore from "@/app/(public)/(main)/pengguna/supplier/store"
import { Supplier } from "../table"

const Check = ({ data }: { data: Supplier }) => {
    const select = useStore(state => state.select)
    const add = useStore(state => state.add)
    const remove = useStore(state => state.remove)
    const handleCheck = () => {
        if(select.find(e => e.id == data.id) == undefined){
            add(data)
        }else{
            remove(data.id)
        }
    }

    return <input type="checkbox" className="checkbox" checked={select.find(e => e.id == data.id) != undefined} onChange={handleCheck} />
}

export default Check