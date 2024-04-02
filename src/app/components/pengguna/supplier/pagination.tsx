import { getCountSupplierData } from "@/app/(public)/(main)/pengguna/supplier/action"
import { SearchParams } from "@/app/(public)/(main)/pengguna/supplier/page"
import dynamic from "next/dynamic"

const PreviousButton = dynamic(() => import('./(pagination)/previousButton'))
const NextButton = dynamic(() => import('./(pagination)/nextButton'))

const Pagination = async ({ searchParams }: { searchParams: SearchParams }) => {
    const countData = await getCountSupplierData(searchParams)

    return (
        <div className="join mt-3">
            <PreviousButton searchParams={searchParams} />
            <button className="join-item btn text-gray-900">Halaman { searchParams.page ?? '1' }</button>
            <NextButton
                countData={countData}
                searchParams={searchParams} />
        </div>
    )
}
export default Pagination