import { getAllSupplier } from "@/app/(public)/(main)/pengguna/supplier/action"
import { SearchParams } from "@/app/(public)/(main)/pengguna/supplier/page";
import dynamic from "next/dynamic";

export interface Supplier {
    id: string;
    name: string;
    email: string;
    noWa: string;
    address: string | null;
}

const CheckAll = dynamic(() => import('@/app/components/pengguna/supplier/(table)/checkAll'))
const Check = dynamic(() => import('@/app/components/pengguna/supplier/(table)/check'))
const DeleteButton = dynamic(() => import('@/app/components/pengguna/supplier/(table)/deleteButton'))

const Tablelist = async ({ searchParams}: { searchParams: SearchParams }) => {
    const supplier: Array<Supplier> = await getAllSupplier(searchParams)

    return (
        <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900">
            <table className="table">
                <thead className=" text-gray-900">
                    <tr>
                        <th><CheckAll data={supplier} /></th>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>No WhatsApp</th>
                        <th>Alamat</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        supplier.map(e => <tr key={e.id}>
                            <td><Check data={e} /></td>
                            <td>{e.name}</td>
                            <td>{e.email}</td>
                            <td>{e.noWa}</td>
                            <td>{e.address}</td>
                            <td>
                                <div className="dropdown dropdown-left">
                                    <button tabIndex={0} role="button" className="btn btn-ghost m-1">Lainnya</button>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <li><a>Ubah</a></li>
                                        <li><DeleteButton id={e.id} /></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}
export default Tablelist