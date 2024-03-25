import Link from "next/link"

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
                        <th>Supplier</th>
                        <th>Status Pembelian</th>
                        <th>Total</th>
                        <th>Dibayar</th>
                        <th>Status Pembayaran</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                        <td>
                            10-04-2023
                        </td>
                        <td>
                            pr-28134812-827263
                        </td>
                        <td>Julian</td>
                        <td>
                            <div className="bg-green-400 text-center text-xs w-20 p-1 rounded-lg font-semibold text-white">
                                Diterima
                            </div>
                        </td>
                        <td>Rp.10000</td>
                        <td>0.00</td>
                        <td>
                            <div className="bg-red-400 text-center text-xs w-24 p-1 rounded-lg font-semibold text-white">
                                Jatuh Tempo
                            </div>
                        </td>
                        <td>
                            <div className="dropdown dropdown-left">
                                <div tabIndex={0} role="button" className="btn btn-ghost">Lainnya</div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a>Ubah</a></li>
                                    <li><Link href={"listpembelian/2323/pembayaran"}>Pembayaran</Link></li>
                                    <li><a>Hapus</a></li>
                                </ul>
                            </div>
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
                        <th>0.00</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
export default Tablelist