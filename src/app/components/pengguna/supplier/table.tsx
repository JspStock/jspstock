import { getAllSupplier } from "@/app/(public)/(main)/pengguna/supplier/action"

export interface Supplier{
    id: string;
    name: string;
    email: string;
    noWa: string;
    address: string | null;
}

const Tablelist = async () => {
    const supplier: Array<Supplier> = await getAllSupplier()

    return (
        <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900">
            <table className="table">
                <thead className=" text-gray-900">
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
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
                            <td>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </td>
                            <td>{ e.name }</td>
                            <td>{ e.email }</td>
                            <td>{ e.noWa }</td>
                            <td>{ e.address }</td>
                            <td>
                                <details className="dropdown dropdown-top dropdown-end">
                                    <summary className="m-1 bg-blue-900 text-white btn">Action</summary>
                                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                        <li><a>Edit</a></li>
                                        <li><a>Hapus</a></li>
                                    </ul>
                                </details>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}
export default Tablelist