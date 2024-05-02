import { Metadata } from "next"
import dynamic from "next/dynamic"
import { getCustomerUser, getPackaging, getSales } from "./action"
import { redirect } from "next/navigation"

const Form = dynamic(() => import("@/app/components/pemaketan/[packaging]/edit/form"))
const BackButton = dynamic(() => import('@/app/components/backButton'))

export const metadata: Metadata = {
    title: 'Tambah pemaketan'
}


export interface Sales{
    id: string;
}

export interface Params{
    packaging: string
}

export interface Packaging{
    idCustomerUser: string | null;
    address: string;
    notes: string | null;
    id: string;
    idSales: string | null;
}

const page = async ({ params }: { params: Params }) => {
    const customerUser = await getCustomerUser()
    const sales = await getSales()
    const packaging = await getPackaging(params.packaging)

    if(packaging){
        return (
            <main className="bg-white p-14">
                <BackButton />
                <div className="mt-5">
                    <h1 className="text-gray-900 font-semibold text-xl">Edit Pemaketan</h1>
                    <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                    <Form
                        customerUser={customerUser}
                        sales={sales}
                        packaging={packaging} />
                </div>
            </main>
        )
    }else{
        return redirect("/pemaketan/listpemaketan")
    }
}
export default page