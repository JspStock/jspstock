"use client"

import useStore from '@/app/(public)/(main)/pembelian/listpembelian/store'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import DatePicker, { DateValueType } from 'react-tailwindcss-datepicker'

const Datepickers = () => {
    const reset = useStore(state => state.reset)
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)

    const handleValueChange = (e: DateValueType) => {
        if(e && e.startDate != null && e.endDate != null){
            params.set("date", `${e.startDate}to${e.endDate}`)
        }else{
            params.delete("date")
        }

        reset()
        router.replace(`${pathName}/${params.size > 0 ? `?${params}` : ''}`)
    }

    return (
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Pilih Tanggal</span>
            </div>
            
            <DatePicker
                value={{startDate: params.get("date")?.split("to")[0] ?? null, endDate: params.get("date")?.split("to")[1] ?? null}}
                onChange={handleValueChange}
                showShortcuts={true}
                inputClassName="input input-bordered w-full" />
        </label>
    )
}
export default Datepickers