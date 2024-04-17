import { getProduct } from "@/app/(public)/(main)/reports/repproduk/action"
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

    return <>
        <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900">
            <table className="table">
                <thead className=" text-gray-900">
                    <tr>
                        <th><CheckAll data={product.result} /></th>
                        <th>Nama Produk</th>
                        <th>Dibeli Qty</th>
                        <th>Jumlah yang dibeli</th>
                        <th>Terjual Qty</th>
                        <th>Jumlah yang Terjual</th>
                        <th>Pengembalian Penjualan Qty</th>
                        <th>Pengembalian Penjualan</th>
                        <th>Pengembalian pembelian</th>
                        <th>Pengembalian pembelian Qty</th>
                        <th>Laba/Profit</th>
                        <th>Persediaan</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.result.map((e, index) => <tr key={index}>
                            <th><Check data={e} /></th>
                            <td>{e.name}</td>
                            <td>{e.purchaseOrder.map(e => e.qty).reduce((val, prev) => val + prev)}</td>
                            <td>{currencyFormat(e.price * e.purchaseOrder.map(e => e.qty).reduce((val, prev) => val + prev))}</td>
                            <td>{e.saleOrder.map(e => e.qty).reduce((val, prev) => val + prev)}</td>
                            <td>{currencyFormat(e.price * e.saleOrder.map(a => a.qty).reduce((val, prev) => val + prev))}</td>
                            <td>{e.saleReturnOrders.map(e => e.qty).reduce((val, prev) => val + prev)}</td>
                            <td>{currencyFormat(e.price * e.saleReturnOrders.map(a => a.qty).reduce((val, prev) => val + prev))}</td>
                            <td>{e.purchaseReturnOrders.map(a => a.qty).reduce((val, prev) => val + prev)}</td>
                            <td>{currencyFormat(e.price * e.purchaseReturnOrders.map(a => a.qty).reduce((val, prev) => val + prev))}</td>
                            <td>{currencyFormat(
                                (e.price * e.saleOrder.map(e => e.qty).reduce((val, prev) => val + prev)) -
                                (e.price * e.purchaseOrder.map(e => e.qty).reduce((val, prev) => val + prev)) +
                                (e.price * e.purchaseReturnOrders.map(e => e.qty).reduce((val, prev) => val + prev)) -
                                (e.price * e.saleReturnOrders.map(e => e.qty).reduce((val, prev) => val + prev))
                            )}</td>
                            <td>{
                                (e.purchaseOrder.map(e => e.qty).reduce((val, prev) => val + prev)) -
                                (e.saleOrder.map(e => e.qty).reduce((val, prev) => val + prev)) -
                                (e.purchaseReturnOrders.map(e => e.qty).reduce((val, prev) => val + prev)) +
                                (e.saleReturnOrders.map(e => e.qty).reduce((val, prev) => val + prev))
                            }</td>
                        </tr>)
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Total</th>
                        <th>{product.result.length > 0 ? product.result.map(e => e.purchaseOrder.map(a => a.qty).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0}</th>
                        <th>{product.result.length > 0 ? currencyFormat(product.result.map(e => e.price * e.purchaseOrder.map(e => e.qty).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev)) : 0}</th>
                        <th>{product.result.length > 0 ? product.result.map(e => e.saleOrder.map(e => e.qty).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0}</th>
                        <th>{product.result.length > 0 ? currencyFormat(product.result.map(e => e.price * e.saleOrder.map(a => a.qty).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev)) : 0}</th>
                        <th>{product.result.length > 0 ? product.result.map(e => e.saleReturnOrders.map(e => e.qty).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0}</th>
                        <th>{product.result.length > 0 ? currencyFormat(product.result.map(e => e.price * e.saleReturnOrders.map(a => a.qty).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev)) : 0}</th>
                        <th>{product.result.length > 0 ? product.result.map(e => e.purchaseReturnOrders.map(a => a.qty).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0}</th>
                        <th>{product.result.length > 0 ? currencyFormat(product.result.map(e => e.price * e.purchaseReturnOrders.map(a => a.qty).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev)) : 0}</th>
                        <th>{product.result.length > 0 ? currencyFormat(product.result.map(e =>
                            (e.price * e.saleOrder.map(e => e.qty).reduce((val, prev) => val + prev)) -
                            (e.price * e.purchaseOrder.map(e => e.qty).reduce((val, prev) => val + prev)) +
                            (e.price * e.purchaseReturnOrders.map(e => e.qty).reduce((val, prev) => val + prev)) -
                            (e.price * e.saleReturnOrders.map(e => e.qty).reduce((val, prev) => val + prev))
                        ).reduce((val, prev) => val + prev)) : 0}</th>
                        <th>{product.result.length > 0 ? product.result.map(e =>
                            (e.purchaseOrder.map(e => e.qty).reduce((val, prev) => val + prev)) -
                            (e.saleOrder.map(e => e.qty).reduce((val, prev) => val + prev)) -
                            (e.purchaseReturnOrders.map(e => e.qty).reduce((val, prev) => val + prev)) +
                            (e.saleReturnOrders.map(e => e.qty).reduce((val, prev) => val + prev))
                        ).reduce((val, prev) => val + prev) : 0}</th>
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