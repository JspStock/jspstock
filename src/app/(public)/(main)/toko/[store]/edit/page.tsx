import { Metadata } from "next"
import dynamic from "next/dynamic"
import { getStoreData, getNameStore } from "./action"
import { redirect } from "next/navigation"

const BackButton = dynamic(() => import('@/app/components/backButton'))
const Form = dynamic(() => import("@/app/components/toko/[store]/edit/form"))

interface Params {
    store: string
}

export const generateMetadata = async ({ params }: { params: Params }): Promise<Metadata> => {
    const title = await getNameStore(params.store)
    return {
        title: `Edit toko ${title?.name}`
    }
}

const page = async ({ params }: { params: Params }) => {
    const data = await getStoreData(params.store)

    if (data) {
        return (
            <>
                <main className="bg-white p-14 max-md:p-5">
                    <BackButton />

                    <div className="mt-5">
                        <h1 className="text-gray-900 font-semibold text-xl">Edit Toko</h1>
                        <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                        <Form data={data} />
                    </div>
                </main>
            </>
        )
    }else{
        return redirect('/toko')
    }
}
export default page