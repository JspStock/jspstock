import { Metadata } from "next"
import dynamic from "next/dynamic"
import { getProductData, getPurchaseData, getSupplierData } from "./action"
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
    qty: number;
    price: number;
}

export interface Supplier{
    id: string;
    name: string;
}

export interface PurchaseData{
    id: string;
    purchaseOrder: {
        product: {
            id: string;
            name: string;
            price: number;
            qty: number;
        } | null;
        id: string;
        qty: number;
        idProduct: string | null;
    }[];
    supplier: {
        id: string;
        name: string;
    } | null;
    documentPath: string | null;
    discount: number;
    shippingCost: number;
    notes: string | null;
    purchaseStatus: $Enums.PurchaseStatus;
}

const TambahPembelian = async ({ params }: { params: Params }) => {
    const productData: Array<Product> = await getProductData()
    const supplierData: Array<Supplier> = await getSupplierData()
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
                        data={purchaseData} />
                </div>
            </main>
        )
    }else{
        return redirect("/pembelian/listpembelian")
    }
}
export default TambahPembelian