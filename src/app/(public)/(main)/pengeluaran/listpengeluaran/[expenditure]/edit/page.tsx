import { Metadata } from "next"
import dynamic from "next/dynamic"
import { getData, getExpenditureCategory, getSavingAccounts } from "./action"
import { redirect } from "next/navigation"

const BackButton = dynamic(() => import('@/app/components/backButton'))
const Form = dynamic(() => import("@/app/components/pengeluaran/listpengeluaran/[expenditure]/edit/form"))

export const metadata: Metadata = {
    title: "Edit pengeluaran"
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

export interface Expenditure{
    id: string;
    notes: string | null;
    idSavingAccount: string | null;
    idExpenditureCategory: string | null;
    total: number;
}

interface Params{
    expenditure: string
}

const TambahPembelian = async ({ params }: { params: Params }) => {
    const expenditureCategory: Array<ExpenditureCategory> = await getExpenditureCategory()
    const savingAccounts: Array<SavingAccounts> = await getSavingAccounts()
    const data: Expenditure | null = await getData(params.expenditure)


    if(data){
        return (
            <main className="bg-white p-14 max-md:p-5">
                <BackButton />
    
                <div className="mt-5">
                    <h1 className="text-gray-900 font-semibold text-xl">Edit Pengeluaran</h1>
                    <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                    <Form
                        expenditureCategory={expenditureCategory}
                        savingAccounts={savingAccounts}
                        data={data} />
                </div>
            </main>
        )
    }else{
        return redirect("/pengeluaran/listpengeluaran")
    }
}
export default TambahPembelian