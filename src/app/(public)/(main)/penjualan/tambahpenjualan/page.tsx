import { Metadata } from "next"
import dynamic from "next/dynamic"
import { getProduct, getCustomerUser, getSavingAccounts } from "./action"

const BackButton = dynamic(() => import('@/app/components/backButton'))
const Form = dynamic(() => import("@/app/components/penjualan/tambahpenjualan/form"))

export const metadata: Metadata = {
    title: 'Tambah penjualan'
}

export interface Customer {
    id: string;
    name: string;
}

export interface SavingAccounts{
    id: string;
    name: string;
}

const TambahPembelian = async () => {
    const productData = await getProduct()
    const supplierData = await getCustomerUser()
    const savingAccounts = await getSavingAccounts()

    return (
        <main className="bg-white p-14">
            <BackButton />

            <div className="mt-5">
                <h1 className="text-gray-900 font-semibold text-xl">Tambah Penjualan</h1>
                <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                <Form
                    product={productData}
                    customer={supplierData}
                    savingAccounts={savingAccounts} />
            </div>
        </main>
    )
}
export default TambahPembelian