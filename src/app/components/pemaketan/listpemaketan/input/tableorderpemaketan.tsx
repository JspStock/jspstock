const TableTambahpembelian = () => {
    return (
        <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900">
            <h1 className="py-2 text-gray-900">Order Table</h1>

            <table className="table">
                {/* head */}
                <thead className=" text-gray-900">
                    <tr>
                        <th>Nama Produk</th>
                        <th>Kode</th>
                        <th>Quantity</th>
                        <th>Harga</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    <tr>
                        <td>
                            Baju bobo
                        </td>
                        <td>
                            BB12
                        </td>
                        <td>
                        <td>
                            <input type="text" placeholder="Input Quantity" className="input font-normal input-bordered w-full max-w-lg" />
                        </td>
                        </td>
                        <td>Rp.12000</td>
                        <td>Rp.24000</td>
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
                        <th></th>
                        <th>Rp.24000</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
export default TableTambahpembelian