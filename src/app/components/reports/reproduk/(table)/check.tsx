"use client"

import { GetProductPayload } from "@/app/(public)/(main)/reports/repproduk/action"
import useStore from "@/app/(public)/(main)/reports/repproduk/store"

const Check = ({ data }: {
    data: GetProductPayload
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

    return <input type="checkbox" className="checkbox" checked={select.find(e => e.id == data.id) != undefined} onChange={handleChecked} />
}

export default Check