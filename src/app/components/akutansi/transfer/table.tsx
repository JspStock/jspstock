import { getMoneyTransfer } from "@/app/(public)/(main)/akutansi/transferuang/action"
import { SearchParams } from "@/app/(public)/(main)/akutansi/transferuang/page"
import { currencyFormat } from "@/utils/utils"
import moment from "moment"
import dynamic from "next/dynamic"
import Link from "next/link"

export interface MoneyTransfer{
    id: string;
    fromSavingAccountRelation: {
        name: string;
        id: string;
    } | null;
    toSavingAccountRelation: {
        name: string;
        id: string;
    } | null;
    total: number;
    createdAt: Date;
}

const Pagination = dynamic(() => import('@/app/components/pagination'))
const CheckAll = dynamic(() => import('@/app/components/akutansi/transfer/(table)/checkAll'))
const Check = dynamic(() => import('@/app/components/akutansi/transfer/(table)/check'))
const DeleteButton = dynamic(() => import('@/app/components/akutansi/transfer/(table)/deleteButton'))

const Tablelist = async ({ searchParams }: {
    searchParams: SearchParams
}) => {
    const moneyTransfer = await getMoneyTransfer(searchParams)

    return <>
        <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900">
            <table className="table">
                <thead className=" text-gray-900">
                    <tr>
                        <th><CheckAll data={moneyTransfer.result} /></th>
                        <th>Tanggal</th>
                        <th>No Referensi</th>
                        <th>Dari Rekening</th>
                        <th>Ke Rekening</th>
                        <th>Jumlah</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        moneyTransfer.result.map((e, index) => <tr key={index}>
                            <td><Check data={e} /></td>
                            <td>{moment(e.createdAt).format('DD-MM-YYYY')}</td>
                            <td>{e.id}</td>
                            <td>{`${e.fromSavingAccountRelation?.id}(${e.fromSavingAccountRelation?.name})`}</td>
                            <td>{`${e.toSavingAccountRelation?.id}(${e.toSavingAccountRelation?.name})`}</td>
                            <td>{currencyFormat(e.total)}</td>
                            <td>
                                <div className="dropdown dropdown-left">
                                    <div tabIndex={0} role="button" className="btn btn-ghost">Lainnya</div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box">
                                        <li><Link href={`/akutansi/transferuang/${e.id}/edit`}>Edit</Link></li>
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
                        <th>{currencyFormat(moneyTransfer.result.length > 0 ? moneyTransfer.result.map(e => e.total).reduce((val, prev) => val + prev) : 0)}</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>

        <Pagination
            hasNextPage={moneyTransfer.hasNextPage}
            hasPrevPage={moneyTransfer.hasPrevPage}
            page={moneyTransfer.page} />
    </>
}
export default Tablelist