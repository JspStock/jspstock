import { GetTransactionRecordPayload, getTransactionRecord } from "@/app/(public)/(main)/akutansi/neraca/action"
import { SearchParams } from "@/app/(public)/(main)/akutansi/neraca/page"
import { currencyFormat } from "@/utils/utils"
import dynamic from "next/dynamic"

const Pagination = dynamic(() => import('@/app/components/pagination'))
const CheckAll = dynamic(() => import('@/app/components/akutansi/neraca/(table)/checkAll'))
const Check = dynamic(() => import('@/app/components/akutansi/neraca/(table)/check'))

const Table = async ({ searchParams }: {
    searchParams: SearchParams
}) => {
    const transactionRecord = await getTransactionRecord(searchParams)
    const sumCredit = (data: GetTransactionRecordPayload['transactionRecords']) => {
        const total = data.reduce((acc, row) => acc + row.credit, BigInt(0))
        return Number(total)
    }
    const sumDebit = (data: GetTransactionRecordPayload['transactionRecords']) => {
        const total = data.reduce((acc, row) => acc + row.debit, BigInt(0))
        return Number(total)
    }

    return <>
        <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900">
            <table className="table">
                <thead className=" text-gray-900">
                    <tr>
                        <th><CheckAll data={transactionRecord.result} /></th>
                        <th>Nama</th>
                        <th>Nomor Rekening</th>
                        <th>Kredit</th>
                        <th>Debit</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactionRecord.result.map((e, index) => <tr key={index}>
                            <td><Check data={e} /></td>
                            <td>{e.name}</td>
                            <td>{e.id}</td>
                            <td>-{currencyFormat(sumCredit(e.transactionRecords))}</td>
                            <td>{currencyFormat(sumDebit(e.transactionRecords))}</td>
                            <td>{currencyFormat(sumDebit(e.transactionRecords) - sumCredit(e.transactionRecords))}</td>
                        </tr>)
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Total</th>
                        <th></th>
                        <td>-{currencyFormat(transactionRecord.result.length > 0 ? transactionRecord.result.map(e => sumCredit(e.transactionRecords)).reduce((val, prev) => val + prev) : 0)}</td>
                        <td>{currencyFormat(transactionRecord.result.length > 0 ? transactionRecord.result.map(e => sumDebit(e.transactionRecords)).reduce((val, prev) => val + prev) : 0)}</td>
                        <td>{currencyFormat(transactionRecord.result.length > 0 ? transactionRecord.result.map(e => sumDebit(e.transactionRecords) - sumCredit(e.transactionRecords)).reduce((val, prev) => val + prev) : 0)}</td>
                    </tr>
                </tfoot>
            </table>
        </div>

        <Pagination
            hasNextPage={transactionRecord.hasNextPage}
            hasPrevPage={transactionRecord.hasPrevPage}
            page={transactionRecord.page} />
    </>
}
export default Table