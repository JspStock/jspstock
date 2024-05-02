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

    return <table className="table w-full">
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
                    <td>{currencyFormat(e.credit)}</td>
                    <td>{currencyFormat(e.debit)}</td>
                    <td>{ e.description }</td>
                    <td>{ currencyFormat(e.debit + mutation.filter((_, i) => i < index).map(a => a.debit).reduce((a, b) => a + b, 0) - (e.credit + mutation.filter((_, i) => i < index).map(a => a.credit).reduce((a, b) => a + b, 0))) }</td>
                </tr>)
            }
        </tbody>
    </table>
}

export default Table