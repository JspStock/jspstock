import { Metadata } from "next"
import dynamic from "next/dynamic"
import { getExpenditureCategory, getSavingAccounts } from "./action"

const BackButton = dynamic(() => import('@/app/components/backButton'))
const Form = dynamic(() => import("@/app/components/pengeluaran/listpengeluaran/tambah/form"))

export const metadata: Metadata = {
    title: "Tambah pengeluaran"
}

export interface ExpenditureCategory {
    id: string;
    name: string;
    createdAt: Date;
}

export interface SavingAccounts {
    id: string;
    name: string;
    startingBalance: number;
    createdAt: Date;
}

const TambahPembelian = async () => {
    const expenditureCategory: Array<ExpenditureCategory> = await getExpenditureCategory()
    const savingAccounts: Array<SavingAccounts> = await getSavingAccounts()

    return (
        <main className="bg-white p-14">
            <BackButton />

            <div className="mt-5">
                <h1 className="text-gray-900 font-semibold text-xl">Tambah Pengeluaran</h1>
                <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                <Form
                    expenditureCategory={expenditureCategory}
                    savingAccounts={savingAccounts} />
            </div>
        </main>
    )
}
export default TambahPembelian