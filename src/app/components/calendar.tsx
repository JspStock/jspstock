"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';
import ReactCalendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

interface Data{
    year: number,
    month: number,
    day: number,
    content: string | ReactNode
}

const Calendar = ({ data }: {
    data: Array<Data>
}) => {
    const pathName = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)

    return <ReactCalendar
    locale='id-ID'
    value={searchParams.size > 0 ? new Date(`${searchParams.get('year')}-${searchParams.get('month')}`) : undefined}
    tileContent={({date, view}) => {
        if(view == 'month'){
            const getData = data.find(e => e.day == (date.getDate()) && e.month == (date.getMonth() + 1) && e.year == date.getFullYear())
            if(getData != undefined){
                return getData.content
            }else{
                return null
            }
        }else{
            return null
        }
    }}
    onActiveStartDateChange={({action, activeStartDate, view}) => {
        if(action == 'next' || action =='next2' || action == 'prev' || action == 'prev2' && view == 'month'){
            params.set('year', activeStartDate!.getFullYear().toString())
            params.set('month', (activeStartDate!.getMonth() + 1).toString())
            router.replace(`${pathName}${params.size > 0 ? `?${params}` : ''}`)
        }
    }}/>
}
export default Calendar