import { getCountCategoryData } from "@/app/(public)/(main)/produk/kategori/action"
import { SearchParams } from "@/app/(public)/(main)/produk/kategori/page"
import dynamic from "next/dynamic"

const PreviousButton = dynamic(() => import('./(pagination)/previousButton'))
const NextButton = dynamic(() => import('./(pagination)/nextButton'))

const Pagination = async ({ searchParams }: { searchParams: SearchParams }) => {
    const countData = await getCountCategoryData(searchParams.search)

    return (
        <div className="join mt-3">
            <PreviousButton page={parseInt(searchParams.page ?? "1")} />
            <button className="join-item btn text-gray-900">Halaman { searchParams.page ?? 1 }</button>
            <NextButton 
                count={countData} 
                page={parseInt(searchParams.page ?? "1")} 
                show={searchParams.show != undefined ? searchParams.show != "all" ? parseInt(searchParams.show) : 10 : 10}
                showAll={searchParams.show == "all"} />
        </div>
    )
}
export default Pagination