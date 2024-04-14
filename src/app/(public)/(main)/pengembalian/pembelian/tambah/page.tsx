import { Metadata } from "next"
import dynamic from "next/dynamic"
import { getProduct, getSavingAccount, getSupplier } from "./action"

const BackButton = dynamic(() => import('@/app/components/backButton'))
const Form = dynamic(() => import("@/app/components/pengembalian/pembelian/tambah/form"))

export const metadata: Metadata = {
    title: "Tambah Pengembalian Pembelian"
}

export interface Supplier{
    id: string;
    name: string;
}

export interface Product{
    id: string;
    name: string;
    price: number;
}

export interface SavingAccount{
    id: string;
    name: string;
}

const page = async () => {
    const supplier = await getSupplier()
    const product = await getProduct()
    const savingAccount = await getSavingAccount()

    return (
        <main className="bg-white p-14">
            <BackButton />

            <div className="mt-5">
                <h1 className="text-gray-900 font-semibold text-xl">Tambah Pengembalian Pembelian</h1>
                <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                <Form 
                    product={product}
                    supplier={supplier}
                    savingAccount={savingAccount} />
            </div>
        </main>
    )
}

export default page