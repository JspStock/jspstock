import { Metadata } from "next"
import dynamic from "next/dynamic"
import { getCustomerUser, getData, getProduct, getSavingAccount } from "./actions"
import { redirect } from "next/navigation"

const BackButton = dynamic(() => import('@/app/components/backButton'))
const Form = dynamic(() => import("@/app/components/pengembalian/penjualan/[saleReturn]/edit/form"))

export const metadata: Metadata = {
    title: "Edit Pengembalian penjualan"
}

export interface CustomerUser {
    id: string;
    name: string;
}

export interface Product {
    id: string;
    name: string;
    price: number
}

export interface SavingAccounts {
    id: string;
    name: string;
}

export interface SaleReturn{
    id: string;
    saleReturnOrders: {
        idProduct: string | null;
        qty: number;
    }[];
    notes: string | null;
    idCustomerUser: string | null;
    idSavingAccount: string | null;
}

export interface Params {
    saleReturn: string
}

const page = async ({ params }: { params: Params }) => {
    const customerUser: Array<CustomerUser> = await getCustomerUser()
    const product: Array<Product> = await getProduct()
    const savingAccount: Array<SavingAccounts> = await getSavingAccount()
    const data: SaleReturn | null = await getData(params.saleReturn)

    if (data) {
        return (
            <main className="bg-white p-14">
                <BackButton />

                <div className="mt-5">
                    <h1 className="text-gray-900 font-semibold text-xl">Edit Pengembalian Penjualan</h1>
                    <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                    <Form
                        customerUser={customerUser}
                        product={product}
                        savingAccounts={savingAccount}
                        saleReturn={data} />
                </div>
            </main>
        )
    }else{
        return redirect("/pengembalian/penjualan")
    }
}
export default page