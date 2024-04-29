import { Metadata } from "next"
import dynamic from "next/dynamic"
import { getData, getNameData } from "./action"
import { redirect } from "next/navigation"

const BackButton = dynamic(() => import('@/app/components/backButton'))
const Form = dynamic(() => import("@/app/components/akutansi/listrekening/[account]/edit/form"))

export interface Params {
    account: string
}

export interface SavingAccount{
    id: string;
    name: string;
    startingBalance: number;
    notes: string | null;
}

export const generateMetadata = async ({ params }: { params: Params }): Promise<Metadata> => {
    const name = await getNameData(params.account)
    return {
        title: `Edit rekening ${name?.name}`
    }
}

const Tambahlistrek = async ({ params }: { params: Params }) => {
    const data = await getData(params.account)

    if (data) {
        return (
            <main className="bg-white p-14">
                <BackButton />

                <div className="mt-5">
                    <h1 className="text-gray-900 font-semibold text-xl">Edit Rekening</h1>
                    <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                    <Form data={data} />
                </div>
            </main>
        )
    }else{
        redirect("/akutansi/listrekening")
    }
}

export default Tambahlistrek