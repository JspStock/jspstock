import { GetProductPayload, getProduct } from "@/app/(public)/(main)/reports/repproduk/action"
import { SearchParams } from "@/app/(public)/(main)/reports/repproduk/page"
import { currencyFormat } from "@/utils/utils"
import dynamic from "next/dynamic"

const Pagination = dynamic(() => import('@/app/components/pagination'))
const CheckAll = dynamic(() => import('./(table)/checkAll'))
const Check = dynamic(() => import('./(table)/check'))

const Tablelist = async ({ searchParams }: {
    searchParams: SearchParams
}) => {
    const product = await getProduct(searchParams)
    const saleQty = (e: GetProductPayload) => e.saleOrder.length > 0 ? e.saleOrder.map(a => a.qty).reduce((val, prev) => val + prev) : 0
    const saleTotal = (e: GetProductPayload) => e.saleOrder.length > 0 ? e.price * e.saleOrder.map(a => a.qty).reduce((val, prev) => val + prev) : 0
    const saleReturnQty = (e: GetProductPayload) => e.saleReturnOrders.length > 0 ? e.saleReturnOrders.map(a => a.qty).reduce((val, prev) => val + prev) : 0
    const saleReturnTotal = (e: GetProductPayload) => e.saleReturnOrders.length > 0 ? e.price * e.saleReturnOrders.map(a => a.qty).reduce((val, prev) => val + prev) : 0


    return <>
        <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900">
            <table className="table">
                <thead className=" text-gray-900">
                    <tr>
                        <th><CheckAll data={product.result} /></th>
                        <th>Nama Produk</th>
                        <th>Terjual Qty</th>
                        <th>Jumlah yang Terjual</th>
                        <th>Pengembalian Penjualan Qty</th>
                        <th>Pengembalian Penjualan</th>
                        <th>Laba/Profit</th>
                        <th>Persediaan</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.result.map((e, index) => <tr key={index}>
                            <th><Check data={e} /></th>
                            <td>{e.name}</td>
                            <td>{saleQty(e)}</td>
                            <td>{currencyFormat(saleTotal(e))}</td>
                            <td>{saleReturnQty(e)}</td>
                            <td>{currencyFormat(saleReturnTotal(e))}</td>
                            <td>{currencyFormat(e.saleOrder.map(a => a.qty).reduce((val, prev) => val + prev, 0) * (e.price - e.cost))}</td>
                            <td>{e.qty + saleQty(e) - saleReturnQty(e)}</td>
                        </tr>)
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Total</th>
                        <th>{product.result.length > 0 ? product.result.map(e => saleQty(e)).reduce((val, prev) => val + prev) : 0}</th>
                        <th>{product.result.length > 0 ? currencyFormat(product.result.map(e => saleTotal(e)).reduce((val, prev) => val + prev)) : 0}</th>
                        <th>{product.result.length > 0 ? product.result.map(e => saleReturnQty(e)).reduce((val, prev) => val + prev) : 0}</th>
                        <th>{product.result.length > 0 ? currencyFormat(product.result.map(e => saleReturnTotal(e)).reduce((val, prev) => val + prev)) : 0}</th>
                        <th>{product.result.length > 0 ? currencyFormat(product.result.map(e => e.saleOrder.map(a => a.qty).reduce((val, prev) => val + prev, 0) * (e.price - e.cost)).reduce((val, prev) => val + prev)) : 0}</th>
                        <th>{product.result.length > 0 ? product.result.map(e => e.qty + saleQty(e) - saleReturnQty(e) ).reduce((val, prev) => val + prev) : 0}</th>
                    </tr>
                </tfoot>
            </table>
        </div>

        <Pagination
            hasNextPage={product.hasNextPage}
            hasPrevPage={product.hasPrevPage}
            page={product.page} />
    </>
}
export default Tablelist