const TableTambahpembelian = () => {
    return (
        <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900">
            <h1 className="py-2 text-gray-900">Order Table</h1>

            <table className="table">
                {/* head */}
                <thead className=" text-gray-900">
                    <tr>
                        <th>Nama</th>
                        <th>Kode</th>
                        <th>Quantity</th>
                        <th>Sub Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            Baju bobo
                        </td>
                        <td>
                            BB12
                        </td>
                        <td>
                        <td>
                            <select className="select select-bordered">
                                <option value="1">1 Pcs</option>
                            </select>
                        </td>
                        </td>
                        <td>Rp.12000</td>
                        <td>
                            <button className="btn bg-red-400 text-white">Hapus</button>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th>Total</th>
                        <th></th>
                        <th>2</th>
                        <th>Rp.12000</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
export default TableTambahpembelian