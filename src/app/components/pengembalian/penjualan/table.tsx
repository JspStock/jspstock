import { getSaleReturns } from "@/app/(public)/(main)/pengembalian/penjualan/action"
import { SearchParams } from "@/app/(public)/(main)/pengembalian/penjualan/page"
import { currencyFormat } from "@/utils/utils"
import moment from "moment"
import dynamic from "next/dynamic"
import Link from "next/link"

export interface SaleReturns{
    customerUser: {
        name: string;
    } | null;
    saleReturnOrders: {
        product: {
            price: number;
        } | null;
        qty: number;
    }[];
    id: string;
    createdAt: Date;
}

const Pagination = dynamic(() => import('@/app/components/pagination'))
const CheckAll = dynamic(() => import('@/app/components/pengembalian/penjualan/(table)/checkAll'))
const Check = dynamic(() => import('@/app/components/pengembalian/penjualan/(table)/check'))
const DeleteButton = dynamic(() => import('@/app/components/pengembalian/penjualan/(table)/deleteButton'))

const Tablelist = async ({ searchParams }: {
    searchParams: SearchParams
}) => {
    const saleReturns = await getSaleReturns(searchParams)

    return <>
        <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900">
            <table className="table">
                <thead className=" text-gray-900">
                    <tr>
                        <th><CheckAll data={saleReturns.result} /></th>
                        <th>Tanggal</th>
                        <th>Referensi</th>
                        <th>Costomer</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {saleReturns.result.map((e, index) => <tr key={index}>
                        <td><Check data={e} /></td>
                        <td>{moment(e.createdAt).format('DD-MM-YYYY')}</td>
                        <td>{e.id}</td>
                        <td>{e.customerUser?.name}</td>
                        <td>{currencyFormat(e.saleReturnOrders.length > 0 ? e.saleReturnOrders.map(a => a.qty * a.product!.price).reduce((val, prev) => val + prev) : 0)}</td>
                        <td>
                            <div className="dropdown dropdown-left">
                                <div tabIndex={0} role="button" className="btn btn-ghost">Lainnya</div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box">
                                    <li><Link href={`/pengembalian/penjualan/${e.id}/edit`}>Edit</Link></li>
                                    <li><DeleteButton id={e.id} /></li>
                                </ul>
                            </div>
                        </td>
                    </tr>)}
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Total</th>
                        <th></th>
                        <th></th>
                        <th>{currencyFormat(saleReturns.result.length > 0 ? saleReturns.result.map(e => e.saleReturnOrders.map(a => a.qty * a.product!.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0)}</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>

        <Pagination
            hasNextPage={saleReturns.hasNextPage}
            hasPrevPage={saleReturns.hasPrevPage}
            page={saleReturns.page} />
    </>
}
export default Tablelist