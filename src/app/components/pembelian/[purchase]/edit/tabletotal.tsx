import { currencyFormat } from "@/utils/utils"
import { Form } from "./form"

const TableTotal = ({ form }: {
    form: Form
}) => {
    const discount = isNaN(form.discount) ? 0 : form.discount
    const shippingCost = isNaN(form.shippingCost) ? 0 : form.shippingCost
    const subTotal = form.order.length > 0 ? form.order.map(e => e.subTotal).reduce((val, prev) => val + prev) : 0

    return(
        <div className="lg:flex text-gray-900 w-full justify-center mt-10 items-center lg:gap-10 grid max-lg:space-y-5">
            <div className="flex space-x-2">
                <h1>Items : </h1>
                <h1 className="font-bold">{ form.order.length }</h1>
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
                <h1 className="font-bold">{ currencyFormat( shippingCost + subTotal - discount ) }</h1>
            </div>
        </div>
    )
}
export default TableTotal