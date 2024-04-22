"use client"

import moment from "moment"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const FilterDrop = () => {
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const handleClick = (val: string) => {
    params.set('date', val)
    router.replace(`${pathName}${params ? `?${params}` : ''}`)
  }

  return <div className="dropdown dropdown-left">
    <div tabIndex={0} role="button" className="btn bg-blue-900 text-white rounded-box">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z" clipRule="evenodd" />
      </svg>
      <span>Filter</span>
    </div>
    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
      <li><button onClick={() => handleClick(`${moment().format('YYYY-MM-DD')}to${moment().format('YYYY-MM-DD')}`)}>Sekarang</button></li>
      <li><button onClick={() => handleClick(`${moment().subtract(7, 'days').format('YYYY-MM-DD')}to${moment().format('YYYY-MM-DD')}`)}>7 Hari Terakhir</button></li>
      <li><button onClick={() => handleClick(`${moment().startOf('month').format('YYYY-MM-DD')}to${moment().endOf('month').format('YYYY-MM-DD')}`)}>Bulan Ini</button></li>
      <li><button onClick={() => handleClick(`${moment().startOf('year').format('YYYY-MM-DD')}to${moment().endOf('year').format('YYYY-MM-DD')}`)}>Tahun Ini</button></li>
    </ul>
  </div>
}
export default FilterDrop