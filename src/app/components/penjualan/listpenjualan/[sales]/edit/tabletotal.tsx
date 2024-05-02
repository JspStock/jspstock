import { Order } from "./form"
import { currencyFormat } from "@/utils/utils"
import { GetProductPayload } from "@/app/(public)/(main)/penjualan/listpenjualan/[sales]/edit/action"
const TableTotal = ({ order, product, shippingCost, discount }: {
    order: Array<Order>,
    product: Array<GetProductPayload>,
    shippingCost: number,
    discount: number
}) => {
    const subTotal = order.length > 0 ? order.map(e => parseInt(e.qty) * (product.find(val => val.id == e.id)?.price ?? 0)).reduce((val, prev) => val + prev) : 0

    return(
        <div className="lg:flex text-gray-900 w-full mt-10 justify-center items-center lg:gap-10 grid max-lg:space-y-5">
            <div className="flex space-x-2">
                <h1>Items : </h1>
                <h1 className="font-bold">{ order.length }</h1>
            </div>
            <div className="flex space-x-2">
                <h1>Sub Total : </h1>
                <h1 className="font-bold">{ currencyFormat(subTotal) }</h1>
            </div>
            <div className="flex space-x-2">
                <h1>Diskon : </h1>
                <h1 className="font-bold">{ currencyFormat(discount) }</h1>
            </div>
            <div className="flex space-x-2">
                <h1>Biaya Pengiriman : </h1>
                <h1 className="font-bold">{ currencyFormat(shippingCost) }</h1>
            </div>
            <div className="flex space-x-2">
                <h1>Total : </h1>
                <h1 className="font-bold">{ currencyFormat((subTotal - shippingCost) - discount) }</h1>
            </div>
        </div>
    )
}
export default TableTotal