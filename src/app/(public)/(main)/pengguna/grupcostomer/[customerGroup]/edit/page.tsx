import { Metadata } from "next"
import dynamic from "next/dynamic"
import { getCustomerGroupData, getCustomerGroupName } from "./action"
import { redirect } from "next/navigation"

const Form = dynamic(() => import("@/app/components/pengguna/grupcostomer/[customerGroup]/edit/form"))
const BackButton = dynamic(() => import('@/app/components/backButton'))

interface Params {
    customerGroup: string
}

export interface CustomerGroup {
    id: string,
    name: string
}

export const generateMetadata = async ({ params }: { params: Params }): Promise<Metadata> => {
    const customerGroupName = await getCustomerGroupName(params.customerGroup)

    return {
        title: `Edit grub kustomer ${customerGroupName?.name}`
    }
}
const Grupcostomer = async ({ params }: { params: Params }) => {
    const customerGroupData: CustomerGroup | null = await getCustomerGroupData(params.customerGroup)

    if (customerGroupData) {
        return (
            <>
                <main className="bg-white p-14">
                    <BackButton />

                    <div className="mt-5">
                        <h1 className="text-gray-900 font-semibold text-xl">Tambah Grup Costomer</h1>
                        <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                        <Form data={customerGroupData} />
                    </div>
                </main>
            </>
        )
    }else{
        return redirect("/pengguna/grupcostomer")
    }
}
export default Grupcostomer