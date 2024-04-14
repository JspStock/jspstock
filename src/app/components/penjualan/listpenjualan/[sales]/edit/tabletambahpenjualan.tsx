"use client"

import { Product } from "@/app/(public)/(main)/penjualan/listpenjualan/[sales]/edit/page"
import { currencyFormat } from "@/utils/utils"
import { Order } from "./form"

const TableTambahpembelian = ({ order, product, onDeleteItem, onChangeQtyItem }: {
    order: Array<Order>,
    product: Array<Product>,
    onDeleteItem: (index: number) => void,
    onChangeQtyItem: (index: number, qty: string) => void
}) => {
    return (
        <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900">
            <h1 className="py-2 text-gray-900">Order Table</h1>

            <table className="table">
                <thead className=" text-gray-900">
                    <tr>
                        <th>Nama</th>
                        <th>Kode</th>
                        <th>Quantity</th>
                        <th>Sub Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        order.map((e, index) => <tr key={index}>
                            <td>{e.name}</td>
                            <td>{e.id.split("_")[1]}</td>
                            <td><input type="number" className="input input-bordered" value={e.qty} onChange={e => onChangeQtyItem(index, e.target.value)} /></td>
                            <td>{currencyFormat((product.find(val => val.id == e.id)?.price ?? 0) * parseInt(e.qty))}</td>
                            <td> <button className="btn text-red-400 btn-ghost" onClick={() => onDeleteItem(index)}>Hapus</button></td>
                        </tr>)
                    }

                </tbody>
                <tfoot>
                    <tr>
                        <th>Total</th>
                        <th></th>
                        <th>{order.length}</th>
                        <th>{currencyFormat(
                            order.length > 0 ? order.map(e => parseInt(e.qty) * (product.find(val => val.id == e.id)?.price ?? 0)).reduce((val, prev) => val + prev) : 0
                        )}</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
export default TableTambahpembelian