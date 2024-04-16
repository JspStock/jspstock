import { getSavingAccounts } from "@/app/(public)/(main)/akutansi/neraca/action"
import { SearchParams } from "@/app/(public)/(main)/akutansi/neraca/page"
import { currencyFormat } from "@/utils/utils"
import dynamic from "next/dynamic"

const Pagination = dynamic(() => import('@/app/components/pagination'))
const CheckAll = dynamic(() => import('@/app/components/akutansi/neraca/(table)/checkAll'))
const Check = dynamic(() => import('@/app/components/akutansi/neraca/(table)/check'))

const Table = async ({ searchParams }: {
    searchParams: SearchParams
}) => {
    const savingAccounts = await getSavingAccounts(searchParams)

    return <>
        <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900">
            <table className="table">
                <thead className=" text-gray-900">
                    <tr>
                        <th><CheckAll data={savingAccounts.result} /></th>
                        <th>Nama</th>
                        <th>Nomor Rekening</th>
                        <th>Kredit</th>
                        <th>Debit</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        savingAccounts.result.map((e, index) => <tr key={index}>
                            <td><Check data={e} /></td>
                            <td>{e.name}</td>
                            <td>{e.id}</td>
                            <td>{currencyFormat(
                                (e.recipient.length > 0 ? e.recipient.map(a => a.total).reduce((val, prev) => val + prev) : 0) +
                                (e.sales.length > 0 ? e.sales.map(a => a.saleOrder.map(b => b.qty * b.product.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) +
                                (e.purchaseReturns.length > 0 ? e.purchaseReturns.map(a => a.purchaseReturnOrders.map(b => b.qty * b.product!.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0))}</td>
                            <td>-{currencyFormat(
                                (e.sender.length > 0 ? e.sender.map(a => a.total).reduce((val, prev) => val + prev) : 0) +
                                (e.purchase.length > 0 ? e.purchase.map(a => a.purchaseOrder.map(b => b.qty * b.product.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) +
                                (e.saleReturns.length > 0 ? e.saleReturns.map(a => a.saleReturnOrders.map(b => b.qty * b.product!.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) +
                                (e.expenditures.length > 0 ? e.expenditures.map(a => a.total).reduce((val, prev) => val + prev) : 0)
                            )}</td>
                            <td>{currencyFormat(
                                e.startingBalance +
                                (((e.recipient.length > 0 ? e.recipient.map(a => a.total).reduce((val, prev) => val + prev) : 0) +
                                    (e.sales.length > 0 ? e.sales.map(a => a.saleOrder.map(b => b.qty * b.product.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) +
                                    (e.purchaseReturns.length > 0 ? e.purchaseReturns.map(a => a.purchaseReturnOrders.map(b => b.qty * b.product!.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0)) -

                                    ((e.sender.length > 0 ? e.sender.map(a => a.total).reduce((val, prev) => val + prev) : 0) +
                                        (e.purchase.length > 0 ? e.purchase.map(a => a.purchaseOrder.map(b => b.qty * b.product.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) +
                                        (e.saleReturns.length > 0 ? e.saleReturns.map(a => a.saleReturnOrders.map(b => b.qty * b.product!.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) +
                                        (e.expenditures.length > 0 ? e.expenditures.map(a => a.total).reduce((val, prev) => val + prev) : 0)))
                            )}</td>
                        </tr>)
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Total</th>
                        <th></th>
                        <td>{ currencyFormat(
                            savingAccounts.result.length > 0 ? savingAccounts.result.map(e => 
                                (e.recipient.length > 0 ? e.recipient.map(a => a.total).reduce((val, prev) => val + prev) : 0) +
                                (e.sales.length > 0 ? e.sales.map(a => a.saleOrder.map(b => b.qty * b.product.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) +
                                (e.purchaseReturns.length > 0 ? e.purchaseReturns.map(a => a.purchaseReturnOrders.map(b => b.qty * b.product!.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0)
                            ).reduce((val, prev) => val + prev) : 0
                        ) }</td>
                        <td>-{ currencyFormat(
                            savingAccounts.result.length > 0 ? savingAccounts.result.map(e => 
                                (e.sender.length > 0 ? e.sender.map(a => a.total).reduce((val, prev) => val + prev) : 0) +
                                (e.purchase.length > 0 ? e.purchase.map(a => a.purchaseOrder.map(b => b.qty * b.product.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) +
                                (e.saleReturns.length > 0 ? e.saleReturns.map(a => a.saleReturnOrders.map(b => b.qty * b.product!.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) +
                                (e.expenditures.length > 0 ? e.expenditures.map(a => a.total).reduce((val, prev) => val + prev) : 0)
                            ).reduce((val, prev) => val + prev) : 0
                        ) }</td>
                        <td>{ currencyFormat(
                            savingAccounts.result.length > 0 ? savingAccounts.result.map(e => 
                                e.startingBalance +
                                (((e.recipient.length > 0 ? e.recipient.map(a => a.total).reduce((val, prev) => val + prev) : 0) +
                                    (e.sales.length > 0 ? e.sales.map(a => a.saleOrder.map(b => b.qty * b.product.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) +
                                    (e.purchaseReturns.length > 0 ? e.purchaseReturns.map(a => a.purchaseReturnOrders.map(b => b.qty * b.product!.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0)) -

                                    ((e.sender.length > 0 ? e.sender.map(a => a.total).reduce((val, prev) => val + prev) : 0) +
                                        (e.purchase.length > 0 ? e.purchase.map(a => a.purchaseOrder.map(b => b.qty * b.product.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) +
                                        (e.saleReturns.length > 0 ? e.saleReturns.map(a => a.saleReturnOrders.map(b => b.qty * b.product!.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) +
                                        (e.expenditures.length > 0 ? e.expenditures.map(a => a.total).reduce((val, prev) => val + prev) : 0)))
                            ).reduce((val, prev) => val + prev) : 0
                        ) }</td>
                    </tr>
                </tfoot>
            </table>
        </div>

        <Pagination
            hasNextPage={savingAccounts.hasNextPage}
            hasPrevPage={savingAccounts.hasPrevPage}
            page={savingAccounts.page} />
    </>
}
export default Table