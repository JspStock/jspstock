import { Metadata } from "next"
import dynamic from "next/dynamic"
import { getCustomerData, getCustomerGroup, getCustomerName } from "./action"
import { redirect } from "next/navigation"

const BackButton = dynamic(() => import('@/app/components/backButton'))
const Form = dynamic(() => import("@/app/components/pengguna/costomer/[customer]/edit/form"))

interface Params{
    customer: string
}

export const generateMetadata = async ({ params }: { params: Params }): Promise<Metadata> => {
    const customerName = await getCustomerName(params.customer)
    return {
        title: `Edit kustomer ${customerName?.name}`
    }
}

export interface CustomerGroup{
    id: string;
    name: string;
}

export interface Customer{
    name: string;
    noWa: string;
    address: string | null;
    id: string;
    idCustomerGroup: string | null;
}
const TambahCostomer = async ({ params }: { params: Params }) => {
    const customerData: Customer | null = await getCustomerData(params.customer)
    const customerGroup: Array<CustomerGroup> = await getCustomerGroup()

    if(customerData){
        return (
            <main className="bg-white p-14">
                <BackButton />
    
                <div className="mt-5">
                    <h1 className="text-gray-900 font-semibold text-xl">Edit Kustomer</h1>
                    <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                    <Form 
                        customerGroup={customerGroup}
                        customerData={customerData} />
                </div>
            </main>
        )
    }else{
        return redirect("/pengguna/costomer")
    }
}
export default TambahCostomer