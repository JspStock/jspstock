"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import useStore from "../(public)/(main)/store"

const Pagination = ({ hasPrevPage, hasNextPage, page }: {
    hasPrevPage: boolean,
    hasNextPage: boolean,
    page: number
}) => {
    enum ActionButton{
        PREV,
        NEXT
    }

    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const handleClick = (val: ActionButton) => {
        if(val == ActionButton.NEXT){
            params.set("page", (page + 1).toString())
        }else{
            params.set("page", (page - 1).toString())
        }

        useStore.getState().reset()
        router.replace(`${pathName}/${params.size > 0 ? `?${params}` : ''}`)
    }

    return (
        <div className="join mt-3">
            <button className="join-item btn bg-blue-900 text-white" disabled={!hasPrevPage} onClick={() => handleClick(ActionButton.PREV)}>«</button>
            <button className="join-item btn text-gray-900">Halaman { page }</button>
            <button className="join-item btn bg-blue-900 text-white" disabled={!hasNextPage} onClick={() => handleClick(ActionButton.NEXT)}>»</button>
        </div>
    )
}
export default Pagination