import { getAllData } from "@/app/(public)/(main)/pengeluaran/kategoripengeluaran/action"
import { SearchParams } from "@/app/(public)/(main)/pengeluaran/kategoripengeluaran/page"
import dynamic from "next/dynamic";
import Link from "next/link"

const CheckAll = dynamic(() => import('@/app/components/pengeluaran/kategori/(table)/checkAll'))
const Check = dynamic(() => import('@/app/components/pengeluaran/kategori/(table)/check'))
const DeleteButton = dynamic(() => import('@/app/components/pengeluaran/kategori/(table)/deleteButton'))
const Pagination = dynamic(() => import('@/app/components/pagination'))

export interface ExpenditureCategory {
    id: string;
    name: string;
}

const TableKategori = async ({ searchParams }: {
    searchParams: SearchParams
}) => {
    const expenditureCategory = await getAllData(searchParams)

    return <>
        <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900">
            <table className="table">
                <thead className=" text-gray-900">
                    <tr>
                        <th><CheckAll data={expenditureCategory.result} /></th>
                        <th>Kode</th>
                        <th>Nama</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {expenditureCategory.result.map((e, index) => <tr key={index}>
                        <td><Check data={e} /></td>
                        <td>{e.id.split('_')[1]}</td>
                        <td>{e.name}</td>
                        <td>
                            <div className="dropdown dropdown-left">
                                <div tabIndex={0} role="button" className="btn btn-ghost">Lainnya</div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><Link href={`/pengeluaran/kategoripengeluaran/${e.id}/edit`}>Edit</Link></li>
                                    <li><DeleteButton id={e.id} /></li>
                                </ul>
                            </div>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>

        <Pagination
            hasNextPage={expenditureCategory.hasNextPage}
            hasPrevPage={expenditureCategory.hasPrevPage}
            page={expenditureCategory.page} />
    </>
}
export default TableKategori