"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"

const Check = ({ id }: { id: string }) => {
    const [checked, setChecked] = useState<boolean>(false)
    const pathName = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()

    const generateSearchParams = (e: FormEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams)
        const tempSelect = params.has("select") ? params.get('select')?.split(',') : []

        if (e.currentTarget.checked) {
            tempSelect?.push(id)
            setChecked(true)
        } else {
            tempSelect?.splice(tempSelect?.findIndex(i => i == id), 1)
            setChecked(false)
        }

        tempSelect?.findIndex(e => e.trim() == "") != -1 ? tempSelect?.splice(tempSelect?.findIndex(e => e.trim() == ""), 1) : null
        params.set("select", tempSelect?.join(',')!)
        router.replace(`${pathName}${params.size > 0 ? `?${params}` : ''.trim()}`)
    }

    useEffect(() => {
        if (searchParams.has('select')) {
            searchParams.get('select')?.split(',').includes(id) ? setChecked(true) : setChecked(false)
        } else {
            setChecked(false)
            console.log(searchParams.get('select')?.split(','))
        }
    }, [searchParams])

    return <label>
        <input type="checkbox" className="checkbox" onChange={generateSearchParams} checked={checked} />
    </label>
}

export default Check