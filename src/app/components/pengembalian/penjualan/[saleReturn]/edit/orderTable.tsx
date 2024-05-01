"use client"

import { currencyFormat } from "@/utils/utils"
import { Order } from "./form"

const OrderTable = ({ order, onDeleteItem, onChangeQtyItem }: {
    order: Array<Order>,
    onDeleteItem: (index: number) => void,
    onChangeQtyItem: (index: number, qty: number) => void
}) => {
    return <table className="table w-full">
        <thead>
            <tr>
                <th>Nama</th>
                <th>Kode</th>
                <th>Kuantitas</th>
                <th>Harga satuan bersih</th>
                <th>Subtotal</th>
                <th></th>
            </tr>
        </thead>

        <tbody>
            {
                order.map((e, index) => <tr key={index}>
                    <td>{ e.name }</td>
                    <td>{ e.id.split("_")[1] }</td>
                    <td><input type="number" className="input input-bordered" value={e.qty} onChange={e => onChangeQtyItem(index, parseInt(e.target.value))} /></td>
                    <td>{ currencyFormat(e.price) }</td>
                    <td>{ currencyFormat(e.qty * e.price) }</td>
                    <td><button type="button" className="btn btn-ghost text-error" onClick={() => onDeleteItem(index)}>Hapus</button></td>
                </tr>)
            }
        </tbody>
    </table>
}

export default OrderTable