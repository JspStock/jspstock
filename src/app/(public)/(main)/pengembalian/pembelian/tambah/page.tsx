import { Metadata } from "next"
import dynamic from "next/dynamic"
import { getPurchase, getSavingAccount } from "./action"

const BackButton = dynamic(() => import('@/app/components/backButton'))
const Form = dynamic(() => import("@/app/components/pengembalian/pembelian/tambah/form"))

export const metadata: Metadata = {
    title: "Tambah Pengembalian Pembelian"
}

export interface SavingAccount {
    id: string;
    name: string;
}

const page = async () => {
    const [savingAccount, purchase] = await Promise.all([
        getSavingAccount(),
        getPurchase()
    ])

    return (
        <main className="bg-white p-14 max-md:p-5">
            <BackButton />

            <div className="mt-5">
                <h1 className="text-gray-900 font-semibold text-xl">Tambah Pengembalian Pembelian</h1>
                <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                <Form
                    purchase={purchase}
                    savingAccount={savingAccount} />
            </div>
        </main>
    )
}

export default page