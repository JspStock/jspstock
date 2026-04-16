import { getMutation } from "@/app/(public)/(main)/akutansi/rekeningnasabah/action"
import { SearchParams } from "@/app/(public)/(main)/akutansi/rekeningnasabah/page"
import { currencyFormat } from "@/utils/utils"
import moment from "moment"
import dynamic from "next/dynamic"

const CheckAll = dynamic(() => import('./(table)/checkAll'))
const Check = dynamic(() => import('./(table)/check'))

const Table = async ({ searchParams }: {
    searchParams: SearchParams
}) => {
    const mutation = await getMutation(searchParams)

    return <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900">

        <table className="table w-full">
            <thead>
                <tr>
                    <th><CheckAll data={mutation} /></th>
                    <th>Tanggal</th>
                    <th>Nomor Transaksi</th>
                    <th>Kredit</th>
                    <th>Debit</th>
                    <th>Deskripsi</th>
                    <th>Saldo</th>
                </tr>
            </thead>
            <tbody>
                {
                    mutation.map((e, index) => <tr key={index}>
                        <td><Check data={e} /></td>
                        <td>{moment(e.createdAt).format('DD-MM-YYYY')}</td>
                        <td>{e.reference}</td>
                        <td>{currencyFormat(Number(e.credit))}</td>
                        <td>{currencyFormat(Number(e.debit))}</td>
                        <td>{e.description}</td>
                        <td>{currencyFormat(Number(e.saldo))}</td>
                    </tr>)
                }
            </tbody>
        </table>
    </div>
}

export default Table