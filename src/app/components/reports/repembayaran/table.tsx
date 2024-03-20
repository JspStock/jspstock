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
                        <th>Referensi Pembayaran</th>
                        <th>Referensi Penjualan</th>
                        <th>Pembayaran Melalui</th>
                        <th>Jumlah</th>
                        <th>Dibuat oleh</th>
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
                            19-02-2024
                        </td>
                        <td>
                            spr-187281766
                        </td>
                        <td>
                            pors-081788612
                        </td>
                        <td>
                            Cash
                        </td>
                        <td>
                            1121
                        </td>
                        <td>Admin Syakira</td>
\                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Total</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>1121</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
export default Tablelist