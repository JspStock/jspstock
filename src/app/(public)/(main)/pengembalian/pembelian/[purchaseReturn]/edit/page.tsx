import { Metadata } from "next"
import dynamic from "next/dynamic"
import { getProduct, getPurchaseReturn, getSavingAccount, getSupplier } from "./action"
import { redirect } from "next/navigation"

const BackButton = dynamic(() => import('@/app/components/backButton'))
const Form = dynamic(() => import("@/app/components/pengembalian/pembelian/[purchaseReturn]/edit/form"))

export const metadata: Metadata = {
    title: "Edit Pengembalian Pembelian"
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

export interface Params{
    purchaseReturn: string
}

export interface PurchaseReturn{
    id: string;
    idSavingAccount: string | null;
    idSupplier: string | null;
    notes: string | null;
    purchaseReturnOrders: {
        qty: number;
        product: {
            id: string;
            name: string;
            price: number;
        } | null;
    }[];
}

const page = async ({ params }: { params: Params }) => {
    const supplier = await getSupplier()
    const product = await getProduct()
    const savingAccount = await getSavingAccount()
    const purchaseReturn = await getPurchaseReturn(params.purchaseReturn)

    if(purchaseReturn){
        return (
            <main className="bg-white p-14">
                <BackButton />
        
                <div className="mt-5">
                    <h1 className="text-gray-900 font-semibold text-xl">Edit Pengembalian Pembelian</h1>
                    <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                    <Form 
                        product={product}
                        supplier={supplier}
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