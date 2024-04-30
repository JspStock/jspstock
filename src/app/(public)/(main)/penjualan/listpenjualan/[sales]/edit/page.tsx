import { Metadata } from "next"
import dynamic from "next/dynamic"
import { getProduct, getCustomerUser, getSavingAccounts, getCustomerGroup, getData } from "./action"
import { redirect } from "next/navigation"

const BackButton = dynamic(() => import('@/app/components/backButton'))
const Form = dynamic(() => import("@/app/components/penjualan/listpenjualan/[sales]/edit/form"))

export const metadata: Metadata = {
    title: 'Edit penjualan'
}

export interface Customer {
    id: string;
    name: string;
}

export interface SavingAccounts{
    id: string;
    name: string;
}

interface Params{
    sales: string
}

const TambahPembelian = async ({ params }: { params: Params }) => {
    const [productData, supplierData, savingAccounts, customerGroup, data] = await Promise.all([
        getProduct(),
        getCustomerUser(),
        getSavingAccounts(),
        getCustomerGroup(),
        getData(params.sales)
    ])

    if(data){
        return (
            <main className="bg-white p-14">
                <BackButton />
    
                <div className="mt-5">
                    <h1 className="text-gray-900 font-semibold text-xl">Edit Penjualan</h1>
                    <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                    <Form
                        product={productData}
                        customer={supplierData}
                        savingAccounts={savingAccounts}
                        customerGroup={customerGroup}
                        data={data} />
                </div>
            </main>
        )
    }else{
        return redirect("/penjualan/listpenjualan")
    }
}
export default TambahPembelian