"use client"

import useStore from "@/app/(public)/(main)/pengguna/costomer/store"
import { Customer } from "../table"

const Check = ({ data }: {
    data: Customer
}) => {
    const select = useStore(state => state.select)
    const add = useStore(state => state.add)
    const remove = useStore(state => state.remove)
    const handleChecked = () => {
        if(select.find(e => e.id == data.id) == undefined){
            add(data)
        }else{
            remove(data.id)
        }
    }

    return <input 
        type="checkbox" 
        className="checkbox"
        checked={select.find(e => e.id == data.id) != undefined}
        onChange={handleChecked} />
}

export default Check