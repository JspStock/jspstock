import { GetSavingAccounts, getSavingAccounts } from "@/app/(public)/(main)/akutansi/neraca/action"
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
    const calculateSale = (data: GetSavingAccounts['sales']): number => {
        if (data.length > 0) {
            return data.map(e =>
                (e.shippingCost + e.saleOrder.map(a => a.qty * a.product.price).reduce((val, prev) => val + prev)) -
                e.discount
            ).reduce((val, prev) => val + prev)
        } else {
            return 0
        }
    }

    const calculateRecipient = (data: GetSavingAccounts['recipient']): number => {
        if (data.length > 0) {
            return data.map(e => e.total).reduce((val, prev) => val + prev)
        } else {
            return 0
        }
    }

    const calculatePurchaseReturns = (data: GetSavingAccounts['purchaseReturns']): number => {
        if (data.length > 0) {
            return data.map(e => e.purchaseReturnOrders.map(a => a.qty * a.product!.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev)
        } else {
            return 0
        }
    }

    const calculateSender = (data: GetSavingAccounts['sender']): number => {
        if (data.length > 0) {
            return data.map(e => e.total).reduce((val, prev) => val + prev)
        } else {
            return 0
        }
    }

    const calculatePurchase = (data: GetSavingAccounts['purchase']): number => {
        if (data.length > 0) {
            return data.map(e =>
                (e.shippingCost + e.purchaseOrder.map(a => a.qty * a.product.price).reduce((val, prev) => val + prev)) -
                e.discount
            ).reduce((val, prev) => val + prev)
        } else {
            return 0
        }
    }

    const calculateExpenditures = (data: GetSavingAccounts['expenditures']): number => {
        if (data.length > 0) {
            return data.map(e => e.total).reduce((val, prev) => val + prev)
        } else {
            return 0
        }
    }

    const calculateSaleReturns = (data: GetSavingAccounts['saleReturns']): number => {
        if (data.length > 0) {
            return data.map(e => e.saleReturnOrders.map(a => a.qty * a.product!.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev)
        } else {
            return 0
        }
    }

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
                            <td>{currencyFormat(calculateSale(e.sales) + calculatePurchaseReturns(e.purchaseReturns) + calculateRecipient(e.recipient))}</td>
                            <td>-{currencyFormat(calculateSender(e.sender) + calculatePurchase(e.purchase) + calculateSaleReturns(e.saleReturns) + calculateExpenditures(e.expenditures))}</td>
                            <td>{currencyFormat(
                                e.startingBalance +
                                (calculateSale(e.sales) + calculatePurchaseReturns(e.purchaseReturns) + calculateRecipient(e.recipient)) -
                                (calculateSender(e.sender) + calculatePurchase(e.purchase) + calculateSaleReturns(e.saleReturns) + calculateExpenditures(e.expenditures))
                            )}</td>
                        </tr>)
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Total</th>
                        <th></th>
                        <td>{currencyFormat(
                            savingAccounts.result.length > 0 ? savingAccounts.result.map(e =>
                                (e.recipient.length > 0 ? e.recipient.map(a => a.total).reduce((val, prev) => val + prev) : 0) +
                                (e.sales.length > 0 ? e.sales.map(a => a.saleOrder.map(b => b.qty * b.product.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) +
                                (e.purchaseReturns.length > 0 ? e.purchaseReturns.map(a => a.purchaseReturnOrders.map(b => b.qty * b.product!.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0)
                            ).reduce((val, prev) => val + prev) : 0
                        )}</td>
                        <td>-{currencyFormat(
                            savingAccounts.result.length > 0 ? savingAccounts.result.map(e =>
                                (e.sender.length > 0 ? e.sender.map(a => a.total).reduce((val, prev) => val + prev) : 0) +
                                (e.purchase.length > 0 ? e.purchase.map(a => a.purchaseOrder.map(b => b.qty * b.product.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) +
                                (e.saleReturns.length > 0 ? e.saleReturns.map(a => a.saleReturnOrders.map(b => b.qty * b.product!.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) +
                                (e.expenditures.length > 0 ? e.expenditures.map(a => a.total).reduce((val, prev) => val + prev) : 0)
                            ).reduce((val, prev) => val + prev) : 0
                        )}</td>
                        <td>{currencyFormat(
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
                        )}</td>
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