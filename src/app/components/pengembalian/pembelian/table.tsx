import { getPurchaseReturn } from "@/app/(public)/(main)/pengembalian/pembelian/action"
import { SearchParams } from "@/app/(public)/(main)/pengembalian/pembelian/page"
import { currencyFormat } from "@/utils/utils"
import moment from "moment"
import dynamic from "next/dynamic"
import Link from "next/link"

const Pagination = dynamic(() => import('@/app/components/pagination'))
const CheckAll = dynamic(() => import('@/app/components/pengembalian/pembelian/(table)/checkAll'))
const Check = dynamic(() => import('@/app/components/pengembalian/pembelian/(table)/check'))
const DeleteButton = dynamic(() => import('@/app/components/pengembalian/pembelian/(table)/deleteButton'))

const Tablelist = async ({ searchParams }: {
    searchParams: SearchParams
}) => {
    const purchaseReturn = await getPurchaseReturn(searchParams)

    return <>
        <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900">
            <table className="table">
                <thead className=" text-gray-900">
                    <tr>
                        <th><CheckAll data={purchaseReturn.result} /></th>
                        <th>Tanggal</th>
                        <th>Referensi</th>
                        <th>Supplier</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        purchaseReturn.result.map((e, index) => <tr key={index}>
                            <td><Check data={e} /></td>
                            <td>{moment(e.createdAt).format('DD-MM-YYYY')}</td>
                            <td>{e.id}</td>
                            <td>{e.purchase.supplier?.name}</td>
                            <td>{currencyFormat(e.purchase.total)}</td>
                            <td>
                                <div className="dropdown dropdown-left">
                                    <div tabIndex={0} role="button" className="btn btn-ghost">Lainnya</div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <li><Link href={`/pengembalian/pembelian/${e.id}/edit`}>Edit</Link></li>
                                        <li><DeleteButton id={e.id} /></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>)
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Total</th>
                        <th></th>
                        <th></th>
                        <th>{currencyFormat(purchaseReturn.result.length > 0 ? purchaseReturn.result.map(e => e.purchase.total).reduce((val, prev) => val + prev) : 0)}</th>
                    </tr>
                </tfoot>
            </table>
        </div>

        <Pagination
            hasNextPage={purchaseReturn.hasNextPage}
            hasPrevPage={purchaseReturn.hasPrevPage}
            page={purchaseReturn.page} />
    </>
}
export default Tablelist