import { Metadata } from "next"
import dynamic from "next/dynamic"
import { getCustomerGroup } from "./action"

const BackButton = dynamic(() => import('@/app/components/backButton'))
const Form = dynamic(() => import("@/app/components/pengguna/costomer/tambah/form"))

export const metadata: Metadata = {
    title: 'Tambah kustomer'
}

export interface CustomerGroup{
    id: string;
    name: string;
}

const TambahCostomer = async () => {
    const customerGroup: Array<CustomerGroup> = await getCustomerGroup()

    return (
        <main className="bg-white p-14">
            <BackButton />

            <div className="mt-5">
                <h1 className="text-gray-900 font-semibold text-xl">Tambah Kustomer</h1>
                <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                <Form customerGroup={customerGroup} />
            </div>
        </main>
    )
}
export default TambahCostomer