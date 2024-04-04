"use client"

import { useState } from 'react'
import DatePicker, { DateValueType, ClassNamesTypeProp } from 'react-tailwindcss-datepicker'

const Datepickers = () => {
    const [value, setValue] = useState<DateValueType>({
        startDate: null,
        endDate: null
    })

    const handleValueChange = (e: DateValueType) => {
        setValue(e)
        console.log(e)
    }

    return (
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Pilih Tanggal</span>
            </div>
            
            <DatePicker
                value={value}
                onChange={handleValueChange}
                inputClassName="input input-bordered w-full" />
        </label>
    )
}
export default Datepickers