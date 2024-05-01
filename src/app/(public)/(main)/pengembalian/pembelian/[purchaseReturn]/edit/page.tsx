import { Metadata } from "next"
import dynamic from "next/dynamic"
import { getPurchase, getPurchaseReturn, getSavingAccount } from "./action"
import { redirect } from "next/navigation"

const BackButton = dynamic(() => import('@/app/components/backButton'))
const Form = dynamic(() => import("@/app/components/pengembalian/pembelian/[purchaseReturn]/edit/form"))

export const metadata: Metadata = {
    title: "Edit Pengembalian Pembelian"
}

export interface SavingAccount {
    id: string;
    name: string;
}

interface Params{
    purchaseReturn: string
}

const page = async ({ params }: { params: Params }) => {
    const [savingAccount, purchase, purchaseReturn] = await Promise.all([
        getSavingAccount(),
        getPurchase(),
        getPurchaseReturn(params.purchaseReturn)
    ])

    if(purchaseReturn){
        return (
            <main className="bg-white p-14">
                <BackButton />
    
                <div className="mt-5">
                    <h1 className="text-gray-900 font-semibold text-xl">Edit Pengembalian Pembelian</h1>
                    <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                    <Form
                        purchase={purchase}
                        savingAccount={savingAccount}
                        purchaseReturn={purchaseReturn} />
                </div>
            </main>
        )
    }else{
        return redirect("/pengembalian/pembelian")
    }
}

export default page