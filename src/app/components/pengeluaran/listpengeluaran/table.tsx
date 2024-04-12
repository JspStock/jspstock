import { getAllData } from "@/app/(public)/(main)/pengeluaran/listpengeluaran/action"
import { SearchParams } from "@/app/(public)/(main)/pengeluaran/listpengeluaran/page"
import { currencyFormat } from "@/utils/utils"
import moment from "moment"
import dynamic from "next/dynamic"
import Link from "next/link"

export interface Expenditures {
    expenditureCategory: {
        name: string;
    } | null;
    createdAt: Date;
    id: string;
    total: number;
    notes: string | null;
}

const Pagination = dynamic(() => import('@/app/components/pagination'))
const CheckAll = dynamic(() => import('@/app/components/pengeluaran/listpengeluaran/(table)/checkAll'))
const Check = dynamic(() => import('@/app/components/pengeluaran/listpengeluaran/(table)/check'))
const DeleteButton = dynamic(() => import('@/app/components/pengeluaran/listpengeluaran/(table)/deleteButton'))

const Tablelist = async ({ searchParams }: {
    searchParams: SearchParams
}) => {
    const expenditures = await getAllData(searchParams)

    return <>
        <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900">
            <table className="table">
                <thead className=" text-gray-900">
                    <tr>
                        <th><CheckAll data={expenditures.result} /></th>
                        <th>Tanggal</th>
                        <th>Referensi</th>
                        <th>Kategori</th>
                        <th>Jumlah</th>
                        <th>Catatan</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {expenditures.result.map((e, index) => <tr key={index}>
                        <td><Check data={e} /></td>
                        <td>{moment(e.createdAt).format('DD-MM-YYYY')}</td>
                        <td>{e.id}</td>
                        <td>{e.expenditureCategory?.name}</td>
                        <td>{currencyFormat(e.total)}</td>
                        <td>{e.notes}</td>
                        <td>
                            <div className="dropdown dropdown-left">
                                <div tabIndex={0} role="button" className="btn">Lainnya</div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box">
                                    <li><Link href={`/pengeluaran/listpengeluaran/${e.id}/edit`}>Edit</Link></li>
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
                        <th>{currencyFormat(expenditures.result.length > 0 ? expenditures.result.map(e => e.total).reduce((val, prev) => val + prev) : 0)}</th>
                    </tr>
                </tfoot>
            </table>
        </div>

        <Pagination
            hasNextPage={expenditures.hasNextPage}
            hasPrevPage={expenditures.hasPrevPage}
            page={expenditures.page} />
    </>
}
export default Tablelist