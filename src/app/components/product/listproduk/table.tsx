import { SearchParams } from "@/app/(public)/(main)/produk/kategori/page"
import { getAllProduct, getSumAllProductQty } from "@/app/(public)/(main)/produk/listproduk/action"
import dynamic from "next/dynamic"

const Pagination = dynamic(() => import('@/app/components/pagination'))
const Row = dynamic(() => import('./(table)/row'))

const Tablelist = async ({ searchParams }: {
    searchParams: SearchParams
}) => {
    const [allProduct, sumAllProductQty] = await Promise.all([getAllProduct(searchParams), getSumAllProductQty()])

    return <>
        <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900">
            <Row data={allProduct.result} />
        </div>

        <div className="flex justify-end bg-white rounded-box p-6">
            <span>Jumlah kuantitas dari semua produk : <b>{ sumAllProductQty.length > 0 ? sumAllProductQty.map(e => e.qty).reduce((val, prev) => val + prev) : 0 }</b></span>
        </div>

        <Pagination
            hasNextPage={allProduct.hasNextPage}
            hasPrevPage={allProduct.hasPrevPage}
            page={allProduct.page} />
    </>
}
export default Tablelist