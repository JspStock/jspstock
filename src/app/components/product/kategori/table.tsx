const TableKategori = () => {
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
                        <th>Foto</th>
                        <th>Kategori</th>
                        <th>Parent Kategori</th>
                        <th>Jumlah Produk</th>
                        <th>Quantity Stok</th>
                        <th>Nilai Pasti(Harga/Biaya)</th>
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
                            <div className="avatar">
                                <div className="w-20 rounded">
                                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Avatar Tailwind CSS Component" />
                                </div>
                            </div>
                        </td>
                        <td>
                            Baju
                        </td>
                        <td>N/A</td>
                        <td>9</td>
                        <td>11</td>
                        <td>Rp.10000/Rp.15000</td>
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
            </table>
        </div>
    )
}
export default TableKategori