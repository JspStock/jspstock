import { getData } from "@/app/(public)/(main)/penjualan/listpenjualan/action"
import { SearchParams } from "@/app/(public)/(main)/penjualan/listpenjualan/page"
import { currencyFormat } from "@/utils/utils"
import { $Enums } from "@prisma/client"
import moment from "moment"
import dynamic from "next/dynamic"
import Link from "next/link"

export interface Sales{
    id: string;
    customerUser: {
        name: string;
    } | null;
    saleOrder: {
        product: {
            price: number;
        };
        qty: number;
    }[];
    createdAt: Date;
    saleStatus: $Enums.SaleStatus;
    purchaseStatus: $Enums.SalePurchaseStatus;
    discount: number;
    shippingCost: number;
}

const Pagination = dynamic(() => import('@/app/components/pagination'))
const CheckAll = dynamic(() => import('@/app/components/penjualan/listpenjualan/(table)/checkAll'))
const Check = dynamic(() => import('@/app/components/penjualan/listpenjualan/(table)/check'))
const DeleteButton = dynamic(() => import('@/app/components/penjualan/listpenjualan/(table)/deleteButton'))

const Tablelist = async ({ searchParams }: {
    searchParams: SearchParams
}) => {
    const data = await getData(searchParams)
    const generateBackColorForSaleStatus = (val: $Enums.SaleStatus) => $Enums.SaleStatus.SELESAI == val ? 'bg-green-400' : 'bg-red-400'
    const generateBackColorForPurchaseStatus = (color: $Enums.SalePurchaseStatus) => $Enums.SalePurchaseStatus.DIBAYAR == color ? "bg-green-400"
        : $Enums.PurchaseStatus.SEBAGIAN && $Enums.SalePurchaseStatus.TERTUNDA == color ? "bg-yellow-400"
            : $Enums.PurchaseStatus.TERTUNDA == color ? "bg-blue-400" : "bg-red-400"

    return <>
        <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900">
            <table className="table">
                <thead className=" text-gray-900">
                    <tr>
                        <th><CheckAll data={data.result} /></th>
                        <th>Tanggal</th>
                        <th>Referensi</th>
                        <th>Costomer</th>
                        <th>Status Penjualan</th>
                        <th>Status Pembayaran</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.result.map((e, index) => <tr key={index}>
                            <td><Check data={e} /></td>
                            <td>{moment(e.createdAt).format('DD-MM-YYYY')}</td>
                            <td>{e.id}</td>
                            <td>{e.customerUser ? e.customerUser.name : 'N/A'}</td>
                            <td>
                                <div className={`${generateBackColorForSaleStatus(e.saleStatus)} text-center text-xs w-20 p-1 rounded-lg font-semibold text-white`}>
                                    {e.saleStatus}
                                </div>
                            </td>
                            <td>
                                <div className={`${generateBackColorForPurchaseStatus(e.purchaseStatus)} text-center text-xs w-20 p-1 rounded-lg font-semibold text-white`}>
                                    {e.purchaseStatus}
                                </div>
                            </td>
                            <td>{ currencyFormat(
                                    (e.shippingCost +
                                    (e.saleOrder.length > 0 ? e.saleOrder.map(a => a.qty * a.product.price).reduce((val, prev) => val + prev) : 0)) -
                                    e.discount
                                ) }</td>
                            <td>
                                <div className="dropdown">
                                    <div tabIndex={0} role="button" className="btn btn-ghost">Lainnya</div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box">
                                        <li><Link href={`/penjualan/listpenjualan/${e.id}/edit`}>Edit</Link></li>
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
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>

        <Pagination
            hasNextPage={data.hasNextPage}
            hasPrevPage={data.hasPrevPage}
            page={data.page} />
    </>
}
export default Tablelist