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

const Calendar = ({ data, views = "month" }: {
    data: Array<Data>,
    views?: 'year' | 'month' | 'decade' | 'century'
}) => {
    const pathName = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)

    return <ReactCalendar
    locale='id-ID'
    value={searchParams.size > 0 ? views == 'month' ? new Date(`${searchParams.get('year')}-${searchParams.get('month')}`) : new Date(`${searchParams.get('year')}`) : undefined}
    view={views}
    tileContent={({date, view}) => {
        if(view == "month"){
            const getData = data.find(e => e.day == (date.getDate()) && e.month == (date.getMonth() + 1) && e.year == date.getFullYear())
            if(getData != undefined){
                return getData.content
            }else{
                return null
            }
        }else if(view == "year"){
            const getData = data.find(e => e.year == date.getFullYear() && e.month == date.getMonth())
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
            if(views == 'month'){
                params.set('month', (activeStartDate!.getMonth() + 1).toString())
            }
            router.replace(`${pathName}${params.size > 0 ? `?${params}` : ''}`)
        }
    }}/>
}
export default Calendar