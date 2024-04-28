import { getAllData } from "@/app/(public)/(main)/pengguna/costomer/action"
import { SearchParams } from "@/app/(public)/(main)/pengguna/costomer/page"
import dynamic from "next/dynamic";
import Link from "next/link";

const CheckAll = dynamic(() => import('@/app/components/pengguna/costomer/(table)/checkAll'))
const Check = dynamic(() => import('@/app/components/pengguna/costomer/(table)/check'))
const Pagination = dynamic(() => import('@/app/components/pengguna/costomer/(table)/pagination'))
const DeleteButton = dynamic(() => import('@/app/components/pengguna/costomer/(table)/deleteButton'))

const Tablelist = async ({ searchParams }: {
    searchParams: SearchParams
}) => {
    const data = await getAllData(searchParams)

    return <>
        <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900">
            <table className="table">
                <thead className=" text-gray-900">
                    <tr>
                        <th><CheckAll data={data.result} /></th>
                        <th>Grup Costomer</th>
                        <th>Nama</th>
                        <th>No WhatsApp</th>
                        <th>Alamat</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.result.map(e => <tr key={e.id}>
                            <td><Check data={e} /></td>
                            <td>{e.customerGroup ? e.customerGroup.name : 'N/A'}</td>
                            <td>{e.name}</td>
                            <td>{e.noWa}</td>
                            <td>{e.address}</td>
                            <td>
                                <div className="dropdown dropdown-left">
                                    <div tabIndex={0} role="button" className="btn btn-ghost">Lainnya</div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <li><Link href={`/pengguna/costomer/${e.id}/edit`}>Edit</Link></li>
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
            hasNextPage={data.hasNextPage}
            hasPrevPage={data.hasPrevPage}
            page={data.page} />
    </>
}
export default Tablelist