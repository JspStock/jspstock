import { Metadata } from "next";
import { getSupplierData, getSupplierName } from "./action";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

interface Params{
    supplier: string
}

export interface Supplier{
    name: string;
    email: string;
    noWa: string;
    city: string;
    zipCode: string;
    region: string;
    address: string | null;
}

export const generateMetadata = async ({ params }: { params: Params }): Promise<Metadata> => {
    const supplierName = await getSupplierName(params.supplier)

    return {
        title: `Edit supplier ${supplierName?.name}`
    }
}

const BackButton = dynamic(() => import('@/app/components/backButton'))
const Form = dynamic(() => import("@/app/components/pengguna/supplier/[supplier]/edit/form"))

const page = async ({ params }: { params: Params }) => {
    const supplierData = await getSupplierData(params.supplier)
    if(supplierData){
        return (
            <main className="bg-white p-14 max-md:p-5">
                <BackButton />
    
                <div className="mt-5">
                    <h1 className="text-gray-900 font-semibold text-xl">Edit Supplier</h1>
                    <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                    <Form data={supplierData} id={params.supplier} />
                </div>
            </main>
        )
    }else{
        return redirect("/pengguna/supplier")
    }

}

export default page