import dynamic from "next/dynamic"
import { getSavingAccounts } from "./action"
import { Metadata } from "next";

const Form = dynamic(() => import("@/app/components/akutansi/transfer/tambah/form"))
const BackButton = dynamic(() => import('@/app/components/backButton'))

export interface SavingAccount{
    id: string;
    name: string;
}

export const metadata: Metadata = {
    title: 'Tambah transfer uang'
}

const page = async () => {
    const savingAccounts: Array<SavingAccount> = await getSavingAccounts()

    return (
        <main className="bg-white p-14 max-md:p-5">
            <BackButton />

            <div className="mt-5">
                <h1 className="text-gray-900 font-semibold text-xl">Tambah Transfer Uang</h1>
                <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                <Form
                    savingAccount={savingAccounts} />
            </div>
        </main>
    )
}
export default page