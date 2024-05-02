"use client"

import { GetMutationPayload } from "@/app/(public)/(main)/akutansi/rekeningnasabah/action"
import useStore from "@/app/(public)/(main)/akutansi/rekeningnasabah/store"

const Check = ({ data }: {
    data: GetMutationPayload
}) => {
    const select = useStore(state => state.select)
    const add = useStore(state => state.add)
    const remove = useStore(state => state.remove)
    const handleChecked = () => {
        if(select.find(e => e.reference == data.reference) == undefined){
            add(data)
        }else{
            remove(data.reference)
        }
    }

    return <input type="checkbox"
        className="checkbox"
        checked={select.find(e => e.reference == data.reference) != undefined}
        onChange={handleChecked} />
}

export default Check