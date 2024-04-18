"use client"

import { GetUserPayload } from "@/app/(public)/(main)/pengguna/action"
import useStore from "@/app/(public)/(main)/pengguna/store"

const Check = ({ data }: {
    data: GetUserPayload
}) => {
    const select = useStore(state => state.select)
    const add = useStore(state => state.add)
    const remove = useStore(state => state.remove)
    const handleChecked = () => {
        if(select.find(e => e.id == data.id) == undefined){
            add(data)
        }else{
            remove(data)
        }
    }

    return <input type="checkbox" className="checkbox" checked={select.find(e => e.id == data.id) != undefined} onChange={handleChecked} />
}

export default Check