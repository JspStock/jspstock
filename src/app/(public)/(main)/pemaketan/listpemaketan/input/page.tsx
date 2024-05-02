import { Metadata } from "next"
import dynamic from "next/dynamic"
import { getCustomerUser, getSales } from "./action"

const Form = dynamic(() => import("@/app/components/pemaketan/listpemaketan/input/form"))
const BackButton = dynamic(() => import('@/app/components/backButton'))

export const metadata: Metadata = {
    title: 'Tambah pemaketan'
}

export interface CustomerUser{
    id: string;
    idStore: string;
    idCustomerGroup: string | null;
    name: string;
    address: string | null;
    createdAt: Date;
}

export interface Sales{
    id: string;
}

const page = async () => {
    const customerUser = await getCustomerUser()
    const sales = await getSales()

    return (
        <main className="bg-white p-14">
            <BackButton />
            <div className="mt-5">
                <h1 className="text-gray-900 font-semibold text-xl">Tambah Pemaketan</h1>
                <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                <Form
                    customerUser={customerUser}
                    sales={sales} />
            </div>
        </main>
    )
}
export default page