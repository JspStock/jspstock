"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Category } from "../table"
import { FormEvent, useEffect, useState } from "react"

const CheckAll = ({ data }: { data: Array<Category> }) => {
    const [checked, setChecked] = useState<boolean>(false)
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()

    const generateSearchParams = (e: FormEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams)
        params.delete("select")
        
        if(e.currentTarget.checked){
            params.set('select', data.map(e => e.id).join(','))
        }else{
            params.delete("select")
        }

        router.replace(`${pathName}${params.size > 0 ? `?${params}` : ""}`)
    }

    useEffect(() => {
        if(searchParams.has("select")){
            if(searchParams.get("select") == data.map(e => e.id).join(",")){
                setChecked(true)
            }else{
                setChecked(false)
            }
        }else{
            setChecked(false)
        }
    }, [searchParams])

    return <label>
        <input type="checkbox" className="checkbox" onChange={generateSearchParams} checked={checked} />
    </label>
}

export default CheckAll