const Tablelist = () => {
    return (
        <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900">
            <table className="table">
                {/* head */}
                <thead className=" text-gray-900">
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                        <th>Tanggal</th>
                        <th>Referensi</th>
                        <th>Toko</th>
                        <th>Kategori</th>
                        <th>Jumlah</th>
                        <th>Catatan</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
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
                        <td>JSP OLSHOP DEPOK</td>
                        <td>Pengeluaran beli Barang ke supplier</td>
                        <td>Rp.10000</td>
                        <td>Pembelanjaan Supplier tgl 9 maret 2024</td>
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
                        <th>Rp.100000</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
export default Tablelist