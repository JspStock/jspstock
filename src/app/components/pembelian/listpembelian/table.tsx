import { getData } from "@/app/(public)/(main)/pembelian/listpembelian/action"
import { SearchParams } from "@/app/(public)/(main)/pembelian/listpembelian/page"
import { currencyFormat } from "@/utils/utils"
import { $Enums } from "@prisma/client"
import moment from "moment"
import dynamic from "next/dynamic"
import Link from "next/link"

const Pagination = dynamic(() => import('@/app/components/pembelian/listpembelian/pagination'))
const CheckAll = dynamic(() => import('@/app/components/pembelian/listpembelian/(table)/checkAll'))
const Check = dynamic(() => import('@/app/components/pembelian/listpembelian/(table)/check'))
const DeleteButton = dynamic(() => import('@/app/components/pembelian/listpembelian/(table)/deleteButton'))

const Tablelist = async ({ searchParams }: {
    searchParams: SearchParams
}) => {
    const purchaseData = await getData({ searchParams })
    const setColorPurchaseStatus = (color: $Enums.PurchaseStatus) => $Enums.PurchaseStatus.DITERIMA == color ? "bg-green-400"
        : $Enums.PurchaseStatus.SEBAGIAN == color ? "bg-yellow-400"
            : $Enums.PurchaseStatus.TERTUNDA == color ? "bg-blue-400" : "bg-red-400"

    return <>
        <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900">
            <table className="table">
                <thead className=" text-gray-900">
                    <tr>
                        <th><CheckAll data={purchaseData.result.map(e => ({
                            id: e.id,
                            date: moment(e.createdAt).format("DD-MM-YYYY"),
                            purchaseStatus: e.purchaseStatus,
                            supplier: e.supplier ? e.supplier.name : '',
                            total: (e.shippingCost +
                                e.purchaseOrder.map(val => val.qty * (val.product?.price ?? 0)).reduce((val, prev) => val + prev)) -
                            e.discount
                        }))} /></th>
                        <th>Tanggal</th>
                        <th>Referensi</th>
                        <th>Supplier</th>
                        <th>Status Pembelian</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {purchaseData.result.map(e => <tr key={e.id}>
                        <th><Check data={{
                            id: e.id,
                            supplier: e.supplier ? e.supplier.name : '',
                            date: moment(e.createdAt).format("DD-MM-YYYY"),
                            purchaseStatus: e.purchaseStatus,
                            total: (e.shippingCost +
                                e.purchaseOrder.map(val => val.qty * (val.product?.price ?? 0)).reduce((val, prev) => val + prev)) -
                            e.discount
                        }} /></th>
                        <td> {moment(e.createdAt).format("DD-MM-YYYY")} </td>
                        <td>{e.id}</td>
                        <td>{e.supplier?.name}</td>
                        <td>
                            <div className={`${setColorPurchaseStatus(e.purchaseStatus as keyof typeof $Enums.PurchaseStatus)} text-center text-xs w-20 p-1 rounded-lg font-semibold text-white`}>
                                {e.purchaseStatus}
                            </div>
                        </td>
                        <td>{currencyFormat(
                            (e.shippingCost +
                                e.purchaseOrder.map(val => val.qty * (val.product?.price ?? 0)).reduce((val, prev) => val + prev)) -
                            e.discount
                        )}</td>
                        <td>
                            <div className="dropdown dropdown-left">
                                <div tabIndex={0} role="button" className="btn btn-ghost">Lainnya</div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><Link href={`/pembelian/${e.id}/edit`}>Ubah</Link></li>
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
                        <th></th>
                        <th>{currencyFormat(purchaseData.result.length > 0 ?
                            purchaseData.result.map(e => (
                                e.shippingCost +
                                e.purchaseOrder.map(val => val.qty * (val.product?.price ?? 0)).reduce((val, prev) => val + prev)
                            ) - e.discount).reduce((val, prev) => val + prev) : 0
                        )}</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>

        <Pagination pagination={{
            page: purchaseData.page,
            hasNextPage: purchaseData.hasNextPage,
            hasPrevPage: purchaseData.hasPrevPage
        }} />
    </>
}

export default Tablelist