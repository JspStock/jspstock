const Tablelist = () => {
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
                        <th>Tanggal</th>
                        <th>Referensi</th>
                        <th>Costomer</th>
                        <th>Status Penjualan</th>
                        <th>Status Pembayaran</th>
                        <th>Total</th>
                        <th>Dibayar</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </td>
                        <td>
                            10-04-2023
                        </td>
                        <td>
                            posr-28134812-827263
                        </td>
                        <td>Julian</td>
                        <td>
                            <div className="bg-green-400 text-center text-xs w-20 p-1 rounded-lg font-semibold text-white">
                                Selesai
                            </div>
                        </td>
                        <td>
                            <div className="bg-green-400 text-center text-xs w-20 p-1 rounded-lg font-semibold text-white">
                                Dibayar
                            </div>
                        </td>
                        <td>Rp.10000</td>
                        <td>Rp.10000</td>
                        <td>
                            <details className="dropdown dropdown-top dropdown-end">
                                <summary className="m-1 bg-blue-900 text-white btn">Action</summary>
                                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                    <li><a>Edit</a></li>
                                    <li><a>Hapus</a></li>
                                </ul>
                            </details>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Total</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>Rp.100000</th>
                        <th>Rp.100000</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
export default Tablelist