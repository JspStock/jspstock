import { Metadata } from "next"
import dynamic from "next/dynamic"
import { getCustomerUser, getProduct, getSavingAccount } from "./actions"

const BackButton = dynamic(() => import('@/app/components/backButton'))
const Form = dynamic(() => import("@/app/components/pengembalian/penjualan/tambah/form"))

export const metadata: Metadata = {
    title: "Pengembalian penjualan"
}

export interface CustomerUser{
    id: string;
    name: string;
}

export interface Product{
    id: string;
    name: string;
    price: number
}

export interface SavingAccounts{
    id: string;
    name: string;
}

const page = async () => {
    const customerUser: Array<CustomerUser> = await getCustomerUser()
    const product: Array<Product> = await getProduct()
    const savingAccount: Array<SavingAccounts> = await getSavingAccount()

    return (
        <main className="bg-white p-14">
            <BackButton />

            <div className="mt-5">
                <h1 className="text-gray-900 font-semibold text-xl">Tambah Pengembalian Penjualan</h1>
                <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                <Form
                    customerUser={customerUser}
                    product={product}
                    savingAccounts={savingAccount} />
            </div>
        </main>
    )
}
export default page