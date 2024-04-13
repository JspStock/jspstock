import { Metadata } from "next"
import dynamic from "next/dynamic"
import { getProductData, getPurchaseData, getSavingAccounts, getSupplierData } from "./action"
import { redirect } from "next/navigation"
import { $Enums } from "@prisma/client"

const Form = dynamic(() => import("@/app/components/pembelian/[purchase]/edit/form"))
const BackButton = dynamic(() => import('@/app/components/backButton'))

export const metadata: Metadata = {
    title: 'Ubah pembelian'
}

export interface Params{
    purchase: string
}

export interface Product{
    id: string;
    name: string;
    price: number;
}

export interface Supplier{
    id: string;
    name: string;
}

export interface PurchaseData{
    supplier: {
        id: string;
        name: string;
    } | null;
    id: string;
    idSavingAccount: string | null;
    purchaseOrder: {
        product: {
            id: string;
            name: string;
            price: number;
        };
        id: string;
        idProduct: string;
        qty: number;
    }[];
    documentPath: string | null;
    discount: number;
    shippingCost: number;
    notes: string | null;
    purchaseStatus: $Enums.PurchaseStatus;
}

export interface SavingAccounts{
    id: string;
    name: string;
}

const TambahPembelian = async ({ params }: { params: Params }) => {
    const productData: Array<Product> = await getProductData()
    const supplierData: Array<Supplier> = await getSupplierData()
    const savingAccounts: Array<SavingAccounts> = await getSavingAccounts()
    const purchaseData: PurchaseData | null = await getPurchaseData(params.purchase)

    if(purchaseData){
        return (
            <main className="bg-white p-14">
                <BackButton />
    
                <div className="mt-5">
                    <h1 className="text-gray-900 font-semibold text-xl">Tambah Pembelian</h1>
                    <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                    <Form 
                        product={productData}
                        supplier={supplierData}
                        data={purchaseData}
                        savingAccounts={savingAccounts} />
                </div>
            </main>
        )
    }else{
        return redirect("/pembelian/listpembelian")
    }
}
export default TambahPembelian