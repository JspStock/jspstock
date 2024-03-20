"use client"

import { LocalizationProvider } from "@mui/x-date-pickers"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

const Datepickers = () => {
    return (
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Pilih Tanggal</span>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker />
            </LocalizationProvider>
        </label>
    )
}
export default Datepickers