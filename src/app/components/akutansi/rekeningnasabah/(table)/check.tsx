"use client"

import useStore from "@/app/(public)/(main)/akutansi/rekeningnasabah/store"
import { Mutation } from "../table"

const Check = ({ data }: {
    data: Mutation
}) => {
    const select = useStore(state => state.select)
    const add = useStore(state => state.add)
    const remove = useStore(state => state.remove)
    const handleChecked = () => {
        if(select.find(e => e.ref == data.ref) == undefined){
            add(data)
        }else{
            remove(data.ref)
        }
    }

    return <input type="checkbox"
        className="checkbox"
        checked={select.find(e => e.ref == data.ref) != undefined}
        onChange={handleChecked} />
}

export default Check