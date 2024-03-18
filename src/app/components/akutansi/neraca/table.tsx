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
                        <th>Nama</th>
                        <th>Nomor Rekening</th>
                        <th>Kredit</th>
                        <th>Debit</th>
                        <th>Saldo</th>
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
                            Aldi
                        </td>
                        <td>
                            182827263
                        </td>
                        <td>Rp.3120000</td>
                        <td>Rp.-34000</td>
                        <td>Rp.298000</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Total</th>
                        <th></th>
                        <td>Rp.3120000</td>
                        <td>Rp.-34000</td>
                        <td>Rp.298000</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
export default Tablelist