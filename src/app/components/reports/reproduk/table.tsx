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
                        <th>Nama Produk</th>
                        <th>Jumlah yang dibeli</th>
                        <th>Dibeli Qty</th>
                        <th>Jumlah yang Penjualan</th>
                        <th>Terjual Qty</th>
                        <th>Laba/Profit</th>
                        <th>Persediaan</th>
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
                            Tunak 918
                        </td>
                        <td>
                            12111
                        </td>
                        <td>8</td>
                        <td>
                            12111
                        </td>
                        <td>
                            10
                        </td>
                        <td>Rp. 5781722</td>
                        <td>5</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Total</th>
                        <th>12111</th>
                        <th>8</th>
                        <th>12111</th>
                        <th>10</th>
                        <th>Rp. 5781722</th>
                        <th>5</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
export default Tablelist