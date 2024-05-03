import { getUser } from "@/app/(public)/(main)/pengguna/(users)/action"
import { SearchParams } from "@/app/(public)/(main)/pengguna/(users)/page"
import { $Enums } from "@prisma/client"
import dynamic from "next/dynamic"
import Link from "next/link"

const Pagination = dynamic(() => import('@/app/components/pagination'))
const CheckAll = dynamic(() => import('./(table)/checkAll'))
const Check = dynamic(() => import('./(table)/check'))
const DeleteButton = dynamic(() => import('./(table)/deleteButton'))

const Tablelist = async ({ searchParams }: {
    searchParams: SearchParams
}) => {
    const user = await getUser(searchParams)

    return <>
        <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900">
            <table className="table">
                <thead className=" text-gray-900">
                    <tr>
                        <th><CheckAll data={user.result} /></th>
                        <th>Nama Pengguna</th>
                        <th>Email</th>
                        <th>No WhatsApp</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user.result.map((e, index) => <tr key={index}>
                            <td><Check data={e} /></td>
                            <td>{e.name}</td>
                            <td>{e.email}</td>
                            <td>{e.noWa}</td>
                            <td className="capitalize">{e.role.split("_").join(" ").toLowerCase()}</td>
                            <td>
                                <div className={`${e.status == $Enums.UserStatus.AKTIF ? 'bg-blue-900' : 'bg-red-400'} text-center text-xs w-20 p-1 rounded-lg font-semibold text-white`}>
                                    {e.status}
                                </div>
                            </td>
                            <td>
                                <div className="dropdown dropdown-left">
                                    <div tabIndex={0} role="button" className="btn btn-ghost">Lainnya</div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <li><Link href={`/pengguna/${e.id}/edit`}>Edit</Link></li>
                                        <li><DeleteButton data={e} /></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>

        <Pagination
            hasNextPage={user.hasNextPage}
            hasPrevPage={user.hasPrevPage}
            page={user.page}/>
    </>
}
export default Tablelist