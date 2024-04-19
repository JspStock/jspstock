import { getStore } from "@/app/(public)/(main)/toko/action"
import { SearchParams } from "@/app/(public)/(main)/toko/page"
import dynamic from "next/dynamic"
import Link from "next/link"

const Pagination = dynamic(() => import('@/app/components/pagination'))
const CheckAll = dynamic(() => import('./(table)/checkAll'))
const Check = dynamic(() => import('./(table)/check'))
const DeleteButton = dynamic(() => import('./(table)/deleteButton'))

const Tablelist = async ({ searchParams }: {
    searchParams: SearchParams
}) => {
    const store = await getStore(searchParams)

    return <>
        <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900">
            <table className="table">
                <thead className=" text-gray-900">
                    <tr>
                        <th><CheckAll data={store.result} /></th>
                        <th>Toko</th>
                        <th>No WhatsApp</th>
                        <th>Email</th>
                        <th>Alamat</th>
                        <th>Jumlah Produk</th>
                        <th>Quantity Stok</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        store.result.map((e, index) => <tr key={index}>
                            <td><Check data={e} /></td>
                            <td>{e.name}</td>
                            <td>{e.noWa}</td>
                            <td>{e.email}</td>
                            <td>{e.address}</td>
                            <td>{e.product.length}</td>
                            <td>{e.product.length > 0 ? e.product.map(a =>
                                (a.purchaseOrder.length > 0 ? a.purchaseOrder.map(a => a.qty).reduce((val, prev) => val + prev) : 0) -
                                (a.saleOrder.length > 0 ? a.saleOrder.map(a => a.qty).reduce((val, prev) => val + prev) : 0) +
                                (a.saleReturnOrders.length > 0 ? a.saleReturnOrders.map(a => a.qty).reduce((val, prev) => val + prev) : 0) -
                                (a.purchaseReturnOrders.length > 0 ? a.purchaseReturnOrders.map(a => a.qty).reduce((val, prev) => val + prev) : 0)
                            ) : 0}</td>
                            <td>
                                <div className="dropdown dropdown-left">
                                    <div tabIndex={0} role="button" className="btn btn-ghost">Lainnya</div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <li><Link href={`/toko/${e.id}/edit`}>Edit</Link></li>
                                        <li><DeleteButton id={e.id} /></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>

        <Pagination
            hasNextPage={store.hasNextPage}
            hasPrevPage={store.hasPrevPage}
            page={store.page} /> 
    </>
}
export default Tablelist