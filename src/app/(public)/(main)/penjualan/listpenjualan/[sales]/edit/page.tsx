import { Metadata } from "next"
import dynamic from "next/dynamic"
import { getProduct, getCustomerUser, getData, getSavingAccounts } from "./action"
import { $Enums } from "@prisma/client"
import { redirect } from "next/navigation"

const BackButton = dynamic(() => import('@/app/components/backButton'))
const Form = dynamic(() => import("@/app/components/penjualan/listpenjualan/[sales]/edit/form"))

export const metadata: Metadata = {
    title: 'Edit penjualan'
}

export interface Product{
    id: string;
    saleOrder: {
        qty: number;
    }[];
    name: string;
    price: number;
    purchaseOrder: {
        qty: number;
    }[];
}

export interface Customer {
    id: string;
    name: string;
}

export interface Params {
    sales: string
}

export interface Sales {
    id: string;
    idCustomerUser: string | null;
    documentPath: string | null;
    saleStatus: $Enums.SaleStatus;
    purchaseStatus: $Enums.SalePurchaseStatus;
    discount: number;
    shippingCost: number;
    saleNotes: string | null;
    staffNotes: string | null;
    idSavingAccount: string | null;
    saleOrder: {
        id: string,
        qty: number,
        product: {
            id: string,
            name: string
        }
    }[]
}

export interface SavingAccounts{
    id: string;
    name: string;
}

const page = async ({ params }: { params: Params }) => {
    const data: Sales | null = await getData(params.sales)
    const productData: Array<Product> = await getProduct()
    const supplierData: Array<Customer> = await getCustomerUser()
    const savingAccounts: Array<SavingAccounts> = await getSavingAccounts()

    if (data) {
        return (
            <main className="bg-white p-14">
                <BackButton />

                <div className="mt-5">
                    <h1 className="text-gray-900 font-semibold text-xl">Edit Penjualan</h1>
                    <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                    <Form
                        product={productData}
                        customer={supplierData}
                        sales={data}
                        savingAccounts={savingAccounts} />
                </div>
            </main>
        )
    }else{
        return redirect("/penjualan/listpenjualan")
    }
}
export default page