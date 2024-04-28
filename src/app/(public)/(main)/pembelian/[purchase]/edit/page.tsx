import { Metadata } from "next"
import dynamic from "next/dynamic"
import { getPurchaseData, getSavingAccounts, getSupplierData } from "./action"
import { redirect } from "next/navigation"

const Form = dynamic(() => import("@/app/components/pembelian/[purchase]/edit/form"))
const BackButton = dynamic(() => import('@/app/components/backButton'))

export const metadata: Metadata = {
    title: 'Edit pembelian'
}

export interface Supplier{
    id: string;
    name: string;
}

export interface SavingAccounts{
    id: string;
    name: string;
}

interface Params{
    purchase: string
}

const TambahPembelian = async ({ params }: { params: Params }) => {
    const [supplierData, savingAccounts, purchaseData] = await Promise.all([
        getSupplierData(), 
        getSavingAccounts(),
        getPurchaseData(params.purchase)
    ])

    if(purchaseData){
        return (
            <main className="bg-white p-14">
                <BackButton />
    
                <div className="mt-5">
                    <h1 className="text-gray-900 font-semibold text-xl">Edit Pembelian</h1>
                    <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                    <Form 
                        supplier={supplierData}
                        savingAccounts={savingAccounts}
                        purchaseData={purchaseData} />
                </div>
            </main>
        )
    }else{
        return redirect("/pembelian/listpembelian")
    }
}
export default TambahPembelian