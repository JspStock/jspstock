import { getAllData } from "@/app/(public)/(main)/akutansi/listrekening/action"
import { SearchParams } from "@/app/(public)/(main)/akutansi/listrekening/page"
import { currencyFormat } from "@/utils/utils"
import dynamic from "next/dynamic"
import Link from "next/link"

const Pagination = dynamic(() => import('@/app/components/pagination'))
const CheckAll = dynamic(() => import('@/app/components/akutansi/listrekening/(table)/checkAll'))
const Check = dynamic(() => import('@/app/components/akutansi/listrekening/(table)/check'))
const DeleteButton = dynamic(() => import('@/app/components/akutansi/listrekening/(table)/deleteButton'))

export interface SavingAccounts{
    name: string;
    id: string;
    startingBalance: number;
    notes: string | null;
    createdAt: Date;
}

const Tablelist = async ({ searchParams }: {
    searchParams: SearchParams
}) => {
    const savingAccounts = await getAllData(searchParams)

    return <>
        <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900">
            <table className="table">
                <thead className=" text-gray-900">
                    <tr>
                        <th><CheckAll data={savingAccounts.result} /></th>
                        <th>No Rekening</th>
                        <th>Nama</th>
                        <th>Saldo Total</th>
                        <th>Catatan</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {savingAccounts.result.map((e, index) => <tr key={index}>
                        <td><Check data={e} /></td>
                        <td>{e.id}</td>
                        <td>{e.name}</td>
                        <td>{currencyFormat(e.startingBalance)}</td>
                        <td>{e.notes}</td>
                        <td>
                            <div className="dropdown dropdown-left">
                                <div tabIndex={0} role="button" className="btn btn-ghost">Lainnya</div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w">
                                    <li><Link href={`/akutansi/listrekening/${e.id}/edit`}>Edit</Link></li>
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
                        <th>{currencyFormat( savingAccounts.result.length > 0 ? savingAccounts.result.map(e => e.startingBalance).reduce((val, prev) => val + prev) : 0)}</th>
                        <th></th>
                        <th></th>
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
export default Tablelist