import { Metadata } from "next"
import dynamic from "next/dynamic"
import { getData } from "./action"
import { redirect } from "next/navigation"

const BackButton = dynamic(() => import('@/app/components/backButton'))
const Form = dynamic(() => import("@/app/components/pengeluaran/kategori/[expenditures]/edit/form"))

export interface Params {
    expenditures: string
}

export const generateMetadata = async ({ params }: { params: Params }): Promise<Metadata> => {
    const getName = await getData(params.expenditures)

    return {
        title: `Edit kategori pengeluaran ${getName?.name}`
    }
}

export interface ExpenditureCategory {
    name: string
}

const Tambah = async ({ params }: { params: Params }) => {
    const data = await getData(params.expenditures)

    if (data) {
        return (
            <main className="bg-white p-14">
                <BackButton />

                <div className="mt-5">
                    <h1 className="text-gray-900 font-semibold text-xl">Edit Kategori Penjualan</h1>
                    <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                    <Form
                        params={params}
                        data={data} />
                </div>
            </main>
        )
    }else{
        return redirect("/pengeluaran/kategoripengeluaran")
    }
}
export default Tambah