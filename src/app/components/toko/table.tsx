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
                        <th>Toko</th>
                        <th>No WhatsApp</th>
                        <th>Email</th>
                        <th>Alamat</th>
                        <th>Jumlah Produk</th>
                        <th>Quantity Stok</th>
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
                            JSP OLSHOP DEPOK
                        </td>
                        <td>
                            085762537362
                        </td>
                        <td>Julian@email.com</td>
                        <td>Jalan. Buah Batu NO 08 RT 09 RW 08 Jakarta Selatan</td>
                        <td>1212</td>
                        <td>3421</td>
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
export default Tablelist