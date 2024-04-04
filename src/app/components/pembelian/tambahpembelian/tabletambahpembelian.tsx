"use client"

import { Product } from "@/app/(public)/(main)/pembelian/tambahpembelian/page"
import { currencyFormat } from "@/utils/utils"

export interface Order extends Product{
    selectQty: number,
    subTotal: number,
}

const TableTambahpembelian = ({ data, changeQty, onDelete }: {
    data: Array<Order>,
    changeQty: (id: number, qty: string) => void,
    onDelete: (index: number) => void
}) => {
    return (
        <div className="overflow-x-auto bg-white p-10 text-gray-900">
            <h1 className="py-2 text-gray-900">Order Table</h1>

            <table className="table">
                <thead className=" text-gray-900">
                    <tr>
                        <th>Nama</th>
                        <th>Kode</th>
                        <th>Quantity</th>
                        <th>Satuan</th>
                        <th>Sub Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((e, index) => <tr key={index}>
                        <td>{ e.name }</td>
                        <td>{ e.id.split("_")[1] }</td>
                        <td>
                            <select className="select select-bordered" onChange={val => changeQty(index, val.target.value)}>
                                { Array.from({ length: e.qty }).map((_, index) => <option value={index + 1} selected={(index + 1) == e.selectQty} key={index}>{index + 1} Pcs</option>) }
                            </select>
                        </td>
                        <td>{ currencyFormat(e.price) }</td>
                        <td>{ currencyFormat(e.subTotal) }</td>
                        <td><button className="btn btn-ghost text-red-400" onClick={() => onDelete(index)}>Hapus</button></td>
                    </tr>)}

                </tbody>
                <tfoot>
                    <tr>
                        <th>Total</th>
                        <th></th>
                        <th>{ data.length > 0 ? data.map(e => e.selectQty).reduce((e, prev) => e + prev) : 0 }</th>
                        <th></th>
                        <th>{ currencyFormat(data.length > 0 ? (data.map(e => e.subTotal).reduce((e, prev) => e + prev)) : 0) }</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
export default TableTambahpembelian