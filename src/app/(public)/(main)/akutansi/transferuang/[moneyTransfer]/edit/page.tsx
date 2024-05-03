import dynamic from "next/dynamic"
import { getMoneyTransfer, getSavingAccounts } from "./action"
import { Metadata } from "next";
import { redirect } from "next/navigation";

const Form = dynamic(() => import("@/app/components/akutansi/transfer/[moneyTransfer]/edit/form"))
const BackButton = dynamic(() => import('@/app/components/backButton'))

export interface SavingAccount {
    id: string;
    name: string;
}

export const metadata: Metadata = {
    title: 'Edit transfer uang'
}

export interface Params {
    moneyTransfer: string
}

export interface MoneyTransfer{
    id: string;
    fromSavingAccount: string | null;
    toSavingAccount: string | null;
    total: number;
}

const page = async ({ params }: { params: Params }) => {
    const moneyTransfer = await getMoneyTransfer(params.moneyTransfer)
    const savingAccounts: Array<SavingAccount> = await getSavingAccounts()

    if (moneyTransfer) {
        return (
            <main className="bg-white p-14 max-md:p-5">
                <BackButton />

                <div className="mt-5">
                    <h1 className="text-gray-900 font-semibold text-xl">Edit Transfer Uang</h1>
                    <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                    <Form
                        savingAccount={savingAccounts}
                        moneyTransfer={moneyTransfer} />
                </div>
            </main>
        )
    }else{
        return redirect("/akutansi/transferuang")
    }
}
export default page